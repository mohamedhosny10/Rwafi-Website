import { useState } from 'react';
import { ChevronDownIcon, Bars3Icon, LanguageIcon } from '@heroicons/react/24/outline';
import { NAVIGATION_LINKS, MORE_DROPDOWN_ITEMS } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';
import { useAuthModal } from '../hooks/useModal';

const Header = () => {
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('ar');
  
  const { isAuthenticated, user, logout } = useAuth();
  const { openLogin } = useAuthModal();

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Rwafi</span>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                {language === 'ar' ? link.label : link.labelEn}
              </a>
            ))}
            
            {/* More Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200"
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
              >
                <span className="arabic-text">المزيد</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              
              {isMoreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                  {MORE_DROPDOWN_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsMoreDropdownOpen(false)}
                    >
                      {language === 'ar' ? item.label : item.labelEn}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Section or Login */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:block text-sm text-gray-700">
                  مرحباً، {user?.fullName}
                </span>
                <button
                  onClick={handleLogout}
                  className="hidden sm:block px-4 py-2 text-primary hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <button
                onClick={openLogin}
                className="hidden sm:block px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-800 transition-colors duration-200 arabic-text"
              >
                تسجيل الدخول
              </button>
            )}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-500 hover:text-primary transition-colors duration-200"
              title={language === 'ar' ? 'Switch to English' : 'تبديل للعربية'}
            >
              <LanguageIcon className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-primary"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-700 hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {language === 'ar' ? link.label : link.labelEn}
                </a>
              ))}
              
              {/* Mobile Auth Button */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-primary hover:bg-gray-50"
                >
                  تسجيل الخروج
                </button>
              ) : (
                <button
                  onClick={() => {
                    openLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-primary hover:bg-gray-50"
                >
                  تسجيل الدخول
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay for dropdowns */}
      {(isMoreDropdownOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsMoreDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
