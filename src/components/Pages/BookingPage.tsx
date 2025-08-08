import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { mockDoctors, mockClinics } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

interface BookingPageProps {
  doctorId?: string;
  onNavigate: (page: string) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ doctorId, onNavigate }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const doctor = mockDoctors.find(d => d.id === doctorId);
  const clinic = doctor ? mockClinics.find(c => c.id === doctor.clinicId) : null;

  if (!doctor || !clinic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Doctor not found</p>
          <button
            onClick={() => onNavigate('doctors')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsBooking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment with {doctor.name} has been scheduled for {selectedDate} at {selectedTime}.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View My Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('doctors')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Doctors</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
                <p className="text-blue-600 font-medium text-lg">{doctor.specialty}</p>
                <p className="text-gray-600 mt-1">{clinic.name}</p>
                <p className="text-green-600 font-semibold mt-1">
                  Consultation Fee: ${doctor.consultationFee}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Date & Time Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Select Date & Time</span>
                </h3>

                <div className="space-y-4">
                  {doctor.availability.map(slot => (
                    <div
                      key={`${slot.date}-${slot.time}`}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedDate === slot.date && selectedTime === slot.time
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedDate(slot.date);
                        setSelectedTime(slot.time);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{slot.date}</p>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{slot.time}</span>
                          </div>
                        </div>
                        <div className="text-green-600 text-sm font-medium">Available</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Patient Information</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-50"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-50"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={user?.phone || ''}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Describe your symptoms or reason for visit..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || isBooking}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBooking ? 'Booking Appointment...' : 'Confirm Appointment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;