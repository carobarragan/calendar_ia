<script lang="ts">
  import { currentView, activarModoEmergencia } from "../stores/events";

  function toggleView() {
    currentView.update((v) => (v === "month" ? "week" : "month"));
  }
</script>

<div class="flex space-x-4 mb-4">
  <button
    on:click={toggleView}
    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
  >
    Cambiar Vista ({$currentView === "month" ? "Mensual" : "Semanal"})
  </button>

  <button
    on:click={activarModoEmergencia}
    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
  >
    🧘‍♀️ Activar Anti‑Burnout
  </button>
</div>
