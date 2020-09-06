import React, { useState, useEffect } from "react";
import "./App.css";
import L from 'leaflet'
import { ReactComponent as ArrowSvg } from "./img/icon-arrow.svg";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Axios from "axios";
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
  const [curIP, setCurIP] = useState('')
  const [iP, setIP] = useState('')
  const [cords, setCords] = React.useState([34.0522, -118.2437]);

  useEffect(() => {
    getCurrentIP()
  }, [])
  useEffect(() => {
    getCordsFromIP(undefined);
  }, [curIP])

  const onSubmit = (e) => {
    setIP(e.target.value);
  }
  const getCurrentIP = async () => {
    const response = await Axios.get('https://www.cloudflare.com/cdn-cgi/trace');
    const text = response.data.replace(/(\r\n|\n|\r)/gm, "=");
      const arrayText =  text.split("=")
      let ip = '';
      arrayText.map((p,i)=>{
        if(p.trim() === "ip"){
          ip = arrayText[i+1]
        }
      })
      setCurIP(ip)
  }

  const getCordsFromIP = async (ip) => {
    // todo validate IP
    let url = `http://api.ipstack.com/${ip}?access_key=${process.env.REACT_APP_IPSTACKKEY}&format=1`
    if(ip !== undefined && ip.length !== 0){
      url = `${url}${ip}`
    } else {
      url = `http://api.ipstack.com/${curIP}?access_key=${process.env.REACT_APP_IPSTACKKEY}&format=1`
    }
    try {
      const response = await Axios.get(url)
      setCords([response.data.latitude,response.data.longitude])
    } catch (error) {
      // console.log(error)
    }

  }

  return (
    <>
    <header>
      <div className="search-area">
        <div className="form-area">
          <h1 className="text-h">IP Address Tracker</h1>
          <div className="searchbox">
            <input placeholder="Search for any IP address or domain" onChange={onSubmit} />
            <div className="button" onClick={()=>{getCordsFromIP(iP)}}>
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
  {/* </div> */}
    </header>
    </>
  );
}

export default App;
