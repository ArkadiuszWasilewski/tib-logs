import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Convert minutes to <HH>h <MM>m format
// Example: 90 minutes -> "1h 30m"
export const formatTimeSession = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

//Convert date 
//When less than 7 days then show "2 days ago, 2 hours ago etc"
export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 7) {
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }
  } else {
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  }
};

export function getFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return {
    vocation: params.get("vocation") || "",
    world: params.get("world") || "",
  };
}

export function saveFiltersToUrl(filters: Record<string, string>) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newUrl);
}

export function getFiltersFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("rankingFilters") || "{}");
  } catch {
    return {};
  }
}

export function saveFiltersToLocalStorage(filters: Record<string, string>) {
  localStorage.setItem("rankingFilters", JSON.stringify(filters));
}