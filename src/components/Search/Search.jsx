import  { useState } from 'react';
import { DropdownList, NumberPicker, DatePicker } from 'react-widgets';
import 'react-widgets/styles.css';

const AdvancedSearchFilter = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        type: '',
        minPrice: null,
        maxPrice: null,
        minBedrooms: null,
        maxBedrooms: null,
        dateAdded: null,
        postcode: '',
    });

    const handleInputChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters); // Pass filters to parent
    };

    const propertyTypes = ['Any', 'House', 'Flat']; // Example dropdown values

    return (
        <form className="mb-5" onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-4">
                    <label htmlFor="type" className="form-label">
                        Property Type
                    </label>
                    <DropdownList
                        data={propertyTypes}
                        value={filters.type || 'Any'}
                        onChange={(value) => handleInputChange('type', value === 'Any' ? '' : value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="minPrice" className="form-label">
                        Min Price
                    </label>
                    <NumberPicker
                        placeholder="Enter minimum price"
                        value={filters.minPrice}
                        onChange={(value) => handleInputChange('minPrice', value)}
                        min={0}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="maxPrice" className="form-label">
                        Max Price
                    </label>
                    <NumberPicker
                        placeholder="Enter maximum price"
                        value={filters.maxPrice}
                        onChange={(value) => handleInputChange('maxPrice', value)}
                        min={0}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="minBedrooms" className="form-label">
                        Min Bedrooms
                    </label>
                    <NumberPicker
                        placeholder="Enter minimum bedrooms"
                        value={filters.minBedrooms}
                        onChange={(value) => handleInputChange('minBedrooms', value)}
                        min={0}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="maxBedrooms" className="form-label">
                        Max Bedrooms
                    </label>
                    <NumberPicker
                        placeholder="Enter maximum bedrooms"
                        value={filters.maxBedrooms}
                        onChange={(value) => handleInputChange('maxBedrooms', value)}
                        min={0}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="dateAdded" className="form-label">
                        Date Added
                    </label>
                    <DatePicker
                        value={filters.dateAdded}
                        onChange={(value) => handleInputChange('dateAdded', value)}
                        placeholder="Select a date"
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="postcode" className="form-label">
                        Postcode Area
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., BR1, NW1"
                        name="postcode"
                        value={filters.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
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
