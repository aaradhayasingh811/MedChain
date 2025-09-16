import { useState, useEffect } from "react";
import {
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  BeakerIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

const Dashboard = ({ user, walletAddress }) => {
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    // Fetch dashboard data based on user role
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls based on user role
      let statsData = {};
      let activityData = [];
      let requestsData = [];

      switch(user.role) {
        case "patient":
          statsData = {
            records: 12,
            accessGrants: 3,
            pendingRequests: 2
          };
          activityData = [
            { id: 1, type: "upload", description: "Uploaded lab results", time: "2 hours ago" },
            { id: 2, type: "access", description: "Granted access to Dr. Smith", time: "1 day ago" },
            { id: 3, type: "request", description: "Received access request from City Hospital", time: "2 days ago" }
          ];
          requestsData = [
            { id: 1, requester: "City Hospital", purpose: "Routine checkup", date: "2023-05-15" },
            { id: 2, requester: "Research Institute", purpose: "Medical study", date: "2023-05-10" }
          ];
          break;
        case "doctor":
          statsData = {
            patients: 24,
            accessRequests: 5,
            approvedAccess: 18
          };
          activityData = [
            { id: 1, type: "access", description: "Viewed patient records", time: "3 hours ago" },
            { id: 2, type: "request", description: "Requested access to new patient", time: "1 day ago" },
            { id: 3, type: "update", description: "Updated treatment plan", time: "2 days ago" }
          ];
          break;
        case "emergency":
          statsData = {
            emergencyAccess: 3,
            patientsAccessed: 5,
            responseTime: "4.2 min"
          };
          activityData = [
            { id: 1, type: "emergency", description: "Emergency access granted for patient #123", time: "1 hour ago" },
            { id: 2, type: "access", description: "Viewed critical patient information", time: "3 hours ago" },
            { id: 3, type: "request", description: "Requested multi-sig approval", time: "5 hours ago" }
          ];
          break;
        case "researcher":
          statsData = {
            datasets: 8,
            researchRequests: 12,
            approvedStudies: 5
          };
          activityData = [
            { id: 1, type: "download", description: "Downloaded diabetes dataset", time: "2 days ago" },
            { id: 2, type: "request", description: "Submitted new research proposal", time: "4 days ago" },
            { id: 3, type: "analysis", description: "Completed preliminary analysis", time: "1 week ago" }
          ];
          break;
        default:
          break;
      }

      setStats(statsData);
      setRecentActivity(activityData);
      setPendingRequests(requestsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const renderPatientDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.records || 0}</p>
            <p className="text-gray-600">Medical Records</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <UserGroupIcon className="h-8 w-8 text-green-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.accessGrants || 0}</p>
            <p className="text-gray-600">Access Grants</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.pendingRequests || 0}</p>
            <p className="text-gray-600">Pending Requests</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.patients || 0}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.accessRequests || 0}</p>
            <p className="text-gray-600">Access Requests</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.approvedAccess || 0}</p>
            <p className="text-gray-600">Approved Access</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergencyDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.emergencyAccess || 0}</p>
            <p className="text-gray-600">Emergency Accesses</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <UserGroupIcon className="h-8 w-8 text-indigo-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.patientsAccessed || 0}</p>
            <p className="text-gray-600">Patients Accessed</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ClockIcon className="h-8 w-8 text-yellow-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.responseTime || "0 min"}</p>
            <p className="text-gray-600">Avg. Response Time</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResearcherDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <BeakerIcon className="h-8 w-8 text-purple-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.datasets || 0}</p>
            <p className="text-gray-600">Datasets</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.researchRequests || 0}</p>
            <p className="text-gray-600">Research Requests</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-4" />
          <div>
            <p className="text-2xl font-bold">{stats.approvedStudies || 0}</p>
            <p className="text-gray-600">Approved Studies</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoleSpecificDashboard = () => {
    switch(user.role) {
      case "patient":
        return renderPatientDashboard();
      case "doctor":
        return renderDoctorDashboard();
      case "emergency":
        return renderEmergencyDashboard();
      case "researcher":
        return renderResearcherDashboard();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600 mt-2">
          {user.role === "patient" && "Manage your medical records and control who can access them."}
          {user.role === "doctor" && "Access patient records and provide better care with complete medical histories."}
          {user.role === "emergency" && "Respond to emergencies with quick access to critical patient information."}
          {user.role === "researcher" && "Access anonymized data for medical research and advancements."}
        </p>
        
        {walletAddress && (
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg inline-block">
            <p className="text-sm text-indigo-700">
              Connected Wallet: {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 6)}
            </p>
          </div>
        )}
      </div>

      {/* Role-specific stats */}
      {renderRoleSpecificDashboard()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mt-1">
                  <div className={`h-3 w-3 rounded-full ${
                    activity.type === "upload" ? "bg-indigo-500" :
                    activity.type === "access" ? "bg-green-500" :
                    activity.type === "request" ? "bg-yellow-500" :
                    activity.type === "emergency" ? "bg-red-500" :
                    activity.type === "download" ? "bg-purple-500" : "bg-blue-500"
                  }`}></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Requests (for patients) or Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {user.role === "patient" && pendingRequests.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Access Requests</h2>
              <div className="space-y-4">
                {pendingRequests.map(request => (
                  <div key={request.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-gray-800">{request.requester}</p>
                    <p className="text-xs text-gray-600">{request.purpose}</p>
                    <p className="text-xs text-gray-500 mt-1">Requested on: {request.date}</p>
                    <div className="flex space-x-2 mt-2">
                      <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">
                        Approve
                      </button>
                      <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200">
                        Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {user.role === "patient" && (
                  <>
                    <button className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                      Upload Medical Records
                    </button>
                    <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      Manage Access Permissions
                    </button>
                  </>
                )}
                {user.role === "doctor" && (
                  <>
                    <button className="w-full text-left p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                      Request Patient Access
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      View Accessed Records
                    </button>
                  </>
                )}
                {user.role === "emergency" && (
                  <>
                    <button className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                      Emergency Access Request
                    </button>
                    <button className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                      View Access History
                    </button>
                  </>
                )}
                {user.role === "researcher" && (
                  <>
                    <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      Request Research Data
                    </button>
                    <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      View Approved Studies
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;