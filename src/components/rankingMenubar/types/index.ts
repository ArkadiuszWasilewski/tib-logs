export interface FilterState {
  gear: string[];
  levelRange: [number, number];
  currentSpawn: string[];
  characterVocation: string[];
  teamSize: string[];
  sortBy: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface ColorOption {
  name: string;
  value: string;
}

export interface HorizontalFiltersProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
}
