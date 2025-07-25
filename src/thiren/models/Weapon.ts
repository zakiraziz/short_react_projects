export interface Ammo {
  magazine: number;
  reserve: number;
  total?: number;
  reloadTime: number; // in seconds
  reloadType: 'manual' | 'magazine' | 'individual';
  ammoType: string; // e.g., "5.56 NATO", "9mm", "12 Gauge"
  pickupAmount?: number; // ammo picked up from ground
  maxReserve?: number;
}

export interface Attachment {
  id: number;
  name: string;
  type: 'optic' | 'muzzle' | 'barrel' | 'underbarrel' | 'magazine' | 'stock' | 'perk' | 'laser' | 'ammunition' | 'rearGrip' | 'comb';
  bonuses: {
    damage?: number;
    accuracy?: number;
    range?: number;
    mobility?: number;
    fireRate?: number;
    recoilControl?: number;
    adsSpeed?: number;
    movementSpeed?: number;
    hipFireAccuracy?: number;
    sprintToFireSpeed?: number;
    bulletVelocity?: number;
    ammoCapacity?: number;
    silencer?: boolean;
  };
  penalties?: {
    damage?: number;
    accuracy?: number;
    range?: number;
    mobility?: number;
    fireRate?: number;
    recoilControl?: number;
    adsSpeed?: number;
  };
  unlockedAt: number;
  imageUrl?: string;
  compatibility?: number[]; // weapon IDs this attachment works with
  tier?: number; // attachment tier/rarity
  slotCost?: number; // for systems with attachment point budgets
}

export interface WeaponStats {
  damage: number; // 0-100
  fireRate: number; // rounds per minute (RPM)
  accuracy: number; // 0-100
  range: number; // 0-100
  mobility: number; // 0-100
  control: number; // recoil control 0-100
  wallPenetration: 'none' | 'low' | 'medium' | 'high';
  hipFireAccuracy: number; // 0-100
  adsSpeed: number; // 0-100 (higher is faster)
  movementSpeed: number; // percentage of base movement speed
  bulletVelocity?: number; // for projectile weapons
  damageDropoff?: {
    start: number; // meters
    end: number; // meters
    multiplier: number; // 0-1
  }[];
  headshotMultiplier?: number;
  limbMultiplier?: number;
}

export interface WeaponMeta {
  manufacturer: string;
  countryOfOrigin: string;
  yearIntroduced: number;
  caliber: string;
  realWorldImageUrl?: string;
  realWorldModel?: string;
  weight?: number; // kg
  length?: number; // mm
  barrelLength?: number; // mm
  operation?: string; // e.g., "Gas-operated, rotating bolt"
  variants?: string[]; // other variants of this weapon
}

export type WeaponRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Exotic' | 'Mythic';
export type WeaponType = 'Assault Rifle' | 'SMG' | 'Sniper Rifle' | 'Shotgun' | 'LMG' | 'Pistol' | 'Launcher' | 'Melee' | 'Marksman Rifle' | 'Tactical' | 'Handgun' | 'Machine Pistol' | 'Revolver';

export interface WeaponSkin {
  id: number;
  name: string;
  rarity: WeaponRarity;
  imageUrl: string;
  unlockRequirements?: string;
  blueprintId?: number;
  animated?: boolean;
  inspectAnimation?: boolean;
  wearLevels?: 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred';
}

export interface WeaponMastery {
  level: number;
  xpRequired: number;
  rewards: {
    xp?: number;
    currency?: number;
    skin?: WeaponSkin;
    attachment?: Attachment;
    callingCard?: string;
  };
}

export interface WeaponChallenge {
  name: string;
  description: string;
  target: number;
  reward: {
    xp?: number;
    skin?: WeaponSkin;
    callingCard?: string;
  };
}

export interface Weapon {
  id: number;
  name: string;
  type: WeaponType;
  stats: WeaponStats;
  imageUrl: string;
  blueprintImageUrl?: string;
  camoImageUrl?: string;
  inspectImageUrl?: string;
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
  hiddenUntilUnlocked?: boolean;
  
  // Economic properties
  cost: number;
  salvageCost?: number;
  xpToMastery: number;
  masteryLevels?: WeaponMastery[];
  challenges?: WeaponChallenge[];
  
  // Technical properties
  fireModes: ('single' | 'burst' | 'auto' | 'bolt-action' | 'pump-action')[];
  timeToADS: number;
  sprintToFireTime: number;
  movementSpeedModifier: number;
  tacticalSprintTime?: number;
  slideSpeedModifier?: number;
  weaponSwapSpeed?: number;
  hasFastMelee?: boolean;
  canAimWhileSliding?: boolean;
  
  // Audio/Visual
  soundProfile?: string;
  muzzleFlashSize?: 'small' | 'medium' | 'large';
  tracers?: boolean;
  tracerColor?: string;
  customKillSound?: boolean;
  deathEffect?: string;
  
  // Versioning
  version?: string;
  seasonIntroduced?: string;
  lastModified?: Date;
  
  // Skins/Customization
  skins?: WeaponSkin[];
  charmSlots?: number;
  stickerSlots?: number;
  
  // Balance history
  patchNotes?: {
    version: string;
    date: Date;
    changes: string[];
    buffs?: string[];
    nerfs?: string[];
  }[];
  
  // Multiplayer stats
  averageKillsPerGame?: number;
  pickRate?: number;
  winRate?: number;
}

// Additional utility types
export interface WeaponComparison {
  weapons: Weapon[];
  differences: {
    stat: keyof WeaponStats;
    values: number[];
    difference: number;
  }[];
  bestFor: {
    closeRange?: number;
    longRange?: number;
    mobility?: number;
    recoilControl?: number;
  };
}

export type WeaponSortOption = 'name' | 'damage' | 'fireRate' | 'accuracy' | 'range' | 'mobility' | 'unlockedAt' | 'cost' | 'rarity' | 'pickRate' | 'winRate';

export interface WeaponFilterOptions {
  search?: string;
  type?: WeaponType[];
  rarity?: WeaponRarity[];
  minLevel?: number;
  maxLevel?: number;
  fireModes?: ('single' | 'burst' | 'auto' | 'bolt-action' | 'pump-action')[];
  sortBy?: WeaponSortOption;
  sortDirection?: 'asc' | 'desc';
  hasSilencer?: boolean;
  hasTracers?: boolean;
  minDamage?: number;
  maxDamage?: number;
  manufacturer?: string[];
}

export interface WeaponLoadout {
  weapon: Weapon;
  attachments: {
    optic?: Attachment;
    muzzle?: Attachment;
    barrel?: Attachment;
    underbarrel?: Attachment;
    magazine?: Attachment;
    stock?: Attachment;
    perk?: Attachment;
    laser?: Attachment;
    ammunition?: Attachment;
  };
  skin?: WeaponSkin;
  charms?: {
    slot1?: string;
    slot2?: string;
  };
  stickers?: string[];
  stats?: {
    damage: number;
    accuracy: number;
    range: number;
    mobility: number;
    control: number;
    fireRate: number;
  };
}

export interface WeaponClass {
  name: string;
  weapons: Weapon[];
  perks?: string[];
  defaultLoadouts?: WeaponLoadout[];
  recommendedAttachments?: Attachment[];
}
