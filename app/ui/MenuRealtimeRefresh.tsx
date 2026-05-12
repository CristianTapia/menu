"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type Props = {
  fallbackIntervalMs?: number;
  tenantId?: string | null;
};

export default function MenuRealtimeRefresh({ fallbackIntervalMs = 60000, tenantId }: Props) {
  const router = useRouter();
  const pendingRefresh = useRef(false);
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!tenantId) return;

    const refreshMenu = () => {
      if (typeof document !== "undefined" && document.hidden) {
        pendingRefresh.current = true;
        return;
      }

      if (refreshTimer.current) clearTimeout(refreshTimer.current);
      refreshTimer.current = setTimeout(() => {
        router.refresh();
      }, 300);
    };

    const channel = supabase
      .channel(`public-menu:${tenantId}`)
      .on("broadcast", { event: "menu_updated" }, refreshMenu)
      .subscribe((status, error) => {
        if (process.env.NODE_ENV === "development") {
          console.info("[menu-realtime]", `public-menu:${tenantId}`, status, error ?? "");
        }
      });

    const handleVisibilityChange = () => {
      if (!document.hidden && pendingRefresh.current) {
        pendingRefresh.current = false;
        router.refresh();
      }
    };

    const fallbackId =
      fallbackIntervalMs > 0
        ? setInterval(() => {
            if (typeof document !== "undefined" && document.hidden) return;
            router.refresh();
          }, fallbackIntervalMs)
        : null;

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (fallbackId) clearInterval(fallbackId);
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
      supabase.removeChannel(channel);
    };
  }, [fallbackIntervalMs, router, tenantId]);

  return null;
}
