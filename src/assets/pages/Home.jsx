import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Profiler } from "react";
import { useHospital } from "../../context/HospitalContext";
import ServiceList from "../../components/ServiceList";  // Asegúrate de importar correctamente el componente ServiceList

const Home = () => {
  const { doctors, services, error, fetchDoctors, fetchServices, loading } = useHospital();

  useEffect(() => {
    fetchDoctors();  // Cargar doctores
    fetchServices(); // Cargar servicios
  }, []); // Cambié a que se ejecute solo una vez

  if (loading) {
    return <p>Cargando información...</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Profiler id="ServiceList">
           
            <ServiceList services={services} />
          </Profiler>
        </Col>

        <Col md={4}>
          <Profiler id="HospitalInfo">
            <aside className="hospital-info">
              {/* Otros elementos de la sección de información */}
            </aside>
          </Profiler>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
