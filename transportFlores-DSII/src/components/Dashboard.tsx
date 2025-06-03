import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Button,
  Spinner // Asegúrate de importar Spinner
} from 'reactstrap';

// Importa tus nuevos custom hooks
import { useClientes } from '../hook/useClientes';
import { useEnvios } from '../hook/useEnvios';

// Ajusta el tipo de newView para que coincida con todas las vistas posibles en AdminLayout
type DashboardProps = {
  handleViewChange: (newView: 'dashboard' | 'clientes' | 'unidades' | 'envios' | 'usuarios' | 'conductores' | 'mantenimiento' | 'facturacion' | 'rutas' | 'proyecciones') => void;
};

export default function Dashboard({ handleViewChange }: DashboardProps) {
  // Usa los custom hooks para obtener los datos y estados
  const { totalClientes, ultimosClientes, loading: loadingClientes, error: errorClientes } = useClientes();
  const { totalEnvios, ultimosEnvios, loading: loadingEnvios, error: errorEnvios } = useEnvios();

  // Combina los estados de carga y error si es necesario para un mensaje general
  const loading = loadingClientes || loadingEnvios;
  const error = errorClientes || errorEnvios;

  if (loading) {
    return (
      <>
        <h2 className="fw-bold mb-4">Dashboard</h2>
        <p>Cargando datos del dashboard...</p>
        <Spinner color="primary" /> {/* Agrega un spinner visible */}
      </>
    );
  }

  if (error) {
    return (
      <>
        <h2 className="fw-bold mb-4">Dashboard</h2>
        <p className="text-danger">Error: {error}</p>
      </>
    );
  }

  return (
    <>
      <h2 className="fw-bold mb-4">Dashboard</h2>
      <Row className="g-4">
        {/* Tarjeta de Clientes: Total y Últimos Agregados */}
        <Col md="6" lg="6">
          <Card className="shadow-sm border-0 h-100">
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-people-fill fs-1 text-primary me-3"></i>
                <div>
                  <CardTitle tag="h5" className="mb-0">Total de Clientes</CardTitle>
                  <CardText className="display-4 fw-bold text-primary">{totalClientes}</CardText>
                </div>
              </div>
              <hr />
              <h6 className="mb-3">Últimos Clientes Agregados</h6>
              {ultimosClientes.length > 0 ? (
                <ListGroup flush>
                  {ultimosClientes.map((cliente) => (
                    <ListGroupItem key={cliente.idClientes} className="d-flex justify-content-between align-items-center">
                      <span>{cliente.nombreCliente} </span>
                    
                    </ListGroupItem>
                  ))}
                </ListGroup>
              ) : (
                <p>No hay clientes recientes.</p>
              )}
              <Button color="primary" className="mt-3" onClick={() => handleViewChange('clientes')}>
                Ver Todos los Clientes
              </Button>
            </CardBody>
          </Card>
        </Col>

        {/* Tarjeta de Envíos: Total y Últimos Realizados */}
        <Col md="6" lg="6">
          <Card className="shadow-sm border-0 h-100">
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-send-check-fill fs-1 text-warning me-3"></i>
                <div>
                  <CardTitle tag="h5" className="mb-0">Total de Envíos</CardTitle>
                  <CardText className="display-4 fw-bold text-warning">{totalEnvios}</CardText>
                </div>
              </div>
              <hr />
              <h6 className="mb-3">Últimos Envíos Realizados</h6>
              {ultimosEnvios.length > 0 ? (
                <ListGroup flush>
                  {ultimosEnvios.map((envio) => (
                    <ListGroupItem key={envio.idEnvios} className="d-flex justify-content-between align-items-center">
                      <span>Envío a {envio.cliente}</span>
                      <small className="text-muted">{new Date(envio.fechaSolicitud).toLocaleDateString()} - {envio.estado}</small>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              ) : (
                <p>No hay envíos recientes.</p>
              )}
              <Button color="warning" className="mt-3" onClick={() => handleViewChange('envios')}>
                Ver Todos los Envíos
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}