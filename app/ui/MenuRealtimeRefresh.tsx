"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type Props = {
  tenantId?: string | null;
};

export default function MenuRealtimeRefresh({ tenantId }: Props) {
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
      .subscribe();

    const handleVisibilityChange = () => {
      if (!document.hidden && pendingRefresh.current) {
        pendingRefresh.current = false;
        router.refresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
      supabase.removeChannel(channel);
    };
  }, [router, tenantId]);

  return null;
}
