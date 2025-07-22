export interface Weapon {
  id: number;
  name: string;
  type: 'Assault Rifle' | 'SMG' | 'Sniper' | 'Shotgun' | 'LMG' | 'Pistol' | 'Launcher' | 'Melee';
  damage: number;
  fireRate: number;
  accuracy: number;
  range: number;
  mobility: number;
  imageUrl: string;
  ammo: {
    magazine: number;
    reserve: number;
  };
  unlockedAt: number;
}