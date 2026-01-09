import type { Astronaut } from "../../components/astronauts/AstronautCard";

export interface PeopleInSpaceResponse {
  number: number;
  iss_expedition: number;
  expedition_patch: string;
  expedition_url: string;
  expedition_image: string;
  expedition_start_date: number;
  people: Astronaut[];
}

let cachedData: PeopleInSpaceResponse | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getPeopleInSpace(): Promise<PeopleInSpaceResponse> {
  const now = Date.now();
  
  if (cachedData && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedData;
  }

  try {
    const response = await fetch("https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data: PeopleInSpaceResponse = await response.json();
    cachedData = data;
    lastFetchTime = now;
    return data;
  } catch (error) {
    console.error("Error fetching people in space data:", error);
    throw error;
  }
}
