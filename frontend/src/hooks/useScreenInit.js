// src/hooks/useScreenInit.js
import { useMemo } from "react";
import { manifest } from "../config/manifest";

export function useScreenInit() {
  return useMemo(() => {
    if (typeof window === "undefined") return {};
    const screenId = new URLSearchParams(window.location.search).get(
      "mp_screen",
    );
    if (!screenId) return {};
    return manifest?.screens?.[screenId]?.state ?? {};
  }, []);
}
