import React from 'react';
import { Weapon } from '../models/Weapon';

interface WeaponStatsProps {
  weapon: Weapon;
}

const WeaponStats: React.FC<WeaponStatsProps> = ({ weapon }) => {
  return (
    <div className="weapon-stats">
      <h3>{weapon.name}</h3>
      <div className="stat-bars">
        <div className="stat">
          <label>Damage</label>
          <div className="bar-container">
            <div className="bar" style={{ width: `${weapon.damage}%` }}></div>
          </div>
        </div>
        <div className="stat">
          <label>Fire Rate</label>
          <div className="bar-container">
            <div className="bar" style={{ width: `${weapon.fireRate}%` }}></div>
          </div>
        </div>
        <div className="stat">
          <label>Accuracy</label>
          <div className="bar-container">
            <div className="bar" style={{ width: `${weapon.accuracy}%` }}></div>
          </div>
        </div>
        <div className="stat">
          <label>Range</label>
          <div className="bar-container">
            <div className="bar" style={{ width: `${weapon.range}%` }}></div>
          </div>
        </div>
        <div className="stat">
          <label>Mobility</label>
          <div className="bar-container">
            <div className="bar" style={{ width: `${weapon.mobility}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeaponStats;