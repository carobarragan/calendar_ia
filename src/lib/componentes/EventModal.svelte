<script lang="ts">
  import { modalEvent, addEvent } from "../store";

  let form = { title: "", start: "", end: "" };

  $: if ($modalEvent) {
    form = { ...$modalEvent };
  }

  function save() {
    addEvent(form);
    modalEvent.set(null);
  }
</script>

{#if $modalEvent}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-xl p-6 shadow-lg w-80 space-y-3">
      <h2 class="text-lg font-bold text-gray-700">Nuevo Evento</h2>
      <input
        bind:value={form.title}
        class="w-full border rounded p-2"
        placeholder="Título"
      />
      <input
        type="datetime-local"
        bind:value={form.start}
        class="w-full border rounded p-2"
      />
      <input
        type="datetime-local"
        bind:value={form.end}
        class="w-full border rounded p-2"
      />
      <div class="flex justify-end gap-2">
        <button
          on:click={() => modalEvent.set(null)}
          class="px-3 py-1 bg-gray-300 rounded"
        >
          Cancelar
        </button>
        <button
          on:click={save}
          class="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
{/if}
