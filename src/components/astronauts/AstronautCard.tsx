export interface Astronaut {
  name: string;
  country: string;
  position: string;
  spacecraft: string;
  on_iss: boolean;
  days_in_space: number;
  image: string;
}


type Props = {
  astronaut: Astronaut;
};

function AstronautCard({ astronaut }: Props) {
  return (
    <div className="group relative w-40 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:w-96 rounded-tr-none">
      <img
        src={astronaut.image}
        alt={astronaut.name}
        className="w-40 h-60 object-cover rounded-md hover:rounded-tr-none transition-all duration-300"
      />
      <div className="absolute border-2 border-l-0 border-gray-950 top-0 left-40 w-[calc(100%-10rem)] h-44 bg-gray-100 p-4 opacity-0 group-hover:opacity-100 rounded-tl-none transition-opacity duration-300 overflow-auto rounded-r-md">
        <h5 className="font-bold text-lg mb-1">{astronaut.name}</h5>
        <h6>{astronaut.country}</h6>
        <h6>{astronaut.position} on {astronaut.spacecraft}</h6>
        <h6>{astronaut.days_in_space} days in space</h6>
      </div>
    </div>
  );
}

export default AstronautCard;

