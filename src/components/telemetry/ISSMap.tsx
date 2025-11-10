import {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Polyline, ZoomControl} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {Viewer, Entity, ImageryLayer, CameraFlyTo} from "resium";
import {Cartesian3, Color, SceneMode, UrlTemplateImageryProvider, ColorMaterialProperty} from "cesium";
import InfoOverlay from "@/components/telemetry/InfoOverlay.tsx";
import BottomInfoBar from "./BottomInfoBar";

const OFFSET = 50;

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
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    const [lat, lon] = position;

    useEffect(() => {
        const checkSize = () => setIsSmallScreen(window.innerWidth < 768);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

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
        <div className="relative w-full h-[80vh] md:h-[80vh]">
            {/* switch between 3d and 2d*/}
            <button
                onClick={() => setMode(mode === "2d" ? "3d" : "2d")}
                className="absolute top-2 left-2 z-[1000] bg-slate-900/70 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg cursor-pointer shadow-md text-sm md:text-base"
            >
                {mode === "2d" ? "Przełącz na 3D" : "Przełącz na 2D"}
            </button>

            {mode === "3d" && (
                <button
                    onClick={() => setCurrentView(currentView === "real" ? "nice" : "real")}
                    className={`absolute top-16 left-2 z-[1000] px-3 md:px-4 py-2 rounded-lg shadow-md text-sm md:text-base
            ${currentView === "real" ? "bg-indigo-600/70 text-white" : "bg-white/70 text-indigo-600 border border-indigo-600"}`}
                >
                    {currentView === "real" ? "Nice Orbit" : "Real Orbit"}
                </button>
            )}

            {mode === "2d" ? (
                <MapContainer
                    center={[0,position[1]+OFFSET]}
                    zoomSnap={0.1}
                    zoom={1.6}
                    minZoom={0.1}
                    maxZoom={7}
                    className="h-[70vh] w-full"
                    style={{backgroundColor: "white"}}
                    scrollWheelZoom={isSmallScreen}
                    doubleClickZoom={false}
                    zoomControl={false}
                    dragging={false}
                    maxBoundsViscosity={1.0}
                    worldCopyJump={true}
                >
                    {!isSmallScreen && (
                        <InfoOverlay
                            latitude={latitude}
                            longitude={longitude}
                            altitude={altitude}
                            velocity={velocity}
                        />
                    )}
                    {isSmallScreen && (
                        <><BottomInfoBar
                            latitude={latitude}
                            longitude={longitude}
                            altitude={altitude}
                            velocity={velocity} /><ZoomControl position="topright" /></>
                    )}
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
                    homeButton={false}
                    navigationHelpButton={false}
                    sceneModePicker={false}
                    selectionIndicator={false}
                    infoBox={false}
                    fullscreenButton={false}
                       ref={(viewer) => {
                           if (viewer?.cesiumElement?.scene?.screenSpaceCameraController) {
                               viewer.cesiumElement.scene.screenSpaceCameraController.minimumZoomDistance = 1000000; // 1,000 km
                               viewer.cesiumElement.scene.screenSpaceCameraController.maximumZoomDistance = 40000000; // 40,000 km
                           }
                       }}
                >
                       <CameraFlyTo
                           destination={Cartesian3.fromDegrees(0, 0, 25000000)}
                           duration={0}
                           once={true}
                       />
                    <ImageryLayer imageryProvider={esriProvider}/>

                    {!isSmallScreen && (
                        <InfoOverlay
                            latitude={latitude}
                            longitude={longitude}
                            altitude={altitude}
                            velocity={velocity}
                        />
                    )}
                    {isSmallScreen && (
                        <BottomInfoBar
                            latitude={latitude}
                            longitude={longitude}
                            altitude={altitude}
                            velocity={velocity}
                        />
                    )}

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
