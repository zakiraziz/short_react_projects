export interface Weapon {
  id: number;
  name: string;
  type: 'Assault Rifle' | 'SMG' | 'Sniper' | 'Shotgun' | 'LMG' | 'Pistol' | 'Launcher' | 'Melee';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  damage: number;
  fireRate: number;
  accuracy: number;
  range: number;
  mobility: number;
  control: number; // Recoil control
  imageUrl: string;
  ammo: {
    magazine: number;
    reserve: number;
    type: 'Light' | 'Heavy' | 'Energy' | 'Shotgun' | 'Sniper' | 'Rocket';
  };
  unlockedAt: number;
  cost: {
    credits: number;
    premiumCurrency?: number;
  };
  attachments: {
    slots: {
      optic: boolean;
      muzzle: boolean;
      barrel: boolean;
      underbarrel: boolean;
      ammunition: boolean;
    };
    equipped: string[]; // Array of attachment IDs
  };
  stats: {
    headshotMultiplier: number;
    reloadTime: number;
    swapTime: number;
    bulletVelocity?: number; // For ranged weapons
    meleeRange?: number; // For melee weapons
    explosionRadius?: number; // For launchers
  };
  perks: string[]; // Special abilities or traits
  skins: {
    id: string;
    name: string;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
    imageUrl: string;
    unlocked: boolean;
  }[];
  mastery: {
    level: number;
    xp: number;
    xpRequired: number;
    challenges: {
      name: string;
      description: string;
      progress: number;
      target: number;
      completed: boolean;
    }[];
  };
}

// Additional related interfaces
export interface WeaponAttachment {
  id: string;
  name: string;
  type: 'optic' | 'muzzle' | 'barrel' | 'underbarrel' | 'ammunition' | 'laser' | 'grip';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  stats: {
    accuracy?: number;
    range?: number;
    damage?: number;
    control?: number;
    mobility?: number;
    fireRate?: number;
    magazine?: number;
  };
  imageUrl: string;
  compatibleWeapons: number[]; // Array of weapon IDs
}

export interface WeaponSkin {
  id: string;
  weaponId: number;
  name: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  imageUrl: string;
  animationUrl?: string; // For animated skins
  unlockRequirements: {
    type: 'level' | 'challenge' | 'purchase' | 'battlePass';
    description: string;
    target?: number;
  };
}

// Utility types for weapon filtering and sorting
export type WeaponType = Weapon['type'];
export type RarityType = Weapon['rarity'];
export type AmmoType = Weapon['ammo']['type'];

export interface WeaponFilter {
  type?: WeaponType;
  rarity?: RarityType;
  unlocked?: boolean;
  searchTerm?: string;
  minDamage?: number;
  maxDamage?: number;
}

// Example usage type
export interface Loadout {
  id: string;
  name: string;
  primaryWeapon: Weapon;
  secondaryWeapon: Weapon;
  perks: string[];
  equipment: string[];
}
