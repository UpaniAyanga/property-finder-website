import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

/**
 * FavouriteOption component displays a list of favorite properties and allows users to add or remove properties from the favorites list.
 * @component
 * @param {Object[]} favorites - The list of favorite properties.
 * @param {Function} setFavorites - Function to update the list of favorite properties.
 */
const FavouriteOption = ({ favorites, setFavorites }) => {
    // State to track if an item is being dragged over the favorites area
    const [isDraggingOverFavorites, setIsDraggingOverFavorites] = useState(false);

    /**
     * Allows the drop event to occur.
     * @param {Object} e - The event object.
     */
    const allowDrop = (e) => {
        e.preventDefault();
    };

    /**
     * Handles the drop event to add a property to the favorites list.
     * @param {Object} e - The event object.
     */
    const handleDrop = (e) => {
        e.preventDefault();
        const property = JSON.parse(e.dataTransfer.getData("property"));
        if (!favorites.find((fav) => fav.id === property.id)) {
            setFavorites((prevFavorites) => [...prevFavorites, property]);
        }
        setIsDraggingOverFavorites(false);
    };

    /**
     * Removes a property from the favorites list.
     * @param {string} propertyId - The ID of the property to remove.
     */
    const handleRemove = (propertyId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.id !== propertyId)
        );
        localStorage.setItem(favorites);
    };

    /**
     * Handles the drag start event to prepare a property for removal.
     * @param {Object} e - The event object.
     * @param {string} propertyId - The ID of the property being dragged.
     */
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