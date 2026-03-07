import {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Polyline, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {Viewer, Entity, ImageryLayer, ScreenSpaceCameraController} from "resium";
import {Cartesian3, Color, SceneMode, ColorMaterialProperty, Ion, TileMapServiceImageryProvider, buildModuleUrl} from "cesium";

import InfoOverlay from "@/components/telemetry/InfoOverlay.tsx";
import issIconUrl from "@/images/space-station.png";

//default cesium token
Ion.defaultAccessToken = "null";

type MapProps = {
    position: [number, number],
    trajectory: [number, number][],
    niceTrajectory: [number, number, number][],
    velocity: number,
    altitude: number,
};

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
}

function MapResizer({ width }: { width: number }) {
    const map = useMap();
    useEffect(() => {
        let zoom = 1.5
        if (width < 768) {
            zoom = 1;
        } else if (width < 1200) {
            zoom = 1.5;
        } else if (width < 2000) {
            zoom = 1.75;
        } else if (width < 3000) {
            zoom = 2.25;
        } else {
            zoom = 3;
        }
        map.setZoom(zoom);
    }, [width, map]);
    return null;
}

function ISSMap({position, trajectory, niceTrajectory, velocity, altitude, }: MapProps) {
    const [latitude, longitude] = position;
    const [mode, setMode] = useState<"2d" | "3d">("2d");
    const [currentView, setCurrentView] = useState<'real' | 'nice'>('real');

    const [cesiumProvider, setCesiumProvider] = useState<TileMapServiceImageryProvider | null>(null);

    const width = useWindowWidth();
    const [lat, lon] = position;

    const issIcon = new L.Icon({
        iconUrl: issIconUrl,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
    });

    useEffect(() => {
        async function setupProvider() {
            try {
                const provider = await TileMapServiceImageryProvider.fromUrl(
                    buildModuleUrl("Assets/Textures/NaturalEarthII")
                );
                setCesiumProvider(provider);
            } catch (e) {
                console.error("Cesium Imagery Error:", e);
            }
        }
        setupProvider();
    }, []);

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
                    {currentView === "real" ? "Trajektoria uproszczona" : "Trajektoria rzeczywista"}
                </button>
            )}

            {mode === "2d" ? (
                <MapContainer
                    center={[lat,lon]}
                    zoomSnap={0.25}
                    zoom={1.5}
                    className="h-[70vh] w-full"
                    style={{backgroundColor: "white"}}
                    scrollWheelZoom={false}
                    zoomControl={width < 768}
                    dragging={false}
                    maxBoundsViscosity={1.0}
                >

                    <MapResizer width={width} />
                    
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
                    geocoder={false}
                >
                    
                    <ScreenSpaceCameraController 
                        maximumZoomDistance={40000000} 
                        minimumZoomDistance={150000}
                        zoomFactor={2.0}
                        enableCollisionDetection={true}
                    />

                    {cesiumProvider && <ImageryLayer imageryProvider={cesiumProvider} />}

                    <InfoOverlay
                        latitude={latitude}
                        longitude={longitude}
                        altitude={altitude}
                        velocity={velocity}
                    />

                    <Entity
                        position={Cartesian3.fromDegrees(lon, lat, altitude * 1000)}
                        billboard={{
                            image: issIconUrl,
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
