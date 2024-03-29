import "leaflet/dist/leaflet.css";
import { MapContainer, CircleMarker, TileLayer, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { Crosswalk, getCrosswalks } from "../services/auth";

export function Map() {
  const [crosswalks, setCrosswalks] = useState<Crosswalk[]>([]);

  useEffect(() => {
    getCrosswalks({})
      .then((crosswalkData) => {
        setCrosswalks(crosswalkData.data);
      })
      .catch((error) => {
        console.error("Error fetching crosswalks:", error);
      });
  }, []);
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
      {crosswalks.map((crosswalk) => (
        <CircleMarker
          center={[crosswalk.latitude, crosswalk.longitude]}
          pathOptions={{ color: "red" }}
          radius={10}
        >
          <Popup>Popup in CircleMarker</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
