import React, { useState } from 'react';
import { Search, MapPin, Star, Users } from 'lucide-react';
import { mockClinics } from '../../data/mockData';

interface ClinicsPageProps {
  onNavigate: (page: string, clinicId?: string) => void;
}

const ClinicsPage: React.FC<ClinicsPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General Medicine', 'Family Medicine', 'Internal Medicine', 'Psychiatry'];

  const filteredClinics = mockClinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'All' ||
                            clinic.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Clinics Near You</h1>
          <p className="text-gray-600">Choose from our network of trusted healthcare facilities</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search clinics by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty === 'All' ? '' : specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clinics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClinics.map(clinic => (
            <div
              key={clinic.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
              onClick={() => onNavigate('doctors', clinic.id)}
            >
              <div className="relative h-48">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{clinic.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{clinic.name}</h3>
                
                <div className="flex items-start space-x-2 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{clinic.address}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{clinic.doctors.length} doctors available</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {clinic.specialties.slice(0, 3).map(specialty => (
                      <span
                        key={specialty}
                        className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {clinic.specialties.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{clinic.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  View Doctors
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClinics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No clinics found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicsPage;