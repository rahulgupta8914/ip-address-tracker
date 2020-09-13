import React, { useState, useEffect } from "react";
import "./App.css";
import L from 'leaflet'
import { ReactComponent as ArrowSvg } from "./img/icon-arrow.svg";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Axios from "axios";

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
  const [curIP, setCurIP] = useState('')
  const [iP, setIP] = useState('')
  const [cords, setCords] = React.useState([34.0522, -118.2437]);
  const [locationInfo, setlocationInfo] = useState({
    ipAddress: '192.212.174.101',
    location: 'Brooklyn, NY 10001',
    isp: 'SpaceX Starlink',
    timezone: 'UTC -05:00'
  })

  useEffect(() => {
    getCurrentIP()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    setIP(e.target.value);
  }
  
  const getCurrentIP = async () => {
   try {
    const response = await Axios.get('https://cors-anywhere.herokuapp.com/https://api.ipify.org/');
    await getCordsFromIP(response.data)
    setCurIP(response.data)
   } catch (error) {
    //  console.log({error})
   }
  }

  const getCordsFromIP = async (ip) => {
    try {
    let url = `https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPFYKEY8484}&ipAddress=${ip !== undefined && ip.length !== 0 ? ip : curIP}`
      const response = await Axios.get(url)
      if(response.data.ip){
        const {location,ip, isp} = response.data
        setCords([location.lat,location.lng])
        setlocationInfo({
          ipAddress: ip,
          isp: isp,
          location: `${location.city}, ${location.country} ${location.postalCode}`,
          timezone: location.timezone
        })
      }
      
    } catch (error) {
      // console.log(error)
    }

  }


  const  truncate = (str, n=28) => {
    return (str.length > n) ? `${str.substr(0, n-1)}...` : str;
  };

  return (
    <>
    <header>
      <div className="search-area">
        {/* <div className="form-area">
          <h1 className="text-h">IP Address Tracker</h1>
          <div className="searchbox">
            <input placeholder="Search for any IP address or domain" onChange={onSubmit} />
            <div className="button" onClick={()=>{getCordsFromIP(iP)}}>
              <ArrowSvg />
            </div>
          </div>
        </div> */}
      </div>
      <div className="card-area">
        <div className="card-item">
            <div className="card-title">IP ADDRESS</div>
            <div className="card-border-wrapper">
            <div className="card-value"><span>{locationInfo.ipAddress ? truncate(locationInfo.ipAddress) : "192.212.174.101"}</span></div>
            <div className="card-right-border"></div>
            </div>
        </div>
        <div className="card-item">
            <div className="card-title">LOCATION</div>
            <div className="card-border-wrapper">
              <div className="card-value"><span>{locationInfo.location ? truncate(locationInfo.location) : "Brooklyn, NY 10001"}</span></div>
              <div className="card-right-border"></div>
              </div>
          </div>
          <div className="card-item">
            <div className="card-title">TIMEZONE</div>
            <div className="card-border-wrapper">
            <div className="card-value"><span>{locationInfo.timezone ? truncate(locationInfo.timezone) : "UTC -05:00"}</span></div>
            <div className="card-right-border"></div>
            </div>
          </div>
          <div className="card-item">
            <div className="card-title">ISP</div>
            <div className="card-value"><span>{locationInfo.isp ? truncate(locationInfo.isp) : "SpaceX Starlink"}</span></div>
          </div>
      </div>
      <Map center={cords} zoom={19} className="mapview" >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
        <Marker position={cords} icon={pointerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </header>
    </>
  );
}

export default App;
