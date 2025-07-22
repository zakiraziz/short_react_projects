import React from 'react';
import { Weapon } from '../models/Weapon';
import WeaponStats from './WeaponStats';

interface WeaponCardProps {
  weapon: Weapon;
}

const WeaponCard: React.FC<WeaponCardProps> = ({ weapon }) => {
  return (
    <div className="weapon-card">
      <div className="weapon-image">
        <img src={weapon.imageUrl} alt={weapon.name} />
      </div>
      <WeaponStats weapon={weapon} />
      <div className="weapon-meta">
        <span>Type: {weapon.type}</span>
        <span>Ammo: {weapon.ammo.magazine}/{weapon.ammo.reserve}</span>
        <span>Unlocked at level {weapon.unlockedAt}</span>
      </div>
    </div>
  );
};

export default WeaponCard;