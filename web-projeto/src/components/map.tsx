import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export function Map() {
  return (
    <MapContainer
      className="h-[50vh] rounded-md shadow-md border-2 border-gray-400"
      center={[39.8239, -7.49189]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[39.8239, -7.49189]}>
        <Popup>Passadeira Sem-Desgaste.</Popup>
      </Marker>
    </MapContainer>
  );
}
