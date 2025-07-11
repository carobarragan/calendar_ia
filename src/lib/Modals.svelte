<script lang="ts">
  import { createEventStore, viewEventStore } from "./stores";

  export let show = false;
  export let event = null;
  export let date = "";

  function close() {
    createEventStore.hide();
    viewEventStore.hide();
  }

  function saveEvent(title, description) {
    console.log("Nuevo evento", { title, description, date });
    close();
  }
</script>

{#if createEventStore.isOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-xl font-bold mb-4">
        Nuevo evento para {createEventStore.date}
      </h2>
      <input
        class="border p-2 w-full mb-2"
        placeholder="Título"
        bind:value={title}
      />
      <textarea
        class="border p-2 w-full mb-2"
        placeholder="Descripción"
        bind:value={description}
      ></textarea>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded"
        on:click={() => saveEvent(title, description)}>Guardar</button
      >
      <button class="ml-2 text-gray-600" on:click={close}>Cancelar</button>
    </div>
  </div>
{/if}

{#if viewEventStore.isOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-xl font-bold mb-4">{viewEventStore.event.title}</h2>
      <p>{viewEventStore.event.description}</p>
      <p class="text-gray-500 mt-2">📅 {viewEventStore.event.date}</p>
      <button
        class="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        on:click={close}>Cerrar</button
      >
    </div>
  </div>
{/if}
