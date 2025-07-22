import React from 'react';
import { Weapon, WeaponRarity } from '../models/Weapon';
import { FaSkull, FaBolt, FaCrosshairs, FaArrowsAltH, FaRunning, FaShieldAlt } from 'react-icons/fa';
import { GiBulletBill } from 'react-icons/gi';

interface WeaponStatsProps {
  weapon: Weapon;
  showHeader?: boolean;
  showDetails?: boolean;
  compareValue?: number | null; // For comparison mode
}

const getRarityColor = (rarity: WeaponRarity): string => {
  switch (rarity) {
    case 'Common': return '#b0b0b0';
    case 'Uncommon': return '#2ecc71';
    case 'Rare': return '#3498db';
    case 'Epic': return '#9b59b6';
    case 'Legendary': return '#f1c40f';
    case 'Exotic': return '#ff6b00';
    default: return '#ffffff';
  }
};

const getStatDifferenceClass = (value: number, compareValue?: number | null): string => {
  if (!compareValue) return '';
  return value > compareValue ? 'stat-better' : value < compareValue ? 'stat-worse' : '';
};

const WeaponStats: React.FC<WeaponStatsProps> = ({ 
  weapon, 
  showHeader = true, 
  showDetails = true,
  compareValue = null 
}) => {
  const renderStatBar = (value: number, icon: React.ReactNode, label: string, max?: number) => {
    const maxValue = max || 100;
    const displayValue = Math.min(value, maxValue);
    const widthPercentage = (displayValue / maxValue) * 100;
    
    return (
      <div className={`stat ${getStatDifferenceClass(value, compareValue)}`}>
        <div className="stat-label">
          {icon}
          <span>{label}</span>
          {showDetails && (
            <span className="stat-value">
              {value}{max ? `/${max}` : ''}
              {compareValue !== null && compareValue !== undefined && (
                <span className="compare-value">
                  ({compareValue > value ? '-' : '+'}{Math.abs(compareValue - value)})
                </span>
              )}
            </span>
          )}
        </div>
        <div className="bar-container">
          <div 
            className="bar" 
            style={{ 
              width: `${widthPercentage}%`,
              background: getRarityColor(weapon.rarity)
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="weapon-stats">
      {showHeader && (
        <div className="weapon-stats-header">
          <h3 style={{ color: getRarityColor(weapon.rarity) }}>
            {weapon.name}
            {weapon.version && <span className="weapon-version"> {weapon.version}</span>}
          </h3>
          <div className="weapon-type-badge">
            {weapon.type}
          </div>
        </div>
      )}

      <div className="stat-bars">
        {renderStatBar(weapon.stats.damage, <FaSkull />, 'Damage')}
        {renderStatBar(weapon.stats.fireRate, <FaBolt />, 'Fire Rate', 1000)}
        {renderStatBar(weapon.stats.accuracy, <FaCrosshairs />, 'Accuracy')}
        {renderStatBar(weapon.stats.range, <FaArrowsAltH />, 'Range')}
        {renderStatBar(weapon.stats.mobility, <FaRunning />, 'Mobility')}
        {renderStatBar(weapon.stats.control, <FaShieldAlt />, 'Control')}
        
        {weapon.ammo && (
          <div className="ammo-stats">
            <div className="ammo-stat">
              <GiBulletBill />
              <span>Mag: {weapon.ammo.magazine}</span>
            </div>
            <div className="ammo-stat">
              <GiBulletBill />
              <span>Reserve: {weapon.ammo.reserve}</span>
            </div>
            {weapon.ammo.reloadTime && (
              <div className="ammo-stat">
                <GiBulletBill />
                <span>Reload: {weapon.ammo.reloadTime}s</span>
              </div>
            )}
          </div>
        )}
      </div>

      {showDetails && weapon.specialTraits && weapon.specialTraits.length > 0 && (
        <div className="special-traits">
          <h4>Special Traits:</h4>
          <ul>
            {weapon.specialTraits.map((trait, index) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeaponStats;
