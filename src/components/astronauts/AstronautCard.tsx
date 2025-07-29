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
    <div className="group relative w-40 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:w-96">
      <img
        src={astronaut.image}
        alt={astronaut.name}
        className="w-40 h-auto object-cover rounded-md"
      />
      <div className="absolute top-0 left-40 w-[calc(100%-10rem)] h-40 bg-gray-100 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-auto rounded-r-md">
        <h5 className="font-bold text-lg mb-1">{astronaut.name}</h5>
        <h6>{astronaut.country}</h6>
        <h6>{astronaut.position} on {astronaut.spacecraft}</h6>
        <h6>{astronaut.days_in_space} days in space</h6>
      </div>
    </div>
  );
}

export default AstronautCard;

