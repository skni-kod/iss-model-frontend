import {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Polyline, ZoomControl, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {Viewer, Entity, ImageryLayer, CameraFlyTo} from "resium";
import {Cartesian3, Color, SceneMode, UrlTemplateImageryProvider, ColorMaterialProperty} from "cesium";
import InfoOverlay from "@/components/telemetry/InfoOverlay.tsx";
import BottomInfoBar from "./BottomInfoBar";

type MapProps = {
    position: [number, number],
    trajectory: [number, number][],
    niceTrajectory: [number, number, number][],
    velocity: number,
    altitude: number,
};

const OFFSET = 200;

function ISSMap({position, trajectory, niceTrajectory, velocity, altitude, }: MapProps) {
    const [latitude, longitude] = position;

    const getResponsiveZoom = (width: number) => {
        if (width < 768) return 0.8;
        if (width <= 1920) return 1.9;
        if (width <= 2560) return 2.5;
        return 3.0;
    };

    const [mode, setMode] = useState<"2d" | "3d">("2d");
    const [currentView, setCurrentView] = useState<'real' | 'nice'>('real');
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );
    const [responsiveZoom, setResponsiveZoom] = useState<number>(
        typeof window !== 'undefined' ? getResponsiveZoom(window.innerWidth) : 2.2
    );

    const [lat, lon] = position;

    useEffect(() => {
        const checkSize = () => {
            const width = window.innerWidth;
            setIsSmallScreen(width < 768);
            setResponsiveZoom(getResponsiveZoom(width));
        };
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const issIcon = new L.Icon({
        iconUrl: "src/images/space-station.png",
        iconSize: [48, 48],
        iconAnchor: [24, 24],
    });

    // function MapCenterUpdater() {
    //     const map = useMap();
    //     useEffect(() => {
    //         map.panTo([position[0], position[1]]);
    //     }, [position, map]);
    //     return null;
    // }

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
                className="absolute top-2 left-2 z-[1000] bg-neutral-900/80 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg cursor-pointer shadow-md text-sm md:text-base hover:bg-neutral-800/90"
            >
                {mode === "2d" ? "Przełącz na 3D" : "Przełącz na 2D"}
            </button>

            {mode === "3d" && (
                <button
                    onClick={() => setCurrentView(currentView === "real" ? "nice" : "real")}
                    className={`absolute top-16 left-2 z-[1000] px-3 md:px-4 py-2 rounded-lg shadow-md text-sm md:text-base
            ${currentView === "real" ? "bg-neutral-900/80 text-white hover:bg-neutral-800/90" : "bg-white/80 text-neutral-800 border border-neutral-300 hover:bg-white"}`}
                >
                    {currentView === "real" ? "Wygładzona orbita" : "Rzeczywista orbita"}
                </button>
            )}

            {mode === "2d" ? (
                <MapContainer
                    // center={[position[0], position[1]]}
                    center={[0, OFFSET]}
                    zoomSnap={0.1}
                    zoom={responsiveZoom}
                    minZoom={0.1}
                    maxZoom={7}
                    className="h-[70vh] w-full"
                    style={{backgroundColor: "white"}}
                    scrollWheelZoom={isSmallScreen}
                    doubleClickZoom={false}
                    zoomControl={false}
                    dragging={false}
                    maxBounds={[[-90, -180], [90, 180]]}
                    maxBoundsViscosity={1.0}
                    worldCopyJump={false}
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
                           const cesiumViewer = viewer?.cesiumElement;
                           const controller = cesiumViewer?.scene?.screenSpaceCameraController;
                           if (controller) {
                               controller.minimumZoomDistance = 1000000; // 1,000 km
                               controller.maximumZoomDistance = 40000000; // 40,000 km
                           }

                           if (cesiumViewer) {
                               cesiumViewer.selectedEntity = undefined;
                               cesiumViewer.trackedEntity = undefined;
                               cesiumViewer.selectionIndicator?.viewModel && (cesiumViewer.selectionIndicator.viewModel.isVisible = false);
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
