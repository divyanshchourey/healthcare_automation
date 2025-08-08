import { Doctor, Clinic, Appointment } from '../types';

export const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'City Medical Center',
    address: '123 Healthcare Ave, Medical District',
    phone: '(555) 123-4567',
    image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    specialties: ['Cardiology', 'Neurology', 'Pediatrics'],
    doctors: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Advanced Care Clinic',
    address: '456 Wellness Blvd, Health Plaza',
    phone: '(555) 234-5678',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    specialties: ['Orthopedics', 'Dermatology', 'General Medicine'],
    doctors: ['4', '5', '6']
  },
  {
    id: '3',
    name: 'Family Health Partners',
    address: '789 Community St, Downtown',
    phone: '(555) 345-6789',
    image: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    specialties: ['Family Medicine', 'Internal Medicine', 'Psychiatry'],
    doctors: ['7', '8', '9']
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: 12,
    rating: 4.9,
    avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300',
    about: 'Experienced cardiologist specializing in preventive heart care and advanced cardiac procedures.',
    clinicId: '1',
    consultationFee: 200,
    availability: [
      { date: '2024-01-15', time: '09:00', available: true },
      { date: '2024-01-15', time: '10:30', available: true },
      { date: '2024-01-16', time: '14:00', available: true }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: 15,
    rating: 4.8,
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300',
    about: 'Board-certified neurologist with expertise in treating neurological disorders and brain health.',
    clinicId: '1',
    consultationFee: 250,
    availability: [
      { date: '2024-01-15', time: '11:00', available: true },
      { date: '2024-01-16', time: '09:30', available: true }
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    experience: 8,
    rating: 4.9,
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300',
    about: 'Compassionate pediatrician dedicated to providing comprehensive care for children of all ages.',
    clinicId: '1',
    consultationFee: 150,
    availability: [
      { date: '2024-01-15', time: '13:00', available: true },
      { date: '2024-01-16', time: '10:00', available: true }
    ]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'patient1',
    doctorId: '1',
    clinicId: '1',
    date: '2024-01-15',
    time: '09:00',
    status: 'scheduled',
    notes: 'Annual checkup'
  }
];