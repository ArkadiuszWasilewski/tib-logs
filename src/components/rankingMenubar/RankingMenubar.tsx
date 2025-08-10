
"use client";
import { FilterState, HorizontalFiltersProps } from "./types";
import { gear, vocations, sizes, sortOptions, levelRangeConfig } from "./constants/filterOptions";
import { SpawnLocation } from "@/types";
import spawnLocations from "@/constants/spawnLocations";
import { Slider } from "@/components/RankingMenubar/components/Slider";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RankingMenubar({
  className,
  onFilterChange,
}: HorizontalFiltersProps) {
  // Initialize filters from localStorage or use default values
  const getInitialFilters = (): FilterState => {
    if (typeof window !== "undefined") {
      const savedFilters = localStorage.getItem("rankingFilters");
      if (savedFilters) {
        try {
          const parsed = JSON.parse(savedFilters);
          // Validate parsed data to ensure it matches FilterState structure
          return {
            gear: Array.isArray(parsed.gear) ? parsed.gear : [],
            levelRange:
              Array.isArray(parsed.levelRange) &&
              parsed.levelRange.length === 2 &&
              typeof parsed.levelRange[0] === "number" &&
              typeof parsed.levelRange[1] === "number"
                ? [parsed.levelRange[0], parsed.levelRange[1]]
                : [levelRangeConfig.min, levelRangeConfig.max],
            spawnLocations: Array.isArray(parsed.spawnLocations) ? parsed.spawnLocations : [],
            vocations: Array.isArray(parsed.vocations) ? parsed.vocations : [],
            sizes: Array.isArray(parsed.sizes) ? parsed.sizes : [],
            sortBy: typeof parsed.sortBy === "string" ? parsed.sortBy : "mostDamage",
          };
        } catch (e) {
          console.error("Error parsing localStorage filters:", e);
        }
      }
    }
    return {
      gear: [],
      levelRange: [levelRangeConfig.min, levelRangeConfig.max],
      spawnLocations: [],
      vocations: [],
      sizes: [],
      sortBy: "mostDamage",
    };
  };

  const [filters, setFilters] = useState<FilterState>(getInitialFilters);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rankingFilters", JSON.stringify(filters));
    }
  }, [filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const toggleFilter = (type: keyof FilterState, value: string) => {
    if (type === "sortBy") {
      updateFilters({ [type]: value } as Partial<FilterState>);
      return;
    }

    const currentValues = filters[type] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    updateFilters({ [type]: newValues } as Partial<FilterState>);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      gear: [],
      levelRange: [levelRangeConfig.min, levelRangeConfig.max],
      spawnLocations: [],
      vocations: [],
      sizes: [],
      sortBy: "mostDamage",
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const ActiveFilterBadges = () => {
    const activeFilters = [
      ...filters.gear.map((cat) => ({ type: "gear", value: cat })),
      ...filters.spawnLocations.map((spawnLocation) => ({ type: "spawnLocations", value: spawnLocation })),
      ...filters.vocations.map((color) => ({ type: "vocations", value: color })),
      ...filters.sizes.map((size) => ({ type: "sizes", value: size })),
      ...(filters.levelRange[0] > levelRangeConfig.min || filters.levelRange[1] < levelRangeConfig.max
        ? [
            {
              type: "levelRange",
              value: `lvl ${filters.levelRange[0]} - ${filters.levelRange[1]}`,
            },
          ]
        : []),
    ];

    if (activeFilters.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {activeFilters.map((filter, index) => (
          <Badge
            key={`${filter.type}-${filter.value}-${index}`}
            variant="outline"
            className="flex items-center gap-1 px-2 py-1"
          >
            {filter.value}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1"
              onClick={() =>
                toggleFilter(filter.type as keyof FilterState, filter.value)
              }
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        )}
      </div>
    );
  };
  return (
    <div className={cn("w-full p-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Spawn Location Filter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter spawn location"
              list="spawnOptions"
              onChange={(e) => {
                const value = e.target.value;
                if (spawnLocations.some((spawn) => spawn.spawnLocation === value)) {
                  toggleFilter("spawnLocations", value);
                }
              }}
            />
            <datalist id="spawnOptions">
              {spawnLocations.map((spawn: SpawnLocation) => (
                <option key={spawn.spawnLocation} value={spawn.spawnLocation} />
              ))}
            </datalist>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Spawn Location
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3">
                <div className="space-y-2">
                  {spawnLocations.map((spawn: SpawnLocation) => (
                    <div key={spawn.spawnLocation} className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "justify-start w-full font-normal",
                          filters.spawnLocations.includes(spawn.spawnLocation) && "font-medium"
                        )}
                        onClick={() => toggleFilter("spawnLocations", spawn.spawnLocation)}
                      >
                        <div className="flex items-center justify-between w-full">
                          {spawn.spawnLocation}
                          {filters.spawnLocations.includes(spawn.spawnLocation) && (
                            <Check className="h-4 w-4" />
                          )}
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Level Range Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Level range
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Level range</h4>
                <Slider
                  value={filters.levelRange}
                  min={levelRangeConfig.min}
                  max={levelRangeConfig.max}
                  step={levelRangeConfig.step}
                  onValueChange={(value) =>
                    updateFilters({ levelRange: value as [number, number] })
                  }
                  showEndCircle
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {filters.levelRange[0]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {filters.levelRange[1]}{"+"}
                  </span>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Party Size Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Size
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={
                      filters.sizes.includes(size) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => toggleFilter("sizes", size)}
                    className="h-8"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Vocation Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Vocation
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="grid grid-cols-4 gap-2">
                {vocations.map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col items-center gap-1"
                  >
                    <button
                      className={cn(
                        "h-8 w-8 rounded-full border border-input flex items-center justify-center",
                        filters.vocations.includes(color.name) &&
                          "ring-2 ring-primary"
                      )}
                      style={{ backgroundColor: color.value }}
                      onClick={() => toggleFilter("vocations", color.name)}
                    >
                      {filters.vocations.includes(color.name) && (
                        <Check
                          className={cn(
                            "h-4 w-4",
                            ["White", "Yellow"].includes(color.name)
                              ? "text-black"
                              : "text-white"
                          )}
                        />
                      )}
                    </button>
                    <span className="text-xs">{color.name}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Gear Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Gear
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-2">
                {gear.map((category) => (
                  <div key={category} className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "justify-start w-full font-normal",
                        filters.gear.includes(category) && "font-medium"
                      )}
                      onClick={() => toggleFilter("gear", category)}
                    >
                      <div className="flex items-center justify-between w-full">
                        {category}
                        {filters.gear.includes(category) && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                    </Button>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Sort by:
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                {sortOptions.find((opt) => opt.value === filters.sortBy)?.label ||
                  "Featured"}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  className={cn(
                    filters.sortBy === option.value && "font-medium"
                  )}
                  onClick={() => toggleFilter("sortBy", option.value)}
                >
                  {option.label}
                  {filters.sortBy === option.value && (
                    <Check className="ml-2 h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filter Badges */}
      <ActiveFilterBadges />
    </div>
  );
}