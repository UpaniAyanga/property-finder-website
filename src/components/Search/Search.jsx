import { useState } from "react";
import { Form } from "react-bootstrap";
import { DropdownList } from "react-widgets";
import "react-widgets/styles.css";

const AdvancedSearchFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedroom: "",
    bathroom: "",
    added: "",
    location: "",
    propertyType: "",
  });

  const handleInputChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters); // Pass filters to parent
  };

  const propertyTypes = ["Any", "House", "Flat", "Apartment"];

  return (
    <form className="mb-5" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-4">
          <label htmlFor="type" className="form-label">
            Property Type
          </label>
          <DropdownList
            data={propertyTypes}
            value={filters.propertyType || "Any"}
            onChange={(value) =>
              handleInputChange("propertyType", value === "Any" ? "" : value)
            }
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="minPrice" className="form-label">
            Min Price
          </label>
          <Form.Control
            type="minPrice"
            value={filters.minPrice}
            name="minPrice"
            onChange={(e) => handleInputChange("minPrice", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="maxPrice" className="form-label">
            Max Price
          </label>
          <Form.Control
            type="maxPrice"
            value={filters.maxPrice}
            name="maxPrice"
            onChange={(e) => handleInputChange("maxPrice", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="bedrrom" className="form-label">
            Bedrooms
          </label>
          <Form.Control
            type="bedroom"
            value={filters.bedroom}
            name="bedroom"
            onChange={(e) => handleInputChange("bedroom", e.target.value)}
          />
        </div>
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
