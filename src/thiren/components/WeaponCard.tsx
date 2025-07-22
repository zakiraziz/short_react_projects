import React from 'react';
import { Weapon } from '../models/Weapon';
import WeaponStats from './WeaponStats';
import { FaLevelUpAlt, FaWeightHanging, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { GiAmmoBox, GiCrosshair } from 'react-icons/gi';
import './WeaponCard.css'; // Assuming you have a CSS file for styling

interface WeaponCardProps {
  weapon: Weapon;
  onSelect?: (weapon: Weapon) => void;
  isSelected?: boolean;
  showDetails?: boolean;
}

const WeaponCard: React.FC<WeaponCardProps> = ({ 
  weapon, 
  onSelect, 
  isSelected = false,
  showDetails = true 
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(weapon);
    }
  };

  const rarityClass = `rarity-${weapon.rarity.toLowerCase()}`;

  return (
    <div 
      className={`weapon-card ${isSelected ? 'selected' : ''} ${rarityClass}`}
      onClick={handleClick}
      data-testid="weapon-card"
    >
      <div className="weapon-header">
        <h3 className="weapon-name">{weapon.name}</h3>
        {weapon.isNew && <span className="new-badge">NEW</span>}
        {weapon.isPopular && <FaStar className="popular-icon" />}
      </div>

      <div className="weapon-image-container">
        <img 
          src={weapon.imageUrl} 
          alt={weapon.name} 
          className="weapon-image"
          loading="lazy"
        />
        {weapon.camo && (
          <div className="camo-overlay" style={{ backgroundImage: `url(${weapon.camo})` }} />
        )}
      </div>

      <WeaponStats weapon={weapon} />

      {showDetails && (
        <div className="weapon-meta">
          <div className="meta-row">
            <span className="meta-label">
              <GiCrosshair /> Type:
            </span>
            <span>{weapon.type}</span>
          </div>
          
          <div className="meta-row">
            <span className="meta-label">
              <GiAmmoBox /> Ammo:
            </span>
            <span>{weapon.ammo.magazine}/{weapon.ammo.reserve}</span>
          </div>
          
          <div className="meta-row">
            <span className="meta-label">
              <FaLevelUpAlt /> Unlock:
            </span>
            <span>Level {weapon.unlockedAt}</span>
          </div>
          
          <div className="meta-row">
            <span className="meta-label">
              <FaWeightHanging /> Weight:
            </span>
            <span>{weapon.weight} kg</span>
          </div>
          
          <div className="meta-row">
            <span className="meta-label">
              <FaMoneyBillWave /> Cost:
            </span>
            <span>${weapon.cost.toLocaleString()}</span>
          </div>
        </div>
      )}

      {weapon.specialAbility && (
        <div className="special-ability">
          <h4>Special Ability:</h4>
          <p>{weapon.specialAbility}</p>
        </div>
      )}

      <div className="weapon-footer">
        <span className="weapon-version">{weapon.version}</span>
        {weapon.attachments.length > 0 && (
          <span className="attachments-count">
            {weapon.attachments.length} attachments
          </span>
        )}
      </div>
    </div>
  );
};

export default WeaponCard;
