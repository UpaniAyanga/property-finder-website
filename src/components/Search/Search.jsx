import { useState } from "react";
import { Form } from "react-bootstrap";
import { DropdownList } from "react-widgets";
import "react-widgets/styles.css";

/**
 * AdvancedSearchFilter component provides a form for filtering properties based on various criteria.
 * @component
 * @param {Function} onFilter - Function to handle the filter action.
 */
const AdvancedSearchFilter = ({ onFilter }) => {
  // State to store the filter criteria
  const [filters, setFilters] = useState({
    minPrice: "", // Minimum price for filtering
    maxPrice: "", // Maximum price for filtering
    bedroom: "",  // Number of bedrooms
    bathroom: "", // Number of bathrooms
    added: "",    // Date property was added
    location: "", // Location of the property
    propertyType: "", // Type of property (e.g., House, Flat, Apartment)
  });

  /**
   * Handles input changes and updates the filter state dynamically.
   * @param {string} name - The name of the filter field to update.
   * @param {string} value - The new value of the filter field.
   */
  const handleInputChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  /**
   * Handles form submission, preventing default behavior and triggering the filter action.
   * Passes the current filters state to the `onFilter` function.
   * @param {Object} e - The form submit event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters); // Pass filters to parent component for handling
  };

  // List of property types to display in the dropdown list
  const propertyTypes = ["Any", "House", "Flat", "Apartment"];

  return (
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Property Type Dropdown */}
          <div className="col-md-4">
            <label htmlFor="type" className="form-label">
              Property Type
            </label>
            <DropdownList
                data={propertyTypes}
                value={filters.propertyType || "Any"} // Default to "Any" if no value is selected
                onChange={(value) =>
                    handleInputChange("propertyType", value === "Any" ? "" : value)
                }
            />
          </div>

          {/* Minimum Price Input */}
          <div className="col-md-4">
            <label htmlFor="minPrice" className="form-label">
              Min Price
            </label>
            <Form.Control
                type="number"
                value={filters.minPrice}
                name="minPrice"
                onChange={(e) => handleInputChange("minPrice", e.target.value)}
            />
          </div>

          {/* Maximum Price Input */}
          <div className="col-md-4">
            <label htmlFor="maxPrice" className="form-label">
              Max Price
            </label>
            <Form.Control
                type="number"
                value={filters.maxPrice}
                name="maxPrice"
                onChange={(e) => handleInputChange("maxPrice", e.target.value)}
            />
          </div>

          {/* Bedrooms Input */}
          <div className="col-md-4">
            <label htmlFor="bedroom" className="form-label">
              Bedrooms
            </label>
            <Form.Control
                type="number"
                value={filters.bedroom}
                name="bedroom"
                onChange={(e) => handleInputChange("bedroom", e.target.value)}
            />
          </div>

          {/* Date Added Input */}
          <div className="col-md-4">
            <label htmlFor="added" className="form-label">
              Date Added
            </label>
            <Form.Control
                type="date"
                value={filters.added}
                name="added"
                onChange={(e) => handleInputChange("added", e.target.value)}
            />
          </div>

          {/* Location Input */}
          <div className="col-md-4">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
                type="text"
                className="form-control"
                placeholder="e.g. London, BR1, NW1"
                name="location"
                value={filters.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="row mt-4">
          <div className="col d-flex justify-content-center">
            <button className="btn btn-danger" type="submit">
              Search Property
            </button>
          </div>
        </div>
      </form>
  );
};

export default AdvancedSearchFilter;
