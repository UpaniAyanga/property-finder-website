import React from 'react'
import { Marker, Popup } from "react-leaflet";
import "./pin.css";
import { Link } from "react-router-dom";

/**
 * Pin component represents a marker on the map with a popup displaying property details.
 * @component
 * @param {Object} item - The item to display on the map.
 * @param {number} item.latitude - The latitude of the item's location.
 * @param {number} item.longitude - The longitude of the item's location.
 * @param {string} item.picture - The URL of the item's picture.
 * @param {string} item.title - The title of the item.
 * @param {number} item.bedroom - The number of bedrooms in the item.
 * @param {number} item.price - The price of the item.
 * @param {string} item.id - The unique identifier of the item.
 * @returns {JSX.Element} The rendered Pin component.
 */
function Pin({ item }) {
    return (
        <Marker position={[item?.latitude, item.longitude]}>
            <Popup>
                <div className="popupContainer">
                    <img src={item.picture} alt="" />
                    <div className="textContainer">
                        <Link to={`/${item.id}`}>{item.title}</Link>
                        <span>{item.bedroom} bedroom</span>
                        <b>$ {item.price}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default Pin