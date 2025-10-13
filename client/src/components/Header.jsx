import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../hooks/useAuth.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside and prevent body scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          menuRef.current && 
          buttonRef.current &&
          !menuRef.current.contains(event.target) && 
          !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Use capture phase to handle clicks before they bubble
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Partners", href: "#partners" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="container-modern">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-xl flex items-center justify-center shadow-lg border-2 border-white">
              <span className="text-primary font-bold text-lg lg:text-xl tracking-wider drop-shadow-sm">
                R
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-bold text-gradient">
                Rwafi
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Logistics Solutions
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 focus-ring rounded-md px-3 py-2"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 focus-ring rounded-md px-3 py-2"
                >
                  {item.name}
                </button>
              )
            ))}
          </nav>

          {/* CTA Buttons or Profile */}
          <div className="hidden lg:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar>
                    {isAuthenticated && user?.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} alt={user.fullName || user.email} />
                    ) : (
                      <AvatarFallback>
                        {isAuthenticated
                          ? (user?.fullName?.[0] || user?.email?.[0] || "U")
                          : "G"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="flex items-center space-x-3 p-3 border-b">
                  <Avatar>
                    {isAuthenticated && user?.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} alt={user.fullName || user.email} />
                    ) : (
                      <AvatarFallback>
                        {isAuthenticated
                          ? (user?.fullName?.[0] || user?.email?.[0] || "U")
                          : "G"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="font-semibold text-base text-foreground">
                      {isAuthenticated ? (user?.fullName || user?.email) : "Guest"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {isAuthenticated ? user?.email : "Not signed in"}
                    </div>
                  </div>
                </div>
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full">View your channel</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/history" className="w-full">History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/signin" className="w-full">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/signup" className="w-full">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="lg:hidden p-2 rounded-md hover:bg-white/20 transition-colors duration-200 border border-white/20"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            type="button"
            style={{ zIndex: 1000 }}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-foreground" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <div ref={menuRef} className="lg:hidden header-menu relative z-50">
              <div className="glass rounded-xl mt-4 p-6 shadow-xl border animate-in slide-in-from-top-2 duration-200">
                <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  item.isRoute ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus-ring rounded-lg px-4 py-3 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus-ring rounded-lg px-4 py-3 hover:bg-gray-50 text-left"
                    >
                      {item.name}
                    </button>
                  )
                ))}
                </nav>

                <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus-ring rounded-lg px-4 py-3 hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/history"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus-ring rounded-lg px-4 py-3 hover:bg-gray-50"
                      >
                        History
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="text-base font-medium text-red-600 hover:text-red-700 transition-colors duration-200 focus-ring rounded-lg px-4 py-3 hover:bg-red-50 text-left"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200 focus-ring rounded-lg px-4 py-3 hover:bg-gray-50"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-primary hover:text-primary/80 transition-colors duration-200 focus-ring rounded-lg px-4 py-3 hover:bg-primary/5"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
