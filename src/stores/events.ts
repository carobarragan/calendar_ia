import { writable } from "svelte/store";

export const currentView = writable<"month" | "week">("week");

export const events = writable([
  { title: "Reunión 1", start: "2025-07-01T09:00", end: "2025-07-01T10:30" },
  { title: "Reunión 2", start: "2025-07-01T11:00", end: "2025-07-01T12:00" },
  { title: "Reunión 3", start: "2025-07-01T14:00", end: "2025-07-01T15:00" },
]);

export function activarModoEmergencia() {
  events.update((evts) => {
    console.log("🧘‍♀️ Anti‑Burnout activado: agregando descansos...");
    const updated = [...evts];
    updated.splice(1, 0, {
      title: "🌿 Descanso Anti‑Burnout",
      start: "2025-07-01T10:30",
      end: "2025-07-01T10:45",
    });
    return updated;
  });
}
