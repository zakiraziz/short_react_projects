import React, { useState } from 'react';
import { Weapon, WeaponSkin } from '../models/Weapon';
import WeaponStats from './WeaponStats';
import WeaponAttachments from './WeaponAttachments';
import WeaponSkins from './WeaponSkins';
import WeaponMastery from './WeaponMastery';
import './WeaponCard.scss';

interface WeaponCardProps {
  weapon: Weapon;
  onEquip?: (weapon: Weapon) => void;
  onFavorite?: (weaponId: number) => void;
  isFavorite?: boolean;
  showDetails?: boolean;
  className?: string;
}

const WeaponCard: React.FC<WeaponCardProps> = ({ 
  weapon, 
  onEquip, 
  onFavorite, 
  isFavorite = false,
  showDetails = false,
  className = ''
}) => {
  const [currentSkinIndex, setCurrentSkinIndex] = useState(0);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showSkins, setShowSkins] = useState(false);
  const [showMastery, setShowMastery] = useState(false);

  const availableSkins = weapon.skins.filter(skin => skin.unlocked);
  const currentSkin = availableSkins[currentSkinIndex] || weapon.skins[0];

  const handleEquip = () => {
    onEquip?.(weapon);
  };

  const handleFavorite = () => {
    onFavorite?.(weapon.id);
  };

  const nextSkin = () => {
    setCurrentSkinIndex((prev) => 
      prev === availableSkins.length - 1 ? 0 : prev + 1
    );
  };

  const prevSkin = () => {
    setCurrentSkinIndex((prev) => 
      prev === 0 ? availableSkins.length - 1 : prev - 1
    );
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      Common: '#8b8b8b',
      Uncommon: '#1e792c',
      Rare: '#2d69b3',
      Epic: '#8a2d8a',
      Legendary: '#d88c27'
    };
    return colors[rarity as keyof typeof colors] || colors.Common;
  };

  return (
    <div className={`weapon-card ${weapon.rarity.toLowerCase()} ${className}`}>
      {/* Header with weapon name and favorite button */}
      <div className="weapon-header">
        <div className="weapon-title">
          <h3 className="weapon-name">{weapon.name}</h3>
          <span 
            className="weapon-rarity"
            style={{ color: getRarityColor(weapon.rarity) }}
          >
            {weapon.rarity}
          </span>
        </div>
        <div className="weapon-actions">
          <button 
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={handleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ♥
          </button>
          {onEquip && (
            <button className="equip-btn" onClick={handleEquip}>
              Equip
            </button>
          )}
        </div>
      </div>

      {/* Weapon image with skin navigation */}
      <div className="weapon-image-section">
        <div className="weapon-image">
          <img 
            src={currentSkin.imageUrl} 
            alt={weapon.name}
            className="weapon-img"
          />
          {availableSkins.length > 1 && (
            <>
              <button className="skin-nav-btn prev" onClick={prevSkin}>
                ‹
              </button>
              <button className="skin-nav-btn next" onClick={nextSkin}>
                ›
              </button>
              <div className="skin-indicator">
                {currentSkinIndex + 1}/{availableSkins.length}
              </div>
            </>
          )}
        </div>
        <div className="weapon-type-badge">
          {weapon.type}
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="quick-stats">
        <div className="stat-pill">
          <span className="stat-value">{weapon.damage}</span>
          <span className="stat-label">DMG</span>
        </div>
        <div className="stat-pill">
          <span className="stat-value">{weapon.fireRate}</span>
          <span className="stat-label">RPM</span>
        </div>
        <div className="stat-pill">
          <span className="stat-value">{weapon.accuracy}%</span>
          <span className="stat-label">ACC</span>
        </div>
        <div className="stat-pill">
          <span className="stat-value">{weapon.control}%</span>
          <span className="stat-label">CTRL</span>
        </div>
      </div>

      {/* Detailed stats */}
      {showDetails && <WeaponStats weapon={weapon} />}

      {/* Ammo and unlock info */}
      <div className="weapon-meta">
        <div className="meta-item">
          <span className="meta-label">Ammo:</span>
          <span className="meta-value">
            {weapon.ammo.magazine}/{weapon.ammo.reserve} ({weapon.ammo.type})
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Reload:</span>
          <span className="meta-value">{weapon.stats.reloadTime}s</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Unlocked:</span>
          <span className="meta-value">Level {weapon.unlockedAt}</span>
        </div>
      </div>

      {/* Cost section */}
      {weapon.cost && (
        <div className="weapon-cost">
          <span className="cost-credits">{weapon.cost.credits} CR</span>
          {weapon.cost.premiumCurrency && (
            <span className="cost-premium">{weapon.cost.premiumCurrency} GC</span>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="weapon-footer">
        <button 
          className={`action-btn ${showAttachments ? 'active' : ''}`}
          onClick={() => setShowAttachments(!showAttachments)}
        >
          Attachments
        </button>
        <button 
          className={`action-btn ${showSkins ? 'active' : ''}`}
          onClick={() => setShowSkins(!showSkins)}
        >
          Skins ({weapon.skins.length})
        </button>
        <button 
          className={`action-btn ${showMastery ? 'active' : ''}`}
          onClick={() => setShowMastery(!showMastery)}
        >
          Mastery
        </button>
      </div>

      {/* Expandable sections */}
      {showAttachments && (
        <div className="expandable-section">
          <WeaponAttachments weapon={weapon} />
        </div>
      )}

      {showSkins && (
        <div className="expandable-section">
          <WeaponSkins 
            skins={weapon.skins}
            onSkinSelect={(skinId) => {
              const index = weapon.skins.findIndex(skin => skin.id === skinId);
              if (index !== -1) setCurrentSkinIndex(index);
            }}
          />
        </div>
      )}

      {showMastery && (
        <div className="expandable-section">
          <WeaponMastery mastery={weapon.mastery} />
        </div>
      )}

      {/* Perks preview */}
      {weapon.perks.length > 0 && (
        <div className="weapon-perks">
          <div className="perks-label">Perks:</div>
          <div className="perks-list">
            {weapon.perks.slice(0, 2).map((perk, index) => (
              <span key={index} className="perk-tag">
                {perk}
              </span>
            ))}
            {weapon.perks.length > 2 && (
              <span className="perk-tag-more">
                +{weapon.perks.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeaponCard;
