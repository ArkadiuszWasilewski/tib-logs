import { User } from "firebase/auth";

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
  teamSize: string;
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

export type TeamSize = string;

// Define the shape of the saved report data
export interface ReportData {
  user: string;
  sessionData: {
    Balance: number;
    Damage: number;
    "Damage/h": number;
    Healing: number;
    "Healing/h": number;
    "Killed Monsters": Array<{ Name: string; Count: number }>;
    "Looted Items": Array<{ Name: string; Count: number }>;
    "Raw XP Gain": number;
    "Raw XP/h": number;
    "Session end": number;
    "Session length": string;
    "Session start": number;
    Supplies: number;
    "XP Gain": number;
    "XP/h": number;
  };
  reportDescription: string;
  characterVocation: string;
  characterLevel: number;
  characterGear: string;
  currentSpawn: string;
  teamSize: string;
  createdAt: Date;
}
