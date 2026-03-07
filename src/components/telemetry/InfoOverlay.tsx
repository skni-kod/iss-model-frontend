import { useEffect, useState } from "react";

type Props = {
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
};

function InfoOverlay({ latitude, longitude, altitude, velocity }: Props) {
    const [lastUpdate, setLastUpdate] = useState("");

    useEffect(() => {
        const now = new Date();
        setLastUpdate(now.toLocaleTimeString("pl-PL", { hour12: false }));
    }, [latitude, longitude, altitude, velocity]);

    return (
        <div className="absolute bottom-0 left-0 w-full md:bottom-8 md:left-auto md:right-2 md:w-64 z-[1000] 
                        bg-slate-900/85 text-white rounded-t-2xl md:rounded-xl p-4 shadow-lg backdrop-blur-sm">
                            
            <div className="text-[10px] md:text-sm text-gray-400 mb-1 md:mb-2 uppercase tracking-wider">
                Ostatnia aktualizacja: {lastUpdate}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1 text-xs md:text-sm">
                <div className="flex justify-between md:block">
                    <span className="font-semibold md:text-white">Szerokość.: </span>
                    <span>{latitude.toFixed(2)}°</span>
                </div>
                <div className="flex justify-between md:block">
                    <span className="font-semibold md:text-white">Długość.: </span>
                    <span>{longitude.toFixed(2)}°</span>
                </div>
                <div className="flex justify-between md:block">
                    <span className="font-semibold md:text-white">Wysokość.: </span>
                    <span>{altitude.toFixed(0)} km</span>
                </div>
                <div className="flex justify-between md:block">
                    <span className="font-semibold md:text-white">Prędkość.: </span>
                    <span>{velocity.toFixed(2)} km/s</span>
                </div>
            </div>
        </div>
    );
}

export default InfoOverlay;