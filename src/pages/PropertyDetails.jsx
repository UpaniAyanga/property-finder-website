import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Tabs,
  Tab,
  Badge,
  Carousel,
  Button,
  Modal,
} from "react-bootstrap";
import propertiesData from "../../public/data/properties.json";
import Map from "../components/map/Map";
import NoPropertiesFound from "./NoPropertyFound.jsx";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Toggle Modal visibility
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    // Find the property by id directly from the imported propertiesData
    const property = propertiesData.properties.find((p) => p.id === id);
    setProperty(property);
    setSelectedImage(property?.images[0] || "");
  }, [id]);

  if (!property) {
    return (
      <NoPropertiesFound />
    );
  }

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  return (
    <Container fluid className="my-5">
      <Row className="justify-content-center">
        <Col md={12} className="text-center mb-4">
          <h2>
            <Badge bg="danger">{property.title}</Badge>
          </h2>
        </Col>

        {/* Main Image and Thumbnails */}
        <Col md={6} className="text-center">
          <Carousel className="mb-3 rounded">
            {property.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 rounded" src={image}  alt="propertyImg"/>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {property.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                fluid
                className="border rounded"
                style={{
                  cursor: "pointer",
                  width: "80px",
                  height: "80px",
                }}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </Col>

        {/* Property Info */}
        <Col md={6}>
          <Tabs
            defaultActiveKey="description"
            id="property-tabs"
            className="mb-3"
          >
            <Tab eventKey="description" title="Description">
              <Card className="shadow-sm">
                <Card.Body>
                  <p className="text-muted text-start">
                    {showMore
                      ? property.description
                      : property.description.slice(0, 400) + "..."}
                  </p>
                  <Button variant="link" onClick={toggleDescription}>
                    {showMore ? "Show Less" : "Show More"}
                  </Button>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="details" title="Details">
              <Card className="shadow-sm border-0 bg-light">
                <Card.Body>
                  <p className="text-start text-muted">
                    <strong className="text-danger">Price:</strong> <span className="text-dark">${property.price}</span>
                  </p>
                  <p className="text-start text-muted">
                    <strong className="text-danger">Bedrooms:</strong> <span className="text-dark">{property.bedroom}</span>
                  </p>
                  <p className="text-start text-muted">
                    <strong className="text-danger">Bathrooms:</strong> <span className="text-dark">{property.bathroom}</span>
                  </p>
                  <p className="text-start text-muted">
                    <strong className="text-danger">Location:</strong> <span className="text-dark">{property.location} </span>
                  </p>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="floorplan" title="Floor Plan">
              <Card className="shadow-sm">
                <Card.Body>
                  <div
                    className="d-flex justify-content-center align-items-center bg-light text-secondary border rounded"
                    style={{ height: "300px" }}
                  >
                    <img
                      src={property.floorplan}
                      alt="Floor Plan"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        cursor: "zoom-in",
                      }}
                      onClick={handleShow}
                      className="zoom-image"
                    />
                  </div>
                </Card.Body>
              </Card>
              <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title className="text-danger">Floor Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div
                    className="d-flex justify-content-center"
                    style={{ maxHeight: "500px", overflow: "hidden" }}
                  >
                    <img
                      src={property.floorplan}
                      alt="Floor Plan"
                      style={{
                        width: "500px",
                        height: "auto",
                        cursor: "zoom-out",
                      }}
                    />
                  </div>
                </Modal.Body>
              </Modal>
            </Tab>
            <Tab eventKey="map" title="Map">
              <Card className="shadow-sm">
                <Card.Body>
                  <div
                    className="d-flex justify-content-center align-items-center bg-light text-secondary border rounded"
                    style={{ height: "350px", width: "100%" }}
                  >
                    <Map items={[property]} />
                  </div>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;
