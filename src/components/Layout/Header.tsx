import React from 'react';
import { Heart, User, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">HealthConnect</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('clinics')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'clinics'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Find Clinics
            </button>
            <button
              onClick={() => onNavigate('doctors')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 'doctors'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Doctors
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:block">Dashboard</span>
                </button>
                <div className="flex items-center space-x-2">
                  <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                  <span className="hidden sm:block text-sm text-gray-700">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;