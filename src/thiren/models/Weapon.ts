export interface Ammo {
  magazine: number;
  reserve: number;
  total?: number;
  reloadTime: number; // in seconds
  reloadType: 'manual' | 'magazine' | 'individual';
}

export interface Attachment {
  id: number;
  name: string;
  type: 'optic' | 'muzzle' | 'barrel' | 'underbarrel' | 'magazine' | 'stock' | 'perk';
  bonuses: {
    damage?: number;
    accuracy?: number;
    range?: number;
    mobility?: number;
    fireRate?: number;
    recoilControl?: number;
  };
  unlockedAt: number;
  imageUrl?: string;
}

export interface WeaponStats {
  damage: number; // 0-100
  fireRate: number; // rounds per minute (RPM)
  accuracy: number; // 0-100
  range: number; // 0-100
  mobility: number; // 0-100
  control: number; // recoil control 0-100
  wallPenetration: 'low' | 'medium' | 'high';
}

export interface WeaponMeta {
  manufacturer: string;
  countryOfOrigin: string;
  yearIntroduced: number;
  caliber: string;
  realWorldImageUrl?: string;
}

export type WeaponRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Exotic';
export type WeaponType = 'Assault Rifle' | 'SMG' | 'Sniper Rifle' | 'Shotgun' | 'LMG' | 'Pistol' | 'Launcher' | 'Melee' | 'Marksman Rifle' | 'Tactical';

export interface Weapon {
  id: number;
  name: string;
  type: WeaponType;
  stats: WeaponStats;
  imageUrl: string;
  blueprintImageUrl?: string; // For weapon skins/blueprints
  camoImageUrl?: string;
  ammo: Ammo;
  unlockedAt: number;
  requiredLevel?: number;
  attachments: Attachment[];
  meta: WeaponMeta;
  
  // Gameplay properties
  rarity: WeaponRarity;
  isNew?: boolean;
  isPopular?: boolean;
  isMeta?: boolean;
  specialTraits?: string[];
  defaultCamos?: string[];
  challengeUnlock?: string;
  
  // Economic properties
  cost: number;
  salvageCost?: number; // For crafting systems
  xpToMastery: number;
  
  // Technical properties
  fireModes: ('single' | 'burst' | 'auto')[];
  timeToADS: number; // in seconds
  sprintToFireTime: number; // in seconds
  movementSpeedModifier: number; // percentage (0.9 = 90% of normal speed)
  
  // Audio/Visual
  soundProfile?: string;
  muzzleFlashSize?: 'small' | 'medium' | 'large';
  
  // Versioning
  version?: string;
  seasonIntroduced?: string;
  lastModified?: Date;
  
  // Balance history
  patchNotes?: {
    version: string;
    date: Date;
    changes: string[];
  }[];
}

// Additional utility types
export interface WeaponComparison {
  weapons: Weapon[];
  differences: {
    stat: keyof WeaponStats;
    values: number[];
    difference: number;
  }[];
}

export type WeaponSortOption = 'name' | 'damage' | 'fireRate' | 'accuracy' | 'range' | 'mobility' | 'unlockedAt' | 'cost' | 'rarity';

export interface WeaponFilterOptions {
  search?: string;
  type?: WeaponType[];
  rarity?: WeaponRarity[];
  minLevel?: number;
  maxLevel?: number;
  fireModes?: ('single' | 'burst' | 'auto')[];
  sortBy?: WeaponSortOption;
  sortDirection?: 'asc' | 'desc';
}
