import React, { useEffect } from "react";
import DoctorCard from "../../components/DoctorCard";
import { useHospital } from "../../context/HospitalContext";
import withModal from "../../components/shared/withModal";
import { Container, Row, Col } from "react-bootstrap";
import DetailModal from "../../components/DetailModal";
import { Profiler } from "react";

const DoctorCardWithModal = withModal(DoctorCard, DetailModal);

const Team = () => {
  const { doctors, getDoctors, loading } = useHospital();

  console.log("Estado de loading en Team:", loading);
  console.log("Lista de doctores en Team:", doctors);

  
  useEffect(() => {
    console.log("Llamada a getDoctors dentro de useEffect...");
    getDoctors();
  }, []); 

  if (loading) {
    return <p>Cargando información...</p>;
  }

  return (
    <Container>
      <h1 className="my-4">Lista de Doctores</h1>
      <Profiler id="doctor-list">
        {doctors.length > 0 ? (
          <Row>
            {doctors.map((doctor) => (
              <Col key={doctor.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <DoctorCardWithModal doctor={doctor} data={doctor} />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No hay doctores disponibles.</p>
        )}
      </Profiler>
    </Container>
  );
};

export default Team;
