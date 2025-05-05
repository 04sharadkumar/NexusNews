import { Link } from 'react-router-dom';
import { FiFileText, FiUsers, FiSettings, FiBell, FiCalendar, FiPlusCircle } from 'react-icons/fi';
import { useState,useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {

  const [admin, setAdmin] = useState(null);
  const [articleCount, setArticleCount] = useState(null);
  const[totalUser,setTotalUser] = useState(null);
  const [comments,setComments] = useState(null);
  const [recentActivitie, setRecentActivitie] = useState([]);
useEffect(() => {   

      axios.get('http://localhost:5000/api/admin/dashboard/totalArticle')
    
      .then((response) => {
        setArticleCount(response.data.totalArticles);
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
      });
     
  }, [articleCount]);

useEffect(() => {   

    axios.get('http://localhost:5000/api/admin/dashboard/totalUsers')
  
    .then((response) => {
      setTotalUser(response.data.totalUsers);
    })
    .catch((error) => {
      console.error('Error fetching admin data:', error);
    });

    
    
    
}, [totalUser]);


useEffect(() => {   

  axios.get('http://localhost:5000/api/admin/dashboard/totalComments')

  .then((response) => {
    setComments(response.data.totalComments);
  })

  .catch((error) => {
    console.error('Error fetching admin data:', error);
  });

  
  
  
}, [comments]);


// Fetch recent activities and notifications from the server
useEffect(() => {

  
      const response = axios.get('http://localhost:5000/api/admin/dashboard/recentActivities');

      response.then((response) => {
        setRecentActivitie(response.data.data);
      })
      
    
  },[recentActivitie]);


const fetchAdminData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/adminData');
      setAdmin(response.data.admin.username);
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, []);
  

  const notifications = [
    { id: 1, message: 'New registration from User123', read: false },
    { id: 2, message: 'Your news article "Tech Update" was approved', read: true },
    { id: 3, message: 'System maintenance scheduled for tonight', read: false }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full bg-white shadow hover:bg-gray-100">
              <FiBell className="text-gray-600" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <span className="text-blue-600 text-xs font-medium">AD</span>
              </div>
              <span className="text-gray-700">{admin}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Articles</p>
                <p className="text-2xl font-bold text-gray-800">{articleCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <FiFileText className="text-blue-500" />
              </div>
            </div>
           
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{totalUser}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <FiUsers className="text-green-500" />
              </div>
            </div>
            
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">New Comments</p>
                <p className="text-2xl font-bold text-gray-800">{comments}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <FiBell className="text-purple-500" />
              </div>
            </div>
           
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
              <Link to="/admin/activities" className="text-sm text-blue-600 hover:underline">View All</Link>
            </div>
            <ul className="divide-y divide-gray-100">
  {recentActivitie.map(activity => (
    <li key={activity._id} className="py-3">
      <p className="text-sm text-gray-800">{activity.message}</p>
      <p className="text-xs text-gray-500 mt-1">
        <span className="font-medium">{activity.name}</span> • {activity.email}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Mobile: {activity.mobile}
      </p>
    </li>
  ))}
            </ul>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
              <button className="text-sm text-blue-600 hover:underline">Mark All Read</button>
            </div>
            <ul className="space-y-3">
              {notifications.map(notification => (
                <li key={notification.id} className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                  <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Today</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/admin/addNews"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <FiPlusCircle className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Add News</p>
                <p className="text-xs text-gray-500">Create new article</p>
              </div>
            </Link>

            <Link
              to="/admin/manageUsers"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <FiUsers className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Manage Users</p>
                <p className="text-xs text-gray-500">View all users</p>
              </div>
            </Link>

            <Link
              to="/admin/settings"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <FiSettings className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Settings</p>
                <p className="text-xs text-gray-500">System configuration</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
