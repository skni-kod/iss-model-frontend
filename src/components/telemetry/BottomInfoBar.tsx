type BottomInfoBarProps = {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
};

const BottomInfoBar = ({ latitude, longitude, altitude, velocity }: BottomInfoBarProps) => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-slate-900 text-white p-6 pb-16 shadow-lg rounded-t-md z-[1000]">
      <div className="flex justify-between text-sm">
        <div className="space-y-1">
          <div><span className="font-semibold">Szerokość:</span> {latitude.toFixed(2)}°</div>
          <div><span className="font-semibold">Długość:</span> {longitude.toFixed(2)}°</div>
        </div>
        <div className="space-y-1 text-right">
          <div><span className="font-semibold">Wysokość:</span> {altitude.toFixed(2)} km</div>
          <div><span className="font-semibold">Prędkość:</span> {velocity.toFixed(2)} km/s</div>
        </div>
      </div>
    </div>
  );
};

export default BottomInfoBar;