import React, { useState, useEffect, useMemo } from 'react';
import { Weapon, WeaponType, WeaponRarity, WeaponFilterOptions, WeaponSortOption } from './models/Weapon';
import WeaponCard from './components/WeaponCard';
import WeaponFilter from './components/WeaponFilter';
import WeaponComparison from './components/WeaponComparison';
import Loader from './components/Loader';
import WeaponDetailsModal from './components/WeaponDetailsModal';
import FavoritesManager from './components/FavoritesManager';
import './styles.css';

const App: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWeapons, setSelectedWeapons] = useState<Weapon[]>([]);
  const [detailedWeapon, setDetailedWeapon] = useState<Weapon | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filters, setFilters] = useState<WeaponFilterOptions>({
    search: '',
    type: [],
    rarity: [],
    minLevel: 0,
    maxLevel: 100,
    fireModes: [],
    sortBy: 'name',
    sortDirection: 'asc',
    hasSilencer: false,
    minDamage: 0,
    maxDamage: 100
  });

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weaponFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('weaponFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Mock API fetch with more comprehensive data
  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockWeapons: Weapon[] = [
          {
            id: 1,
            name: 'M4A1',
            type: 'Assault Rifle',
            stats: {
              damage: 70,
              fireRate: 800,
              accuracy: 75,
              range: 65,
              mobility: 60,
              control: 70,
              wallPenetration: 'medium',
              hipFireAccuracy: 40,
              adsSpeed: 65,
              movementSpeed: 95,
              headshotMultiplier: 1.5,
              limbMultiplier: 0.9
            },
            imageUrl: 'https://example.com/m4a1.jpg',
            ammo: {
              magazine: 30,
              reserve: 120,
              reloadTime: 2.5,
              reloadType: 'magazine',
              ammoType: '5.56 NATO',
              pickupAmount: 30
            },
            unlockedAt: 1,
            attachments: [
              {
                id: 101,
                name: 'Red Dot Sight',
                type: 'optic',
                bonuses: { accuracy: 10, adsSpeed: 5 },
                unlockedAt: 1,
              },
              {
                id: 102,
                name: 'Suppressor',
                type: 'muzzle',
                bonuses: { recoilControl: 5, silencer: true },
                penalties: { damage: -5, range: -10 },
                unlockedAt: 5,
              }
            ],
            meta: {
              manufacturer: 'Colt',
              countryOfOrigin: 'USA',
              yearIntroduced: 1994,
              caliber: '5.56×45mm NATO',
              weight: 3.4,
              length: 840,
              barrelLength: 370
            },
            rarity: 'Rare',
            cost: 2500,
            isNew: true,
            isMeta: true,
            fireModes: ['single', 'auto'],
            timeToADS: 0.25,
            sprintToFireTime: 0.18,
            movementSpeedModifier: 0.95,
            soundProfile: 'm4a1_shot',
            muzzleFlashSize: 'medium',
            seasonIntroduced: 'Season 1',
            skins: [
              {
                id: 1001,
                name: 'Urban Digital',
                rarity: 'Uncommon',
                imageUrl: 'https://example.com/skins/m4a1_urban.jpg'
              }
            ]
          },
          {
            id: 2,
            name: 'MP5',
            type: 'SMG',
            stats: {
              damage: 50,
              fireRate: 900,
              accuracy: 65,
              range: 45,
              mobility: 85,
              control: 75,
              wallPenetration: 'low',
              hipFireAccuracy: 65,
              adsSpeed: 80,
              movementSpeed: 100,
              headshotMultiplier: 1.4,
              limbMultiplier: 0.85
            },
            imageUrl: 'https://example.com/mp5.jpg',
            ammo: {
              magazine: 30,
              reserve: 120,
              reloadTime: 2.0,
              reloadType: 'magazine',
              ammoType: '9mm Parabellum',
              pickupAmount: 30
            },
            unlockedAt: 12,
            attachments: [
              {
                id: 201,
                name: 'Holographic Sight',
                type: 'optic',
                bonuses: { accuracy: 15, adsSpeed: -3 },
                unlockedAt: 12,
              }
            ],
            meta: {
              manufacturer: 'Heckler & Koch',
              countryOfOrigin: 'Germany',
              yearIntroduced: 1966,
              caliber: '9×19mm Parabellum',
              weight: 2.9,
              length: 680,
              barrelLength: 225
            },
            rarity: 'Uncommon',
            cost: 1800,
            isPopular: true,
            fireModes: ['single', 'auto'],
            timeToADS: 0.20,
            sprintToFireTime: 0.15,
            movementSpeedModifier: 1.0,
            soundProfile: 'mp5_shot',
            muzzleFlashSize: 'small',
            seasonIntroduced: 'Season 1',
            skins: [
              {
                id: 2001,
                name: 'Classic Black',
                rarity: 'Common',
                imageUrl: 'https://example.com/skins/mp5_classic.jpg'
              }
            ]
          },
          {
            id: 3,
            name: 'Barrett .50cal',
            type: 'Sniper Rifle',
            stats: {
              damage: 95,
              fireRate: 50,
              accuracy: 90,
              range: 95,
              mobility: 30,
              control: 60,
              wallPenetration: 'high',
              hipFireAccuracy: 10,
              adsSpeed: 40,
              movementSpeed: 70,
              headshotMultiplier: 2.0,
              limbMultiplier: 1.2,
              bulletVelocity: 1200
            },
            imageUrl: 'https://example.com/barrett.jpg',
            ammo: {
              magazine: 10,
              reserve: 40,
              reloadTime: 4.5,
              reloadType: 'individual',
              ammoType: '.50 BMG',
              pickupAmount: 5
            },
            unlockedAt: 45,
            meta: {
              manufacturer: 'Barrett Firearms',
              countryOfOrigin: 'USA',
              yearIntroduced: 1982,
              caliber: '.50 BMG',
              weight: 14.0,
              length: 1448,
              barrelLength: 737
            },
            rarity: 'Epic',
            cost: 5000,
            fireModes: ['bolt-action'],
            timeToADS: 0.45,
            sprintToFireTime: 0.35,
            movementSpeedModifier: 0.7,
            soundProfile: 'barrett_shot',
            muzzleFlashSize: 'large',
            seasonIntroduced: 'Season 2',
            specialTraits: ['One-shot kill to upper body'],
            skins: [
              {
                id: 3001,
                name: 'Desert Camo',
                rarity: 'Rare',
                imageUrl: 'https://example.com/skins/barrett_desert.jpg'
              }
            ]
          }
        ];

        setWeapons(mockWeapons);
      } catch (error) {
        console.error('Error fetching weapons:', error);
        setError('Failed to load weapons data. Please try again later.');
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

  const handleFavorite = (weaponId: number) => {
    setFavorites(prev => 
      prev.includes(weaponId) 
        ? prev.filter(id => id !== weaponId) 
        : [...prev, weaponId]
    );
  };

  const filteredWeapons = useMemo(() => {
    return weapons.filter(weapon => {
      const matchesSearch = weapon.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type.length === 0 || filters.type.includes(weapon.type);
      const matchesRarity = filters.rarity.length === 0 || filters.rarity.includes(weapon.rarity);
      const matchesLevel = weapon.unlockedAt >= (filters.minLevel || 0) && 
                         weapon.unlockedAt <= (filters.maxLevel || 100);
      const matchesFireModes = filters.fireModes.length === 0 || 
                             filters.fireModes.some(mode => weapon.fireModes.includes(mode));
      const matchesDamage = weapon.stats.damage >= (filters.minDamage || 0) && 
                          weapon.stats.damage <= (filters.maxDamage || 100);
      const matchesSilencer = !filters.hasSilencer || 
                            weapon.attachments.some(a => a.bonuses.silencer);

      return (
        matchesSearch &&
        matchesType &&
        matchesRarity &&
        matchesLevel &&
        matchesFireModes &&
        matchesDamage &&
        matchesSilencer
      );
    }).sort((a, b) => {
      const direction = filters.sortDirection === 'asc' ? 1 : -1;
      
      switch (filters.sortBy) {
        case 'name': 
          return direction * a.name.localeCompare(b.name);
        case 'damage': 
          return direction * (b.stats.damage - a.stats.damage);
        case 'fireRate': 
          return direction * (b.stats.fireRate - a.stats.fireRate);
        case 'accuracy': 
          return direction * (b.stats.accuracy - a.stats.accuracy);
        case 'range': 
          return direction * (b.stats.range - a.stats.range);
        case 'mobility': 
          return direction * (b.stats.mobility - a.stats.mobility);
        case 'unlockedAt': 
          return direction * (a.unlockedAt - b.unlockedAt);
        case 'cost': 
          return direction * (a.cost - b.cost);
        case 'rarity': 
          const rarityOrder: WeaponRarity[] = ['Exotic', 'Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];
          return direction * (rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
        default: 
          return 0;
      }
    });
  }, [weapons, filters]);

  const weaponTypes = useMemo(() => 
    Array.from(new Set(weapons.map(w => w.type)) as WeaponType[], 
    [weapons]
  );

  const weaponRarities = useMemo(() => 
    Array.from(new Set(weapons.map(w => w.rarity)) as WeaponRarity[], 
    [weapons]
  );

  const resetFilters = () => {
    setFilters({
      search: '',
      type: [],
      rarity: [],
      minLevel: 0,
      maxLevel: 100,
      fireModes: [],
      sortBy: 'name',
      sortDirection: 'asc',
      hasSilencer: false,
      minDamage: 0,
      maxDamage: 100
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Modern Warfare Armory</h1>
        <p className="app-subtitle">
          Compare and analyze weapon statistics for tactical advantage
        </p>
      </header>

      <div className="app-controls">
        <WeaponFilter
          types={weaponTypes}
          rarities={weaponRarities}
          filters={filters}
          onFilterChange={setFilters}
          onReset={resetFilters}
          selectedCount={selectedWeapons.length}
        />

        <FavoritesManager 
          weapons={weapons}
          favorites={favorites}
          onSelect={setDetailedWeapon}
          onFavorite={handleFavorite}
        />
      </div>

      {selectedWeapons.length > 0 && (
        <WeaponComparison 
          weapons={selectedWeapons}
          onClear={() => setSelectedWeapons([])}
          onWeaponSelect={setDetailedWeapon}
        />
      )}

      <div className="weapons-grid">
        {filteredWeapons.length > 0 ? (
          filteredWeapons.map(weapon => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              onSelect={handleSelectWeapon}
              onFavorite={handleFavorite}
              onDetails={setDetailedWeapon}
              isSelected={selectedWeapons.some(w => w.id === weapon.id)}
              isFavorite={favorites.includes(weapon.id)}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No weapons match your criteria</h3>
            <button 
              onClick={resetFilters}
              className="reset-filters"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {detailedWeapon && (
        <WeaponDetailsModal
          weapon={detailedWeapon}
          onClose={() => setDetailedWeapon(null)}
          onFavorite={handleFavorite}
          isFavorite={favorites.includes(detailedWeapon.id)}
        />
      )}

      <footer className="app-footer">
        <div className="footer-stats">
          <p>Data updated: {new Date().toLocaleDateString()}</p>
          <p>Total weapons: {weapons.length}</p>
          <p>Filtered weapons: {filteredWeapons.length}</p>
        </div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Feedback</a>
          <a href="#">API</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
