import React, { useState, useEffect } from 'react';

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

  const [filteredDoctors, setFilteredDoctors] = useState(medicalTeams);
  const [filteredServices, setFilteredServices] = useState(services);

  // Fetch data on mount
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
      setFilteredDoctors(data);
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
      setFilteredServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    setNewAppointment({ ...newAppointment, doctor_id: doctorId });

    if (!doctorId) {
      setFilteredServices(services); // 
    } else {
      const filteredServicesForDoctor = services.filter(service => service.doctor_id === parseInt(doctorId));
      setFilteredServices(filteredServicesForDoctor);
    }
  };

  const handleServiceChange = (event) => {
    const serviceId = event.target.value;
    setNewAppointment({ ...newAppointment, service_id: serviceId });

    if (!serviceId) {
      setFilteredDoctors(medicalTeams); // Si no se selecciona servicio, mostrar todos los doctores
    } else {
      const filteredDoctorsForService = medicalTeams.filter(doctor => doctor.service_id === parseInt(serviceId));
      setFilteredDoctors(filteredDoctorsForService);
    }
  };

  const handleAddMedicalTeam = async () => {
    try {
      const response = await fetch('http://localhost:5000/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedicalTeam),
      });
      const data = await response.json();
      setMedicalTeams([...medicalTeams, data]);
      setNewMedicalTeam({ name: '', specialization: '' });
    } catch (error) {
      console.error('Error adding medical team:', error);
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

  return (
    <div>
      <h1>Admin Panel</h1>

      <section>
        <h2>Medical Teams</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMedicalTeam();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={newMedicalTeam.name}
            onChange={(e) => setNewMedicalTeam({ ...newMedicalTeam, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Specialization"
            value={newMedicalTeam.specialization}
            onChange={(e) => setNewMedicalTeam({ ...newMedicalTeam, specialization: e.target.value })}
            required
          />
          <button type="submit">Add Medical Team</button>
        </form>
        <ul>
          {medicalTeams.map((team) => (
            <li key={team.id}>
              {team.name} ({team.specialization})
              <button onClick={() => handleDeleteMedicalTeam(team.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Appointments</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddAppointment();
          }}
        >
          <input
            type="text"
            placeholder="Patient Name"
            value={newAppointment.patient_name}
            onChange={(e) => setNewAppointment({ ...newAppointment, patient_name: e.target.value })}
            required
          />
          <input
            type="date"
            value={newAppointment.appointment_date}
            onChange={(e) => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })}
            required
          />
          <select
            value={newAppointment.service_id}
            onChange={handleServiceChange}
            required
          >
            <option value="">Select Service</option>
            {filteredServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <select
            value={newAppointment.doctor_id}
            onChange={handleDoctorChange}
            required
          >
            <option value="">Select Doctor</option>
            {filteredDoctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Appointment</button>
        </form>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.patient_name} - {appointment.appointment_date} (Doctor ID: {appointment.doctor_id}, Service ID: {appointment.service_id})
              <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;
