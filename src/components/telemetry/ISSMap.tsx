import {useState} from "react";
import {MapContainer, TileLayer, Marker, Polyline} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {Viewer, Entity, ImageryLayer} from "resium";
import {Cartesian3, Color, SceneMode, UrlTemplateImageryProvider, ColorMaterialProperty,} from "cesium";
import InfoOverlay from "@/components/telemetry/InfoOverlay.tsx";

type MapProps = {
    position: [number, number],
    trajectory: [number, number][],
    niceTrajectory: [number, number, number][],
    velocity: number,
    altitude: number,
};

function ISSMap({position, trajectory, niceTrajectory, velocity, altitude, }: MapProps) {
    const [latitude, longitude] = position;

    const [mode, setMode] = useState<"2d" | "3d">("2d");
    const [currentView, setCurrentView] = useState<'real' | 'nice'>('real');

    const [lat, lon] = position;

    const issIcon = new L.Icon({
        iconUrl: "src/images/space-station.png",
        iconSize: [48, 48],
        iconAnchor: [24, 24],
    });

    const esriProvider = new UrlTemplateImageryProvider({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/" +
            "World_Imagery/MapServer/tile/{z}/{y}/{x}",
        credit: 'Tiles © Esri' +
            '<a href="https://www.flaticon.com/free-icons/space-station" title="space station icons">' +
            'Space station icons by Freepik - Flaticon</a>'
    });

    return (
        <div className="relative h-[80vh] w-full ">
            {/* switch between 3d and 2d*/}
            <button
                onClick={() => setMode(mode === "2d" ? "3d" : "2d")}
                className="absolute top-2 left-2 z-[1000] bg-slate-900/70 text-white px-4 py-2 rounded-lg cursor-pointer shadow-md"
            >
                {mode === "2d" ? "Przełącz na 3D" : "Przełącz na 2D"}
            </button>

            {mode === "3d" && (
                <button
                    onClick={() => setCurrentView(currentView === "real" ? "nice" : "real")}
                    className={`absolute top-2 right-2 z-[1000] px-12 py-2 rounded-full shadow-md 
            ${currentView === "real" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-indigo-600"}`}
                >
                    {currentView === "real" ? "Nice Orbit" : "Real Orbit"}
                </button>
            )}

            {mode === "2d" ? (
                <MapContainer
                    center={position}
                    zoom={1}
                    className="h-[70vh] w-full"
                    style={{backgroundColor: "white"}}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    dragging={false}
                    maxBoundsViscosity={1.0}
                >
                    <InfoOverlay
                        latitude={latitude}
                        longitude={longitude}
                        altitude={altitude}
                        velocity={velocity}
                    />
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='Tiles © Esri | <a href="https://www.flaticon.com/free-icons/space-station" title="space station icons">
                          Space station icons by Freepik - Flaticon </a>`'
                    />
                    <Marker position={[lat, lon]} icon={issIcon}/>

                    <Polyline positions={trajectory} color="red" weight={2}/>

                </MapContainer>
            ) : (
                <Viewer
                    full
                    sceneMode={SceneMode.SCENE3D}
                    baseLayerPicker={false}
                    animation={false}
                    timeline={false}
                >
                    <ImageryLayer imageryProvider={esriProvider}/>

                    <InfoOverlay
                        latitude={latitude}
                        longitude={longitude}
                        altitude={altitude}
                        velocity={velocity}
                    />

                    <Entity
                        position={Cartesian3.fromDegrees(lon, lat, altitude * 1000)}
                        billboard={{
                            image: "src/images/space-station.png",
                            width: 48,
                            height: 48,
                        }}
                    />

                    <Entity
                        polyline={{
                            positions: (currentView === "real" ? trajectory : niceTrajectory)
                                .slice(0,90).map(([lat, lon]) =>
                                    Cartesian3.fromDegrees(lon, lat, altitude * 1000)
                                ),
                            width: 2,
                            material: new ColorMaterialProperty(
                                currentView === "real" ? Color.RED : Color.BLUE
                            ),
                        }}
                    />
                </Viewer>
            )}
        </div>
    );
}

export default ISSMap;
