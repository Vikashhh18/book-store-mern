import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { 
  MdBook, 
  MdAttachMoney, 
  MdTrendingUp, 
  MdShoppingCart,
  MdAccessTime,
  MdPeople,
  MdArrowUpward,
  MdArrowDownward
} from 'react-icons/md';
import { baseUrl } from '../../utils/baseUrl';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/admin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate('/login'); // Redirect to login on error
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <Loading />;

  // Stats data with more detailed information
  const stats = [
    {
      icon: <MdBook className="text-2xl" />,
      value: data?.totalBooks || 0,
      label: 'Total Books',
      change: '+12%',
      trend: 'up',
      description: 'Total books in inventory',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '/dashboard/manage-books'
    },
    {
      icon: <MdAttachMoney className="text-2xl" />,
      value: `$${(data?.totalSales || 0).toLocaleString()}`,
      label: 'Total Sales',
      change: '+8%',
      trend: 'up',
      description: 'Revenue this month',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      // link: '/dashboard/sales'
    },
    {
      icon: <MdTrendingUp className="text-2xl" />,
      value: data?.trendingBooks || 0,
      label: 'Trending Books',
      change: '13%',
      trend: 'up',
      description: 'Popular this month',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      // link: '/dashboard/trending'
    },
    {
      icon: <MdShoppingCart className="text-2xl" />,
      value: data?.totalOrders || 0,
      label: 'Total Orders',
      change: '-2%',
      trend: 'down',
      description: 'Completed orders',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      // link: '/dashboard/orders'
    },
    {
      icon: <MdAccessTime className="text-2xl" />,
      value: '02',
      label: 'Pending Orders',
      change: '+5',
      trend: 'up',
      description: 'Awaiting fulfillment',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      // link: '/dashboard/orders?status=pending'
    },
    {
      icon: <MdPeople className="text-2xl" />,
      value: '1,429',
      label: 'Visitors',
      change: '+24%',
      trend: 'up',
      description: 'Last 30 days',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      // link: '/dashboard/analytics'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="  bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-indigo-100 cursor-pointer"
            onClick={() => navigate(stat.link)}
          >
            <div className="flex justify-between items-start">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.trend === 'up' ? (
                    <MdArrowUpward className="mr-1" size={14} />
                  ) : (
                    <MdArrowDownward className="mr-1" size={14} />
                  )}
                  {stat.change}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-800 font-medium mt-1">{stat.label}</p>
              <p className="text-gray-500 text-sm mt-2">{stat.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <span className="text-indigo-600 text-sm font-medium hover:underline">
                View details →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mt-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <button 
            onClick={() => navigate('/dashboard/add-new-book')}
            className="p-4 cursor-pointer bg-indigo-50 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors flex flex-col items-center"
          >
            <MdBook size={24} className="mb-2" />
            <span>Add Book</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/manage-books')}
            className="p-4 cursor-pointer bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors flex flex-col items-center"
          >
            <MdShoppingCart size={24} className="mb-2" />
            <span>Manage Books</span>
          </button>
          <button 
            // onClick={() => navigate('/dashboard/orders')}
            className="p-4 cursor-pointer bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors flex flex-col items-center"
          >
            <MdAccessTime size={24} className="mb-2" />
            <span>View Orders</span>
          </button>
          <button 
            // onClick={() => navigate('/dashboard/analytics')}
            className="p-4 cursor-pointer bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors flex flex-col items-center"
          >
            <MdTrendingUp size={24} className="mb-2" />
            <span>Analytics</span>
          </button>
          <button 
            // onClick={() => navigate('/dashboard/users')}
            className="p-4 cursor-pointer bg-teal-50 rounded-lg text-teal-700 hover:bg-teal-100 transition-colors flex flex-col items-center"
          >
            <MdPeople size={24} className="mb-2" />
            <span>Customers</span>
          </button>
          <button 
            // onClick={() => navigate('/dashboard/settings')}
            className="p-4 cursor-pointer bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors flex flex-col items-center"
          >
            <MdAttachMoney size={24} className="mb-2" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;