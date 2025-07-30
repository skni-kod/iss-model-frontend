import { useEffect, useState } from "react";
import AstronautCard from "../components/astronauts/AstronautCard";

export interface Astronaut {
  name: string;
  country: string;
  position: string;
  spacecraft: string;
  on_iss: boolean;
  days_in_space: number;
  image: string;
}


function Astronauts() {
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);

  useEffect(() => {
    fetch("https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json")
      .then((res) => res.json())
      .then((data) => {
        const allAstronauts: Astronaut[] = data.people;
        setAstronauts(allAstronauts);
      })
      .catch((err) => console.error("Error fetching astronaut data:", err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Astronauci obecnie stacjonujący na ISS
      </h1>
      <div className="@container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {astronauts.map((astro, index) => (
          <AstronautCard key={index} astronaut={astro} />
        ))}
      </div>
    </div>
  );
}

export default Astronauts;
