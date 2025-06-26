import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd, HiOutlineBookOpen } from 'react-icons/hi';
import { MdOutlineManageHistory, MdDashboard } from 'react-icons/md';
import { FiLogOut, FiSearch, FiBell, FiSettings } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';

const DashboardLayout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-20 lg:w-64 bg-gray-800 text-white transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 bg-purple-600">
          <Link to={"/"}>
          <img src="/fav-icon.png" alt="Logo" className="h-10 w-10" />
          </Link>
          <span className="hidden lg:inline-block ml-2 text-xl font-semibold">BookStore</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavItem to="/dashboard" icon={<MdDashboard size={24} />} text="Dashboard" />
          <NavItem 
            to="/dashboard/add-new-book" 
            icon={<HiViewGridAdd size={24} />} 
            text="Add Book" 
          />
          <NavItem 
            to="/dashboard/manage-books" 
            icon={<MdOutlineManageHistory size={24} />} 
            text="Manage Books" 
          />
        </nav>

        {/* Bottom Settings */}
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center justify-center lg:justify-start w-full p-3 rounded-lg hover:bg-gray-700">
            <FiSettings size={20} />
            <span className="hidden lg:inline-block ml-3">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 rounded-full hover:text-gray-600 hover:bg-gray-100 relative">
                <FiBell size={20} />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img src={avatar} alt="User" className="h-8 w-8 rounded-full" />
                  <span className="hidden md:inline-block text-sm font-medium">User</span>
                </button>
              </div>

              <button 
                onClick={handleLogout}
                className="p-2 text-gray-500 rounded-full hover:text-gray-600 hover:bg-gray-100"
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Book Store Inventory</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Link
                to="/dashboard/manage-books"
                className="inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors"
              >
                <MdOutlineManageHistory className="mr-2" />
                Manage Books
              </Link>
              <Link
                to="/dashboard/add-new-book"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <HiViewGridAdd className="mr-2" />
                Add New Book
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

// Reusable NavItem component
const NavItem = ({ to, icon, text, active = false }) => (
  <Link
    to={to}
    className={`flex items-center p-3 rounded-lg transition-colors ${
      active ? 'bg-white text-purple-600' : 'hover:bg-gray-700 text-gray-300 hover:text-white'
    }`}
  >
    <span>{icon}</span>
    <span className="hidden lg:inline-block ml-3">{text}</span>
  </Link>
);

export default DashboardLayout;