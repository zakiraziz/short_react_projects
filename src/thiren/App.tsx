import React from 'react';
import { Weapon } from './models/Weapon';
import WeaponCard from './components/WeaponCard';
import './styles.css';

const App: React.FC = () => {
  const m4a1: Weapon = {
    id: 1,
    name: 'M4A1',
    type: 'Assault Rifle',
    damage: 70,
    fireRate: 80,
    accuracy: 75,
    range: 65,
    mobility: 60,
    imageUrl: 'https://example.com/m4a1.jpg',
    ammo: {
      magazine: 30,
      reserve: 120
    },
    unlockedAt: 1
  };

  const mp5: Weapon = {
    id: 2,
    name: 'MP5',
    type: 'SMG',
    damage: 50,
    fireRate: 90,
    accuracy: 65,
    range: 45,
    mobility: 85,
    imageUrl: 'https://example.com/mp5.jpg',
    ammo: {
      magazine: 30,
      reserve: 120
    },
    unlockedAt: 12
  };

  return (
    <div className="app">
      <h1>Modern Warfare Weapon Stats</h1>
      <div className="weapons-grid">
        <WeaponCard weapon={m4a1} />
        <WeaponCard weapon={mp5} />
      </div>
    </div>
  );
};

export default App;