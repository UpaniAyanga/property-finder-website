import { useState, useEffect } from "react";
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

/**
 * PropertyDetails component displays detailed information about a specific property.
 * @component
 */
const PropertyDetails = () => {
  // Extract the property ID from the URL parameters
  const { id } = useParams();

  // State to store the selected property details
  const [property, setProperty] = useState(null);

  // State to manage the selected image for the carousel
  const [selectedImage, setSelectedImage] = useState("");

  // State to control the visibility of the full description
  const [showMore, setShowMore] = useState(false);

  // State to handle modal visibility for viewing floor plans
  const [showModal, setShowModal] = useState(false);

  // Function to show the modal
  const handleShow = () => setShowModal(true);

  // Function to hide the modal
  const handleClose = () => setShowModal(false);

  /**
   * useEffect to fetch the property details using the ID from URL parameters.
   * Runs whenever the `id` changes.
   */
  useEffect(() => {
    // Find the property in the imported JSON file based on the ID
    const property = propertiesData.properties.find((p) => p.id === id);

    // Set the property details to state
    setProperty(property);

    // Set the first image as the selected image for the carousel
    setSelectedImage(property?.images[0] || "");
  }, [id]);

  /**
   * If the property is not found, display a placeholder component
   * indicating that no properties were found.
   */
  if (!property) {
    return <NoPropertiesFound />;
  }

  // Function to toggle the display of full/short description
  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  return (
      <Container fluid className="my-5">
        <Row className="justify-content-center">
          {/* Title Section */}
          <Col md={12} className="text-center mb-4">
            <h2>
              <Badge bg="danger">{property.title}</Badge>
            </h2>
          </Col>

          {/* Main Image Carousel and Thumbnails */}
          <Col md={6} className="text-center">
            {/* Carousel for property images */}
            <Carousel className="mb-3 rounded">
              {property.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                        className="d-block w-100 rounded"
                        src={image}
                        alt="propertyImg"
                    />
                  </Carousel.Item>
              ))}
            </Carousel>

            {/* Thumbnails below the carousel */}
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
                      onClick={() => setSelectedImage(image)} // Update the selected image on click
                  />
              ))}
            </div>
          </Col>

          {/* Property Details Section */}
          <Col md={6}>
            {/* Tabs for property information */}
            <Tabs
                defaultActiveKey="description"
                id="property-tabs"
                className="mb-3"
            >
              {/* Description Tab */}
              <Tab eventKey="description" title="Description">
                <Card className="shadow-sm">
                  <Card.Body>
                    <p className="text-muted text-start">
                      {/* Show a shortened or full description based on the state */}
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

              {/* Details Tab */}
              <Tab eventKey="details" title="Details">
                <Card className="shadow-sm border-0 bg-light">
                  <Card.Body>
                    {/* Render detailed information about the property */}
                    <p className="text-start text-muted">
                      <strong className="text-danger">Price:</strong>{" "}
                      <span className="text-dark">${property.price}</span>
                    </p>
                    <p className="text-start text-muted">
                      <strong className="text-danger">Bedrooms:</strong>{" "}
                      <span className="text-dark">{property.bedroom}</span>
                    </p>
                    <p className="text-start text-muted">
                      <strong className="text-danger">Bathrooms:</strong>{" "}
                      <span className="text-dark">{property.bathroom}</span>
                    </p>
                    <p className="text-start text-muted">
                      <strong className="text-danger">Location:</strong>{" "}
                      <span className="text-dark">{property.location}</span>
                    </p>
                  </Card.Body>
                </Card>
              </Tab>

              {/* Floor Plan Tab */}
              <Tab eventKey="floorplan" title="Floor Plan">
                <Card className="shadow-sm">
                  <Card.Body>
                    {/* Display the floor plan image */}
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
                          onClick={handleShow} // Show modal on click
                          className="zoom-image"
                      />
                    </div>
                  </Card.Body>
                </Card>

                {/* Modal for enlarged floor plan */}
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

              {/* Map Tab */}
              <Tab eventKey="map" title="Map">
                <Card className="shadow-sm">
                  <Card.Body>
                    {/* Render map component */}
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
