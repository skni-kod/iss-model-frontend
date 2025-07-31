import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import L, {Icon, type LatLngExpression} from 'leaflet';

type Props = {
    position: LatLngExpression;
};

const customIcon = new Icon({
    iconUrl: "src/images/space-station.png",
    iconSize: [38, 38]
});

function RecenterButton({ center }: { center: LatLngExpression }) {
    const map = useMap();

    const handleClick = () => {
        map.setView(center, map.getZoom());
    };

    return (
        <button
            onClick={handleClick}
            className="absolute top-2 right-2 z-[1000] bg-white text-sm px-3 py-1 rounded shadow hover:bg-gray-100 transition"
        >
            Wycentruj na ISS
        </button>
    );
}

function ISSMap({ position }: Props) {

    const bounds = L.latLngBounds(
        L.latLng(-90, -180),
        L.latLng(90, 180)
    );

    return (
        <MapContainer
            center={position}
            zoom={4}
            style={{ height: "70vh", width: "100%" }}
            minZoom={2}
            maxZoom={6}
            scrollWheelZoom={false}
            maxBounds={bounds}
            maxBoundsViscosity={1.0}
        >
            <TileLayer
                attribution={`Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, 
                      <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> 
                      (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>) | 
                      <a href="https://www.flaticon.com/free-icons/space-station" title="space station icons">Space station icons by Freepik - Flaticon</a>`}
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon} />
            <RecenterButton center={position} />
        </MapContainer>
    );
}

export default ISSMap;