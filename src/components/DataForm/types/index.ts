// Define the shape of the Alert component props
export interface AlertProps {
  children: string;
}

// Define the shape of the form state
export interface FormState {
  dataSource: "text" | "file";
  selectedFile: File | null; // Fixed: Allow File or null
  reportDescription: string;
  characterVocation: string;
  characterLevel: string;
  characterGear: string;
  currentSpawn: string;
  tempTextInput: string;
}

// Define types for external constants (assuming they are string arrays)
export interface SpawnLocation {
  spawnLocation: string;
  recommendedLevel: string;
  expectedRawXp: string;
  expectedLoot: string;
  linkToVideo: string;
}
export type Vocation = string;

// Define the shape of the saved report data
export interface ReportData {
  sessionData?: {
    Balance: string;
    Damage: string;
    'Killed Monsters'?: Array<{ name: string; count: number }>;
    Loot?: string;
    'Looted Items'?: Array<{ name: string; quantity: number }>;
    'Raw XP Gain'?: string;
    'Raw XP/h'?: string;
    'Session end'?: string;
    'Session length'?: string;
    'Session start'?: string;
    Supplies?: string;
    'XP Gain'?: string;
    'XP/h'?: string;
  }
  reportDescription: string;
  characterVocation: string;
  characterLevel: number;
  characterGear: string;
  currentSpawn: string;
}
