import  { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const FavouriteOption = ({ favorites, setFavorites }) => {
    const [isDraggingOverFavorites, setIsDraggingOverFavorites] = useState(false);

    const allowDrop = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const property = JSON.parse(e.dataTransfer.getData("property"));
        if (!favorites.find((fav) => fav.id === property.id)) {
            setFavorites((prevFavorites) => [...prevFavorites, property]);
        }
        setIsDraggingOverFavorites(false);
    };

    const handleRemove = (propertyId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.id !== propertyId)
        );
        localStorage.removeItem(propertyId);
    };

    const handleDragOut = (e, propertyId) => {
        e.dataTransfer.setData("removeProperty", propertyId);
        localStorage.removeItem(propertyId);
    };

    return (
        <div
            onDragOver={allowDrop}
            onDragEnter={() => setIsDraggingOverFavorites(true)}
            onDragLeave={() => setIsDraggingOverFavorites(false)}
            onDrop={handleDrop}
            style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                minHeight: "500px",
                backgroundColor: isDraggingOverFavorites ? "#e0f7fa" : "#f9f9f9",
                overflowY: "auto",
            }}
        >
            <h3 className="text-center">Favorites</h3>
            {favorites.length === 0 && (
                <p className="text-center">Drag properties here to add to favorites!</p>
            )}
            {favorites.map((property) => (
                <Card
                    key={property.id}
                    className="mb-3"
                    draggable
                    onDragStart={(e) => handleDragOut(e, property.id)}
                >
                    <Card.Img
                        variant="top"
                        src={property.picture}
                        onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                    />
                    <Card.Body>
                        <Card.Title>{property.type}</Card.Title>
                        <Card.Text>{property.shortDescription}</Card.Text>
                        <Button
                            variant="danger"
                            onClick={() => handleRemove(property.id)}
                        >
                            Remove
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default FavouriteOption;
