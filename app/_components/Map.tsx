"use client";
import { useCountries } from "@/lib/get-countries";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const ICON = icon({
  iconUrl: "https://static.thenounproject.com/png/335079-200.png",
  iconSize: [50, 50],
});

export default function Map({ locationValue }: { locationValue: string }) {
  const { getCountryByValues } = useCountries();
  const latLang = getCountryByValues(locationValue)?.latLang;
  return (
    <MapContainer
      scrollWheelZoom={false}
      className="z-0 h-[50vh] rounded-lg"
      center={latLang ?? [10.8231, 106.6297]}
      zoom={8}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLang ?? [10.8231, 106.6297]} icon={ICON} />
    </MapContainer>
  );
}
