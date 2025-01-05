import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdvancedSearchFilter from "../components/Search/Search.jsx";
import FavouriteOption from "./FavouriteOption.jsx";
import propertiesData from "../../public/data/properties.json";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import NoPropertiesFound from "./NoPropertyFound.jsx"; // Import favorite icons

const Properties = () => {
  const [filteredProperties, setFilteredProperties] = useState(
    propertiesData.properties
  );
  const [properties] = useState(propertiesData.properties);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFilter = (query) => {
    let data = propertiesData.properties;
    if (query?.type) {
      data = data.filter((property) => property.type === query.type);
    }

    if (query?.maxPrice) {
      data = data.filter((property) => property.price <= query.maxPrice);
    }

    if (query?.minPrice) {
      data = data.filter((property) => property.price >= query.minPrice);
    }

    if (query?.location) {
      data = data.filter((property) =>
        property.location.toLowerCase().includes(query.location.toLowerCase())
      );
    }

    if (query?.propertyType) {
      data = data.filter(
        (property) => property.propertyType === query.propertyType
      );
    }

    if (query?.bedroom) {
      data = data.filter((property) => property.bedroom === query.bedroom);
    }
    if (query?.added) {
      const [queryYear, queryMonth, queryDay] = query.added
        .split("-")
        .map(Number);

      data = data.filter((property) => {
        const { year, month, day } = property.added;

        const propertyMonth = new Date(`${month} 1, ${year}`).getMonth() + 1;

        return (
          year === queryYear && propertyMonth === queryMonth && day === queryDay
        );
      });
    }

    if (query?.bathroom) {
      data = data.filter((property) => property.bathroom === query.bathroom);
    }

    setFilteredProperties(data);
  };

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("property", JSON.stringify(property));
  };

  const handleDragOutDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("removeProperty");
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== propertyId)
    );
  };

  const toggleFavorite = (property) => {
    if (favorites.find((fav) => fav.id === property.id)) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== property.id)
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, property]);
    }
  };

  const isFavorite = (property) =>
    favorites.some((fav) => fav.id === property.id);

  return (
    <Container className="my-3">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="fw-bold">Properties</h1>
          <p className="text-dark fw-semibold">
            Discover our wide range of properties to find the perfect home for
            you.
          </p>
        </Col>
      </Row>
      <Row>
        <AdvancedSearchFilter onFilter={handleFilter} />
      </Row>
      <Row>
        <Col md={8}>
          <Row>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
                  <Card
                    className="property-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, property)}
                    style={{ cursor: "grab" }}
                  >
                    <Card.Img variant="top" src={property.picture} />
                    <Card.Body>
                      <Card.Title>{property.title}</Card.Title>
                      <Card.Text>{property.shortDescription}</Card.Text>
                      <div className="d-flex align-items-center justify-content-between">
                        <Button
                          as={Link}
                          to={`/properties/${property.id}`}
                          variant="outline-danger"
                          className="mx-auto"
                          style={{ display: "block" }}
                        >
                          More Details
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => toggleFavorite(property)}
                          className="ms-2"
                        >
                          {isFavorite(property) ? (
                            <FaHeart className="text-danger" size={15} />
                          ) : (
                            <FaRegHeart className="text-muted" size={15} />
                          )}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <NoPropertiesFound />
              </Col>
            )}
          </Row>
        </Col>
        <Col md={4}>
          <FavouriteOption favorites={favorites} setFavorites={setFavorites} />
          <div
            onDrop={handleDragOutDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "2px dashed #ccc",
              textAlign: "center",
              borderRadius: "5px",
              backgroundColor: "#fbdada",
            }}
          >
            Drag here to remove from Favorites
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Properties;
