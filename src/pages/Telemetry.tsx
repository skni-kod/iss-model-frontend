import ISSMap from "@/components/telemetry/ISSMap.tsx";
import { useEffect, useState } from "react";
import { twoline2satrec, propagate, gstime, eciToGeodetic, radiansToDegrees } from "satellite.js";


type TelemetryData = {
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
};

type TLEData = {
    fetchedAt: string;
    line1: string;
    line2: string;
}

function Telemetry() {
    const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
    const [trajectory, setTrajectory] = useState<[number, number][]>([]);
    const [niceTrajectory, setNiceTrajectory] = useState<[number, number,number][]>([]);
    const [TLE, setTLE] = useState<TLEData | null>(null);

    useEffect(() => {
        const fetchISS = async () => {
            try {
                const res = await fetch("http://kni.prz.edu.pl:44067/iss/current");
                const data = await res.json();
                setTelemetry({
                    latitude: parseFloat(data.latitude.toFixed(8)),
                    longitude: parseFloat(data.longitude.toFixed(8)),
                    altitude: parseFloat(data.altitude.toFixed(2)),
                    velocity: parseFloat((data.velocity / 3600).toFixed(2)),
                });
            } catch (error) {
                console.error("Error fetching ISS data:", error);
            }
        };

        fetchISS();
        const interval = setInterval(fetchISS, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem("TLE");
        if (stored) {
            const parsed = JSON.parse(stored);
            const lastFetch = new Date(parsed.fetchedAt);
            const now = new Date();
            const hoursDiff = (now.getTime() - lastFetch.getTime()) / (1000 * 60 * 60);

            if (hoursDiff < 1) {
                console.log("Using cached TLE");
                setTLE(parsed);
                return;
            }
      }
        const fetchTLE = async () => {
            try {
                const res = await fetch("https://tle.ivanstanojevic.me/api/tle/25544");
                const data = await res.json();
                const newTLE = {
                    fetchedAt: new Date().toISOString(),
                    line1: data.line1,
                    line2: data.line2
                };
                setTLE(newTLE);
                localStorage.setItem("TLE", JSON.stringify(newTLE));
            } catch (error){
                console.error("Error fetching TLE data:", error);
            }
        }
        fetchTLE();
        const interval = setInterval(fetchTLE, 86400000);
        return () => clearInterval(interval);
    }, []);

    {/* count the future points when the TLE or ISS position changes*/}
    useEffect(() => {
        if (!TLE || !telemetry) return;

        const satrec = twoline2satrec(TLE.line1, TLE.line2);
        const now = new Date();

        // ---- Real trajectory ----
        const continuousPoints: [number, number][] = [];

        let previousLon: number | null = null;
        let lonOffset = 0;

        for (let i = 0; i < 180; i++) {
            const future = new Date(now.getTime() + i * 60 * 1000);
            const pv = propagate(satrec, future);

            if (pv && pv.position) {
                const gmst = gstime(future);
                const geo = eciToGeodetic(pv.position, gmst);

                let longitude = radiansToDegrees(geo.longitude);

                // converts longitude from radians to degrees, normalize to [-180, 180]
                longitude = ((longitude + 540) % 360) - 180;

                // Handle dateline crossing for continuous path
                if (previousLon !== null) {
                    const diff = longitude - previousLon;

                    if (diff > 180) {
                        // Crossed from east to west (from 170 to -170)
                        lonOffset -= 360;
                    } else if (diff < -180) {
                        // Crossed from west to east (from -170 to 170)
                        lonOffset += 360;
                    }
                }

                const continuousLon = longitude + lonOffset;
                previousLon = longitude;

                continuousPoints.push([
                    radiansToDegrees(geo.latitude),
                    continuousLon
                ]);
            }
        }

        // ---- Nice circular trajectory ----
        const periodMin = (2 * Math.PI) / satrec.no;
        const periodMs  = periodMin * 60 * 1000;
        const steps     = 80;

        const gmstEpoch = gstime(now);

        const nicePoints: [number, number, number][] = [];

        // sample one full revolution (0..period)
        for (let i = 0; i <= steps; i++) {
            const t = new Date(now.getTime() + (periodMs / steps) * i);
            const pv = propagate(satrec, t);
            if (pv && pv.position) {
                // Convert the ECI position (pv.position in km) to geodetic using FIXED gmstEpoch:
                const geo = eciToGeodetic(pv.position, gmstEpoch);

                // degrees + height (eciToGeodetic returns radians & km)
                let lon = radiansToDegrees(geo.longitude);
                lon = ((lon + 540) % 360) - 180; // normalize to [-180,180]
                const lat = radiansToDegrees(geo.latitude);
                const altMeters = geo.height * 1000;

                nicePoints.push([lat, lon, altMeters]);
            }
        }

        // ensure exact closure (first == last) to avoid tiny numeric gap
        if (nicePoints.length > 0) {
            nicePoints[nicePoints.length - 1] = nicePoints[0];
        }

        setTrajectory(continuousPoints);
        setNiceTrajectory(nicePoints);
    }, [TLE, telemetry]);


    return (
        <div className="pt-5">
            <div className="text-center mb-8 px-4">
                <h1 className="text-4xl font-bold">Pozycja ISS w czasie rzeczywistym</h1>
                <p className="text-lg text-gray-600">
                    Śledzenie Międzynarodowej Stacji Kosmicznej na orbicie Ziemi
                </p>
            </div>

            <div className="w-full">
                {telemetry && TLE ? (
                    <ISSMap
                        position={[telemetry.latitude, telemetry.longitude]}
                        altitude={telemetry.altitude}
                        velocity={telemetry.velocity}
                        trajectory={trajectory}
                        niceTrajectory={niceTrajectory}
                    />
                    
                ) : (
                    <div className="w-full h-[600px] flex flex-col items-center justify-center bg-gray-100 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Brak danych o pozycji ISS
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Nasze API jest chwilowo niedostępne. Spróbuj ponownie później.
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Telemetry;
