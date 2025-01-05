import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.css";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

/**
 * Map component displays a map with markers for the provided items.
 * @component
 * @param {Object[]} items - The list of items to display on the map.
 * @param {string} items[].id - The unique identifier for the item.
 * @param {Object} items[].location - The location of the item.
 * @param {number} items[].location.lat - The latitude of the item's location.
 * @param {number} items[].location.lng - The longitude of the item's location.
 * @returns {JSX.Element} The rendered map component.
 */
function Map({ items }) {
  return (
      <MapContainer
          center={[52.4797, -1.90269]}
          zoom={7}
          scrollWheelZoom={false}
          className="map"
      >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map((item) => (
            <Pin item={item} key={item.id} />
        ))}
      </MapContainer>
  );
}

export default Map;