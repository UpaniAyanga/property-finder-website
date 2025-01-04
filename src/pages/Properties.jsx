import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdvancedSearchFilter from "../components/Search/Search.jsx";
import FavouriteOption from "./FavouriteOption.jsx"; // Import FavouriteOption
import propertiesData from "../data/properties.json"; // Directly import JSON file

const Properties = () => {
    const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);
    const [properties] = useState(propertiesData.properties);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Load favorites from localStorage when component mounts
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites) {
            setFavorites(storedFavorites);
        }
    }, []);

    // Save favorites to localStorage whenever the list changes
    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    const handleFilter = (filters) => {
        const { location, priceRange, propertyType } = filters;

        const [minPrice, maxPrice] = priceRange
            ? priceRange.split("-").map(Number)
            : [null, null];

        const filtered = properties.filter((property) => {
            const matchesLocation = location
                ? property.location.toLowerCase().includes(location.toLowerCase())
                : true;
            const matchesPrice =
                priceRange && minPrice !== null && maxPrice !== null
                    ? property.price >= minPrice && property.price <= maxPrice
                    : true;
            const matchesType = propertyType
                ? property.type.toLowerCase() === propertyType.toLowerCase()
                : true;

            return matchesLocation && matchesPrice && matchesType;
        });

        setFilteredProperties(filtered);
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

    return (
        <Container className="my-5">
            <Row className="mb-4 text-center">
                <Col>
                    <h1>Properties</h1>
                    <p>Discover our wide range of properties to find the perfect home for you.</p>
                </Col>
            </Row>
            <Row>
                <AdvancedSearchFilter onFilter={handleFilter} />
            </Row>
            <Row>
                <Col md={8}>
                    <Row>
                        {filteredProperties.map((property) => (
                            <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
                                <Card
                                    className="property-card"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, property)}
                                    style={{ cursor: "grab" }}
                                >
                                    <Card.Img variant="top" src={property.picture} />
                                    <Card.Body>
                                        <Card.Title>{property.type}</Card.Title>
                                        <Card.Text>{property.shortDescription}</Card.Text>
                                        <Button
                                            as={Link}
                                            to={`/properties/${property.id}`}
                                            variant="outline-primary"
                                        >
                                            More Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
                {/* Favourites Section */}
                <Col md={4}>
                    <FavouriteOption
                        favorites={favorites}
                        setFavorites={setFavorites}
                    />
                    {/* Drop Zone for Drag-Out Removal */}
                    <div
                        onDrop={handleDragOutDrop}
                        onDragOver={(e) => e.preventDefault()}
                        style={{
                            marginTop: "20px",
                            padding: "10px",
                            border: "2px dashed #ccc",
                            textAlign: "center",
                            borderRadius: "5px",
                            backgroundColor: "#f9f9f9",
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
