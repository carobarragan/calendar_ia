<script lang="ts">
  import Calendar from "../lib/calendar.svelte";
  import Toolbar from "$lib/Toolbar.svelte";
</script>

<main
  class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-8 font-sans"
>
  <section class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">
      <Toolbar />
      📅 Mi Calendario Inteligente
    </h1>
    <Calendar />
  </section>
</main>
