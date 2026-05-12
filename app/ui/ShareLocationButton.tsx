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
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
  mapsUrl?: string | null;
}) {
  const destination = lat !== null && lat !== undefined && lng !== null && lng !== undefined ? `${lat},${lng}` : address;
  const directionsUrl =
    mapsUrl ??
    (destination ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}` : null);
  const shareText = `Te espero en ${name}${address ? ` (${address})` : ""}.`;
  const whatsappText = directionsUrl ? `${shareText} Como llegar: ${directionsUrl}` : shareText;

  if (!directionsUrl && !address) return null;

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: name, text: shareText, url: directionsUrl ?? undefined });
        return;
      }
    } catch {}

    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" aria-label="Ubicacion" onClick={onShare} className="flex flex-col items-center">
      <MapPin className="h-6 w-6 text-[var(--color-category)]" />
      <span className="pt-1 text-xs font-extrabold text-[var(--color-category)]">Ubicacion</span>
    </button>
  );
}
