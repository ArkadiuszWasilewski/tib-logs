export interface FilterState {
  gear: string[];
  levelRange: [number, number];
  spawnLocations: string[];
  vocations: string[];
  sizes: string[];
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
