"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  intervalMs?: number;
};

export default function AutoRefresh({ intervalMs = 15000 }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (intervalMs <= 0) return;

    const id = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      router.refresh();
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs, router]);

  return null;
}
