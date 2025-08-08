import React, { useState } from 'react';
import { Star, Calendar, DollarSign, ArrowLeft } from 'lucide-react';
import { mockDoctors, mockClinics } from '../../data/mockData';

interface DoctorsPageProps {
  clinicId?: string;
  onNavigate: (page: string, doctorId?: string) => void;
}

const DoctorsPage: React.FC<DoctorsPageProps> = ({ clinicId, onNavigate }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const filteredDoctors = clinicId 
    ? mockDoctors.filter(doctor => doctor.clinicId === clinicId)
    : mockDoctors;

  const specialties = ['All', ...Array.from(new Set(filteredDoctors.map(doctor => doctor.specialty)))];
  const clinic = clinicId ? mockClinics.find(c => c.id === clinicId) : null;

  const doctorsToShow = selectedSpecialty && selectedSpecialty !== 'All'
    ? filteredDoctors.filter(doctor => doctor.specialty === selectedSpecialty)
    : filteredDoctors;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {clinicId && (
          <button
            onClick={() => onNavigate('clinics')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Clinics</span>
          </button>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {clinic ? `Doctors at ${clinic.name}` : 'Our Doctors'}
          </h1>
          <p className="text-gray-600">Choose from our experienced healthcare professionals</p>
        </div>

        {/* Specialty Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {specialties.map(specialty => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty === 'All' ? '' : specialty)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  (specialty === 'All' && selectedSpecialty === '') || selectedSpecialty === specialty
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsToShow.map(doctor => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{doctor.rating} • {doctor.experience} years exp.</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.about}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-green-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold">${doctor.consultationFee}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{doctor.availability.length} slots available</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('booking', doctor.id)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {doctorsToShow.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found for the selected specialty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;