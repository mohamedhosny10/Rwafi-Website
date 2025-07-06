import React, { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/hooks/useAuth.jsx";

const initialProfile = {
  firstName: "Ahmed",
  lastName: "Ali",
  phone: "+20 100 123 4567",
  birthdate: new Date(1995, 4, 15),
  nationalId: "29805150123456",
  company: "Rwafi Logistics",
  subCompany: "Cargo Division",
  branch: "Cairo Branch",
  avatarUrl: "",
};

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const fileInputRef = useRef(null);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setProfile(initialProfile);
    setEditMode(false);
  };
  const handleSave = () => setEditMode(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleBirthdateChange = (date) => {
    setProfile((prev) => ({ ...prev, birthdate: date }));
    setShowCalendar(false);
  };

  const handleAvatarClick = () => {
    if (editMode && fileInputRef.current) fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile((prev) => ({ ...prev, avatarUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-modern py-8 flex flex-col items-center min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="w-full max-w-2xl card p-6 md:p-10 mt-8 shadow-xl fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <Avatar className="w-28 h-28 md:w-32 md:h-32 cursor-pointer border-4 border-primary shadow-lg" onClick={handleAvatarClick}>
              {profile.avatarUrl ? (
                <AvatarImage src={profile.avatarUrl} alt="Profile" />
              ) : (
                <AvatarFallback className="text-4xl bg-blue-100 text-blue-700">
                  {profile.firstName[0]}
                </AvatarFallback>
              )}
            </Avatar>
            {editMode && (
              <button
                type="button"
                className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition"
                onClick={handleAvatarClick}
                tabIndex={-1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm0 0v3h3" />
                </svg>
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
              disabled={!editMode}
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-center text-gradient">{profile.firstName} {profile.lastName}</h2>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <Input
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                disabled={!editMode}
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <Input
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                disabled={!editMode}
                placeholder="Last Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                disabled={!editMode}
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Birthdate</label>
              <div className="relative">
                <Input
                  name="birthdate"
                  value={profile.birthdate ? profile.birthdate.toLocaleDateString() : ""}
                  onFocus={() => editMode && setShowCalendar(true)}
                  readOnly
                  disabled={!editMode}
                  className="pr-10 cursor-pointer bg-white"
                />
                {showCalendar && editMode && (
                  <div className="absolute z-20 mt-2">
                    <Calendar
                      mode="single"
                      selected={profile.birthdate}
                      onSelect={handleBirthdateChange}
                      initialFocus
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Egyptian National ID</label>
              <Input
                name="nationalId"
                value={profile.nationalId}
                onChange={handleInputChange}
                disabled={!editMode}
                placeholder="National ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <Input
                name="company"
                value={profile.company}
                onChange={handleInputChange}
                disabled={!editMode}
                placeholder="Company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sub-Company</label>
              <Input
                name="subCompany"
                value={profile.subCompany}
                onChange={handleInputChange}
                disabled={!editMode}
                placeholder="Sub-Company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Branch</label>
              <Input
                name="branch"
                value={profile.branch}
                onChange={handleInputChange}
                disabled={!editMode}
                placeholder="Branch"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-8">
            {!editMode ? (
              <Button type="button" onClick={handleEdit} className="w-full md:w-auto">Edit</Button>
            ) : (
              <div className="flex gap-3 w-full md:w-auto">
                <Button type="button" onClick={handleSave} className="w-full md:w-auto">Save</Button>
                <Button type="button" variant="outline" onClick={handleCancel} className="w-full md:w-auto">Cancel</Button>
              </div>
            )}
            <Button type="button" variant="destructive" onClick={logout} className="w-full md:w-auto">Logout</Button>
          </div>
        </form>
      </div>
    </div>
  );
} 