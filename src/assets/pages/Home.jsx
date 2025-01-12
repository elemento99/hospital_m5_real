import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Profiler } from "react";
import { useHospital } from "../../context/HospitalContext";
import ServiceList from "../../components/ServiceList";

const Home = () => {
  const { doctors, services, error, fetchDoctors, fetchServices, loading } = useHospital();

  useEffect(() => {
    fetchDoctors(); // Cargar doctores
    fetchServices(); // Cargar servicios
  }, []); // Se ejecuta solo una vez

  if (loading) {
    return <p>Cargando información...</p>;
  }

  const onRenderCallback = (id, phase, actualDuration) => {
    console.log(`Profiler [${id}] - ${phase} - ${actualDuration}ms`);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <header className="text-center py-4">
            <h1>Hospital Central</h1>
            <p className="text-muted">Cuidamos de ti y de los tuyos con excelencia médica desde 1990.</p>
          </header>
        </Col>
      </Row>

      <Row>
        {/* Información principal del hospital */}
        <Col md={8}>
          <Profiler id="ServiceList" onRender={onRenderCallback}>
            <section className="services-section mb-4">
              <h2 className="mb-3">Nuestros Servicios</h2>
              <ServiceList services={services} />
            </section>
          </Profiler>
        </Col>

        {/* Barra lateral con información adicional */}
        <Col md={4}>
          <Profiler id="HospitalInfo" onRender={onRenderCallback}>
            <aside>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Sobre Nosotros</Card.Title>
                  <Card.Text>
                    Somos un hospital comprometido con la atención de calidad, combinando innovación, tecnología, y un equipo humano altamente capacitado.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Nuestros Valores</Card.Title>
                  <ul>
                    <li>Compromiso con el paciente</li>
                    <li>Innovación constante</li>
                    <li>Ética profesional</li>
                    <li>Empatía y respeto</li>
                  </ul>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Ubicación</Card.Title>
                  <Card.Text>
                    <strong>Dirección:</strong> Avenida Principal 123, Ciudad Salud, País<br />
                    <strong>Horarios:</strong> Lunes a viernes: 8:00 - 18:00<br />
                    Sábados: 9:00 - 14:00
                  </Card.Text>
                  <iframe
                    title="Mapa del Hospital"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093895!2d144.95373521590476!3d-37.81627974202113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1611814568172!5m2!1sen!2sus"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Contáctanos</Card.Title>
                  <Card.Text>
                    <strong>Teléfono:</strong> +56 123 456 789<br />
                    <strong>Email:</strong> contacto@hospital.com<br />
                    <strong>Redes Sociales:</strong>
                    <ul>
                      <li><a href="#">Facebook</a></li>
                      <li><a href="#">Twitter</a></li>
                      <li><a href="#">Instagram</a></li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </aside>
          </Profiler>
        </Col>
      </Row>

      
    </Container>
  );
};

export default Home;
