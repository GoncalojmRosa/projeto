import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { Crosswalk } from "../services/auth";

export enum Colors {
  SEM_DESGASTE = "green",
  DESGASTE_MODERADO = "yellow",
  DESGASTE_SEVERO = "red",
}

interface MapProps {
  crosswalks: Crosswalk[] | undefined;
}

export function Map({ crosswalks }: MapProps) {
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
      {crosswalks &&
        crosswalks.map((crosswalk) => (
          <CircleMarker
            key={crosswalk.id}
            center={[crosswalk.location.latitude, crosswalk.location.longitude]}
            pathOptions={{
              color: Colors[crosswalk.state as keyof typeof Colors] as string,
            }}
            radius={10}
          >
            <Popup>Popup in CircleMarker</Popup>
          </CircleMarker>
        ))}
    </MapContainer>
  );
}
