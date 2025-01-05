import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdvancedSearchFilter from "../components/Search/Search.jsx";
import FavouriteOption from "./FavouriteOption.jsx";
import propertiesData from "../../public/data/properties.json";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import NoPropertiesFound from "./NoPropertyFound.jsx"; // Import favorite icons

/**
 * Properties component displays a list of properties with filtering and favorite functionality.
 * @component
 */
const Properties = () => {
  // State to store the currently filtered list of properties
  const [filteredProperties, setFilteredProperties] = useState(
      propertiesData.properties
  );

  // State to store the complete list of properties
  const [properties] = useState(propertiesData.properties);

  // State to store the list of favorite properties, loaded from localStorage if available
  const [favorites, setFavorites] = useState(
      JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Effect to load favorites from localStorage on component mount
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")));
  }, []);

  // Effect to save favorites to localStorage whenever the `favorites` state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Filters properties based on the query object.
   * @param {Object} query - The filter criteria.
   */
  const handleFilter = (query) => {
    let data = properties;

    // Filter by property type
    if (query?.propertyType) {
      data = data.filter(
          (property) =>
              property.propertyType &&
              property.propertyType.toLowerCase() === query.propertyType.toLowerCase()
      );
    }

    // Filter by maximum price
    if (query?.maxPrice) {
      data = data.filter((property) => property.price <= query.maxPrice);
    }

    // Filter by minimum price
    if (query?.minPrice) {
      data = data.filter((property) => property.price >= query.minPrice);
    }

    // Filter by location
    if (query?.location) {
      data = data.filter((property) =>
          property.location.toLowerCase().includes(query.location.toLowerCase())
      );
    }

    // Filter by the number of bedrooms
    if (query?.bedroom) {
      data = data.filter((property) => property.bedroom === query.bedroom);
    }

    // Filter by the date added
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

    // Filter by the number of bathrooms
    if (query?.bathroom) {
      data = data.filter((property) => property.bathroom === query.bathroom);
    }

    // Update the filtered properties state
    setFilteredProperties(data);
  };

  /**
   * Handles the drag start event for a property card.
   * @param {Object} e - The event object.
   * @param {Object} property - The property being dragged.
   */
  const handleDragStart = (e, property) => {
    // Store the property data in the drag event
    e.dataTransfer.setData("property", JSON.stringify(property));
  };

  /**
   * Handles the drop event to remove a property from favorites.
   * @param {Object} e - The event object.
   */
  const handleDragOutDrop = (e) => {
    e.preventDefault();
    // Get the property ID from the dragged data
    const propertyId = e.dataTransfer.getData("removeProperty");

    // Remove the property from the favorites list
    setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== propertyId)
    );
  };

  /**
   * Toggles the favorite status of a property.
   * @param {Object} property - The property to toggle favorite status.
   */
  const toggleFavorite = (property) => {
    // Check if the property is already a favorite
    if (favorites.find((fav) => fav.id === property.id)) {
      // If it is, remove it from the favorites list
      setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.id !== property.id)
      );
    } else {
      // If it isn't, add it to the favorites list
      setFavorites((prevFavorites) => [...prevFavorites, property]);
    }
  };

  /**
   * Checks if a property is in the favorites list.
   * @param {Object} property - The property to check.
   * @returns {boolean} - True if the property is a favorite, false otherwise.
   */
  const isFavorite = (property) =>
      favorites.some((fav) => fav.id === property.id);

  return (
      <Container className="my-3">
        {/* Header Section */}
        <Row className="mb-4 text-center">
          <Col>
            <h1 className="fw-bold">Properties</h1>
            <p className="text-dark fw-semibold">
              Discover our wide range of properties to find the perfect home for
              you.
            </p>
          </Col>
        </Row>

        {/* Search Filter Component */}
        <Row>
          <AdvancedSearchFilter onFilter={handleFilter} />
        </Row>

        <Row>
          {/* Properties Listing */}
          <Col md={8}>
            <Row>
              {filteredProperties.length > 0 ? (
                  // Map through the filtered properties and render each card
                  filteredProperties.map((property) => (
                      <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card
                            className="property-card"
                            draggable
                            onDragStart={(e) => handleDragStart(e, property)}
                            style={{ cursor: "grab" }}
                        >
                          {/* Price Badge */}
                          <div
                              className="position-absolute top-0 start-0 m-2 bg-danger-subtle fw-semibold px-3 py-1 rounded"
                              style={{ zIndex: 1 }}
                          >
                            ${property.price}
                          </div>
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
                                {/* Toggle favorite icon */}
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
                  // Show a message if no properties match the filter
                  <Col>
                    <NoPropertiesFound />
                  </Col>
              )}
            </Row>
          </Col>

          {/* Favorites Section */}
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
