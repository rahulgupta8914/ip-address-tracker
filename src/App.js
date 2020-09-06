import React from "react";
import "./App.css";
import L from 'leaflet'
import { ReactComponent as ArrowSvg } from "./img/icon-arrow.svg";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
const position = [34.0522, -118.2437]

export const pointerIcon = new L.Icon({
  iconUrl: require('./img/icon-location.svg'),
  iconRetinaUrl: require('./img/icon-location.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [30,35],
  // shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

function App() {
  
  return (
    <>
    <header>
      <div className="search-area">
        <div className="form-area">
          <h1 className="text-h">IP Address Tracker</h1>
          <div className="searchbox">
            <input placeholder="Search for any IP address or domain" />
            <div className="button">
              <ArrowSvg />
            </div>
          </div>
        </div>
      </div>
      <div className="card-area">
        <div className="card-item-container">
          <div className="card-item">
            <div className="card-title">IP ADDRESS</div>
            <div className="card-value">192.212.174.101</div>
          </div>
          <div className="card-right-border"></div>
        </div>
        <div className="card-item-container">
          <div className="card-item">
            <div className="card-title">LOCATION</div>
            <div className="card-value">Brooklyn, NY 10001</div>
          </div>
          <div className="card-right-border"></div>
        </div>
        <div className="card-item-container">
          <div className="card-item">
            <div className="card-title">TIMEZONE</div>
            <div className="card-value">UTC -05:00</div>
          </div>
          <div className="card-right-border"></div>
        </div>
        <div className="card-item-container">
          <div className="card-item">
            <div className="card-title">ISP</div>
            <div className="card-value">SpaceX Starlink</div>
          </div>
        </div>
      </div>
      {/* <div className="mapview"> */}
      <Map center={position} zoom={19} className="mapview" >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
        <Marker position={position} icon={pointerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
  {/* </div> */}
    </header>
    </>
  );
}

export default App;
