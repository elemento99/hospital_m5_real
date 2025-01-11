import React, { useState, useEffect } from 'react';
import AppointmentForm from './AppointmentForm'; // Asegúrate de importar correctamente el componente

const Admin = () => {
  const [medicalTeams, setMedicalTeams] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [newMedicalTeam, setNewMedicalTeam] = useState({ name: '', specialization: '' });
  const [newAppointment, setNewAppointment] = useState({
    doctor_id: '',
    patient_name: '',
    service_id: '',
    appointment_date: '',
  });

  useEffect(() => {
    fetchMedicalTeams();
    fetchAppointments();
    fetchServices();
  }, []);

  const fetchMedicalTeams = async () => {
    try {
      const response = await fetch('http://localhost:5000/doctors');
      const data = await response.json();
      setMedicalTeams(data);
    } catch (error) {
      console.error('Error fetching medical teams:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleAddAppointment = async () => {
    try {
      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });
      const data = await response.json();
      setAppointments([...appointments, data]);
      setNewAppointment({
        doctor_id: '',
        patient_name: '',
        service_id: '',
        appointment_date: '',
      });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await fetch(`http://localhost:5000/appointments/${id}`, {
        method: 'DELETE',
      });
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleUpdateAppointment = async (id, updatedAppointment) => {
    try {
      const response = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppointment),
      });
      const data = await response.json();
      setAppointments(appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, ...data } : appointment
      ));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <section>
        <h2>Appointments</h2>
        <AppointmentForm
          services={services}
          doctors={medicalTeams}
          appointments={appointments}
          setAppointments={setAppointments}
          handleAddAppointment={handleAddAppointment}
          handleDeleteAppointment={handleDeleteAppointment}
          handleUpdateAppointment={handleUpdateAppointment}
        />
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.patient_name} - {appointment.appointment_date} (Doctor ID: {appointment.doctor_id}, Service ID: {appointment.service_id})
              <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
              <button onClick={() => handleUpdateAppointment(appointment.id, appointment)}>Update</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;
