import React from 'react';
import { Calendar, Clock, User, FileText, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockAppointments, mockDoctors, mockClinics } from '../../data/mockData';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const userAppointments = mockAppointments.filter(apt => 
    user?.role === 'patient' ? apt.patientId === user.id : apt.doctorId === user.id
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'patient' ? 'Manage your appointments and health records' : 'View your schedule and patient information'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {userAppointments.filter(apt => apt.status === 'scheduled').length}
                </p>
                <p className="text-gray-600">Upcoming Appointments</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {userAppointments.filter(apt => apt.status === 'completed').length}
                </p>
                <p className="text-gray-600">Completed Visits</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.role === 'patient' ? '3' : '150+'}
                </p>
                <p className="text-gray-600">
                  {user?.role === 'patient' ? 'Doctors Consulted' : 'Patients Treated'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Appointments</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {userAppointments.length > 0 ? (
                  userAppointments.map(appointment => {
                    const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
                    const clinic = mockClinics.find(c => c.id === appointment.clinicId);
                    
                    return (
                      <div key={appointment.id} className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={doctor?.avatar || 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300'}
                            alt={doctor?.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900">{doctor?.name}</h3>
                                <p className="text-blue-600 text-sm">{doctor?.specialty}</p>
                                <p className="text-gray-600 text-sm">{clinic?.name}</p>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                appointment.status === 'scheduled'
                                  ? 'bg-blue-100 text-blue-800'
                                  : appointment.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {appointment.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                            {appointment.notes && (
                              <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No appointments found</p>
                    {user?.role === 'patient' && (
                      <button
                        onClick={() => onNavigate('clinics')}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Book your first appointment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-4">
                {user?.role === 'patient' ? (
                  <>
                    <button
                      onClick={() => onNavigate('clinics')}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Book New Appointment</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-green-600" />
                        <span className="font-medium">View Medical Records</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">View Schedule</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Patient Records</span>
                      </div>
                    </button>
                  </>
                )}
                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Account Settings</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;