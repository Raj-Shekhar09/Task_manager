import React, { useState } from 'react'
import Register from './Register';
import { Route,Routes,Navigate } from 'react-router-dom';
import Login1 from './Login1';
import "./Flipcard.css"

const Flipcard = () => {
    const [flip, setFlip] = useState(false);

    return (
      <div className={`auth-container ${flip ? 'flipped' : ''}`}>
        <div className="card">
          <div className="front">
            <Login1 onFlip={() => setFlip(true)} />
          </div>
          <div className="back">
            <Register onFlip={() => setFlip(false)} />
          </div>
        </div>
    
      </div>
    );
}

export default Flipcard