import { useEffect, useState } from "react";
import AstronautCard, { type Astronaut } from "../components/astronauts/AstronautCard";
import { Badge } from "../components/ui/badge";
import { CalendarIcon, RocketIcon } from "lucide-react";
import { getPeopleInSpace, type PeopleInSpaceResponse } from "../lib/api/astronauts";

interface GroupedAstronauts {
  [key: string]: Astronaut[];
}

function Astronauts() {
  const [data, setData] = useState<PeopleInSpaceResponse | null>(null);
  const [groupedAstronauts, setGroupedAstronauts] = useState<GroupedAstronauts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeopleInSpace()
      .then((apiData) => {
        setData(apiData);
        // Group by spacecraft
        const groups: GroupedAstronauts = {};
        apiData.people.forEach((person) => {
          if (!groups[person.spacecraft]) {
            groups[person.spacecraft] = [];
          }
          groups[person.spacecraft].push(person);
        });
        setGroupedAstronauts(groups);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching astronaut data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden pt-24">
       {/* Background from HeroSection */}
       <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
       <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

    <div className="relative z-10 w-full px-4 md:px-8 py-8 space-y-12">
      {/* Expedition Header */}
      {data && (
        <section className="relative overflow-hidden rounded-xl bg-black/40 border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
          <div 
             className="absolute inset-0 opacity-30 bg-cover z-0"
             style={{ backgroundImage: `url(${data.expedition_image})`, backgroundPosition: 'center 10%' }} 
          />
          
          <div className="relative z-20 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            <div className="shrink-0 animate-in zoom-in duration-500">
               <img 
                 src={data.expedition_patch} 
                 alt={`Expedition ${data.iss_expedition} Patch`} 
                 className="w-48 h-48 md:w-56 md:h-56 drop-shadow-2xl filter hover:scale-105 transition-transform duration-500"
               />
            </div>
            
            <div className="text-center md:text-left space-y-4 max-w-2xl">
              <div className="space-y-2">
                <Badge variant="outline" className="text-white text-gray-300 bg-white/5 border border-white/10">
                  Obecna Misja
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Ekspedycja {data.iss_expedition}
                </h1>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Ludzie żyjący i pracujący w kosmosie. Obecna ekspedycja na pokładzie Międzynarodowej Stacji Kosmicznej.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                 <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Start: {new Date(data.expedition_start_date * 1000).toLocaleDateString("pl-PL")}</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <RocketIcon className="w-4 h-4" />
                    <span>{data.number} Członków Załogi</span>
                 </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Missions Grid */}
      <div className="space-y-10">
        {Object.entries(groupedAstronauts).map(([spacecraft, astronauts]) => (
          <section key={spacecraft} className="@container space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                <span className="p-3 bg-gray-900 rounded-2xl border border-white/10">
                  <RocketIcon className="w-6 h-6 text-white" />
                </span>
                Misja {spacecraft}
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {astronauts.map((astro) => (
                <AstronautCard key={astro.id || astro.name} astronaut={astro} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Astronauts;
