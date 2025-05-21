
import { Container, Row, Col, Card, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Panel Principal - Transporte Flores</h2>
      <Row>
        <Col md="6" lg="3" className="mb-4">
          <Card body className="text-center shadow">
            <h5>Lista de Clientes</h5>
            <Button color="primary" onClick={() => navigate('/clientelista')}>
              Ver Clientes
            </Button>
          </Card>
        </Col>
        <Col md="6" lg="3" className="mb-4">
          <Card body className="text-center shadow">
            <h5>Registrar Cliente</h5>
            <Button color="success" onClick={() => navigate('/nuevocliente')}>
              Nuevo Cliente
            </Button>
          </Card>
        </Col>
        <Col md="6" lg="3" className="mb-4">
          <Card body className="text-center shadow">
            <h5>Lista de Unidades</h5>
            <Button color="info" onClick={() => navigate('/unidadeslista')}>
              Ver Unidades
            </Button>
          </Card>
        </Col>
        <Col md="6" lg="3" className="mb-4">
          <Card body className="text-center shadow">
            <h5>Lista de Envíos</h5>
            <Button color="warning" onClick={() => navigate('/envioslista')}>
              Ver Envíos
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
