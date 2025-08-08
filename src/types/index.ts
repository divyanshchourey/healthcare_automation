export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor';
  phone?: string;
  avatar?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  avatar: string;
  about: string;
  clinicId: string;
  availability: TimeSlot[];
  consultationFee: number;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  rating: number;
  specialties: string[];
  doctors: string[];
}

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}