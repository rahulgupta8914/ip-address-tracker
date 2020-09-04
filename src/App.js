import React from 'react';
import './App.css';

function App() {
  return (
      <header>
        <div className="search-area">
        <h1>
        IP Address Tracker
        </h1>
        <input placeholder="Search for any IP address or domain" />
        <button title="search"> Search</button>
        </div>
            <div className="card-area">
            card area 
          </div>
          <div className="mapview">
            Map Area
          </div>
      </header>
  );
}

export default App;
