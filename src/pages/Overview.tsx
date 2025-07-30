import DataCard from "@/components/ui/DataCard.tsx";
import ISSMap from "@/components/ISSMap";
import { useEffect, useState } from "react";

function Overview() {
    const [latitude, setLatitude] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<string | null>(null);

    useEffect(() => {
        const fetchISS = async () => {
            try {
                const res = await fetch("http://api.open-notify.org/iss-now.json");
                const data = await res.json();
                setLatitude(data.iss_position.latitude);
                setLongitude(data.iss_position.longitude);
            } catch (error) {
                console.error("Błąd pobierania danych ISS:", error);
            }
        };

        fetchISS();
        const interval = setInterval(fetchISS, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pt-5">
            <div className="text-center mb-8 px-4">
                <h1 className="text-4xl font-bold">Pozycja ISS w czasie rzeczywistym</h1>
                <p className="text-lg text-gray-600">
                    Śledzenie Międzynarodowej Stacji Kosmicznej na orbicie Ziemi
                </p>
                <span className="mt-2 inline-block text-sm text-green-600 font-medium">
                    🟢 Ostatnia aktualizacja: 00:00:00
                </span>
            </div>

            <div className="w-full">
                {latitude && longitude ? (
                    <ISSMap position={[parseFloat(latitude), parseFloat(longitude)]} />
                ) : (
                    <img
                        src="src/images/placeholdermap.png"
                        alt="Mapa ISS"
                        className="w-full rounded-lg shadow-lg"
                    />
                )}
            </div>

            <div className="max-w-6xl mx-auto mt-10 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <DataCard label="Szerokość" value={latitude || "..."} unit="°" type="latitude" />
                    <DataCard label="Długość" value={longitude || "..."} unit="°" type="longitude" />
                    <DataCard label="Wysokość" value="400" unit="km" type="altitude" />
                    <DataCard label="Prędkość" value="7" unit="km/s" type="speed" />
                </div>
            </div>
        </div>
    );
}

export default Overview;
