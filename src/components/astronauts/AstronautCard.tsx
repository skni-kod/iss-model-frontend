import {
  Card,
  CardContent,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

export interface Astronaut {
  id?: number;
  name: string;
  country: string;
  flag_code?: string;
  agency?: string;
  position: string;
  spacecraft: string;
  on_iss?: boolean; // API field is "iss", but we can map it or keep using it if inconsistent
  days_in_space: number;
  image: string;
  url?: string;
}

type Props = {
  astronaut: Astronaut;
};

// Map generic country names to flag emojis or codes if needed,
// but for now we can just display the country name or use the flag_code from API if handy.
const getFlagEmoji = (countryCode: string | undefined) => {
  if (!countryCode) return "🌍";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

function AstronautCard({ astronaut }: Props) {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-white/10 bg-black/40 backdrop-blur-md text-white">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
        <div className="absolute top-0 right-0 p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <Badge variant="outline" className="bg-black/50 border-white/20 text-white backdrop-blur-md">
                {astronaut.spacecraft}
             </Badge>
        </div>
        <img
          src={astronaut.image}
          alt={astronaut.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
          <Badge variant="secondary" className="mb-2 bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-0">
            {astronaut.position}
          </Badge>
          <CardTitle className="text-xl font-bold truncate text-white drop-shadow-md">
            {astronaut.name}
          </CardTitle>
          <div className="flex items-center text-sm text-gray-300 mt-1">
             <span className="mr-2 text-lg">{getFlagEmoji(astronaut.flag_code)}</span>
             {astronaut.agency || astronaut.country}
          </div>
        </div>
      </div>
      <CardContent className="pt-4 bg-white/5">
        <div className="flex flex-col gap-2 text-sm">
           <div className="flex justify-between items-center py-1 border-b border-white/10 last:border-0">
              <span className="text-gray-400">Statek</span>
              <span className="font-medium text-gray-200">{astronaut.spacecraft}</span>
           </div>
           <div className="flex justify-between items-center py-1">
              <span className="text-gray-400">Czas na orbicie</span>
              <span className="font-medium text-sky-400">{astronaut.days_in_space} dni</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AstronautCard;

