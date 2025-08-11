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
  sessionData: unknown; // Use 'unknown' for JSON data, as its shape is not specified
  reportDescription: string;
  characterVocation: string;
  characterLevel: number;
  characterGear: string;
  currentSpawn: string;
}