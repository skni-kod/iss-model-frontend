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
        <div className="absolute bottom-8 right-2 z-[1000] bg-slate-900/70 text-white rounded-xl p-4 shadow-lg w-64">
            <div className="text-sm text-gray-300 mb-2">
                Ostatnia aktualizacja: {lastUpdate}
            </div>
            <div className="space-y-1 text-sm">
                <div>
                    <span className="font-semibold">Szerokość geogr.: </span>
                    {latitude.toFixed(2)}°
                </div>
                <div>
                    <span className="font-semibold">Długość geogr.: </span>
                    {longitude.toFixed(2)}°
                </div>
                <div>
                    <span className="font-semibold">Wysokość: </span>
                    {altitude.toFixed(2)} km
                </div>
                <div>
                    <span className="font-semibold">Prędkość: </span>
                    {velocity.toFixed(2)} km/s
                </div>
            </div>
        </div>
    );
}

export default InfoOverlay;
