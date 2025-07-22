import React, { useState, useEffect } from 'react';
import { Weapon } from './models/Weapon';
import WeaponCard from './components/WeaponCard';
import WeaponFilter from './components/WeaponFilter';
import WeaponComparison from './components/WeaponComparison';
import Loader from './components/Loader';
import './styles.css';

const App: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeapons, setSelectedWeapons] = useState<Weapon[]>([]);
  const [filters, setFilters] = useState({
    type: '',
    search: '',
    minLevel: 0,
    sortBy: 'name'
  });

  // Mock API fetch
  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockWeapons: Weapon[] = [
          {
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
            unlockedAt: 1,
            rarity: 'Rare',
            cost: 2500,
            weight: 3.4,
            isNew: true,
            attachments: ['Red Dot Sight', 'Extended Mag', 'Suppressor'],
            specialAbility: 'Reduced recoil for first 5 shots'
          },
          {
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
            unlockedAt: 12,
            rarity: 'Uncommon',
            cost: 1800,
            weight: 2.9,
            isPopular: true,
            attachments: ['Holographic Sight', 'Laser Sight'],
            version: 'MP5A3'
          },
          {
            id: 3,
            name: 'Barrett .50cal',
            type: 'Sniper Rifle',
            damage: 95,
            fireRate: 20,
            accuracy: 90,
            range: 95,
            mobility: 30,
            imageUrl: 'https://example.com/barrett.jpg',
            ammo: {
              magazine: 10,
              reserve: 40
            },
            unlockedAt: 45,
            rarity: 'Epic',
            cost: 5000,
            weight: 14.0,
            specialAbility: 'One-shot kill to upper body',
            camo: 'https://example.com/camos/digital.jpg'
          }
        ];

        setWeapons(mockWeapons);
      } catch (error) {
        console.error('Error fetching weapons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeapons();
  }, []);

  const handleSelectWeapon = (weapon: Weapon) => {
    setSelectedWeapons(prev => {
      if (prev.some(w => w.id === weapon.id)) {
        return prev.filter(w => w.id !== weapon.id);
      } else if (prev.length < 2) {
        return [...prev, weapon];
      }
      return prev;
    });
  };

  const filteredWeapons = weapons.filter(weapon => {
    return (
      (filters.type === '' || weapon.type === filters.type) &&
      (weapon.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      weapon.unlockedAt >= filters.minLevel
    );
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'damage': return b.damage - a.damage;
      case 'fireRate': return b.fireRate - a.fireRate;
      case 'unlockedAt': return a.unlockedAt - b.unlockedAt;
      default: return 0;
    }
  });

  const weaponTypes = Array.from(new Set(weapons.map(w => w.type)));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Modern Warfare Armory</h1>
        <p className="app-subtitle">
          Compare and analyze weapon statistics for tactical advantage
        </p>
      </header>

      <WeaponFilter
        types={weaponTypes}
        filters={filters}
        onFilterChange={setFilters}
        selectedCount={selectedWeapons.length}
      />

      {selectedWeapons.length > 0 && (
        <WeaponComparison 
          weapons={selectedWeapons}
          onClear={() => setSelectedWeapons([])}
        />
      )}

      <div className="weapons-grid">
        {filteredWeapons.length > 0 ? (
          filteredWeapons.map(weapon => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              onSelect={handleSelectWeapon}
              isSelected={selectedWeapons.some(w => w.id === weapon.id)}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No weapons match your criteria</h3>
            <button 
              onClick={() => setFilters({
                type: '',
                search: '',
                minLevel: 0,
                sortBy: 'name'
              })}
              className="reset-filters"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Data updated: {new Date().toLocaleDateString()}</p>
        <p>Total weapons: {weapons.length}</p>
      </footer>
    </div>
  );
};

export default App;
