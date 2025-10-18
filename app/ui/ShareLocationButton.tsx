"use client";
import { MapPin } from "lucide-react";

export default function ShareLocationButton({
  name,
  lat,
  lng,
  address,
  mapsUrl,
}: {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  mapsUrl?: string;
}) {
  const directionsUrl = mapsUrl ?? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const text = `Te espero en ${name}${address ? ` (${address})` : ""}. Cómo llegar: ${directionsUrl}`;

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: name, text, url: directionsUrl });
        return;
      }
    } catch {}
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" aria-label="Ubicación" onClick={onShare} className="flex flex-col items-center">
      <MapPin color="#21111199" className="h-6 w-6" />
      <span className="pt-1 text-xs font-extrabold text-[var(--color-category)]">Ubicación</span>
    </button>
  );
}
