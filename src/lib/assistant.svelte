<script lang="ts">
  import { fly, scale } from "svelte/transition";
  let open = false;
  let messages = [
    "¡Hola Caro! Soy tu asistente 🤖",
    "Tenés 2 eventos hoy. ¿Querés que te los lea?",
  ];
  let transcript = "";
  let listening = false;

  function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "es-AR";
    window.speechSynthesis.speak(utter);
  }

  function leerEventos() {
    const texto =
      "A las 10 tenés una reunión y a las 15 un turno odontológico.";
    speak(texto);
    messages = [...messages, `📢 ${texto}`];
  }

  function rechazarLectura() {
    speak("Perfecto, te aviso si hay algo importante más tarde.");
  }

  function escuchar() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "es-AR";
    recognition.interimResults = false;
    recognition.start();
    listening = true;
    speak("Te escucho...");

    recognition.onresult = (e) => {
      transcript = e.results[0][0].transcript;
      messages = [...messages, `🗣️ Dijiste: "${transcript}"`];
      listening = false;

      if (transcript.toLowerCase().includes("leer")) leerEventos();
      else if (transcript.toLowerCase().includes("no")) rechazarLectura();
      else speak("No entendí. ¿Podés repetir?");
    };

    recognition.onerror = () => {
      speak("Hubo un error al escuchar.");
      listening = false;
    };
  }
</script>

<!-- Botón flotante -->
<button
  on:click={() => (open = !open)}
  class="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-300 text-black text-2xl p-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 z-[9999]"
>
  🤖
</button>

{#if open}
  <div
    transition:fly={{ y: 20, duration: 400 }}
    class="fixed bottom-28 right-8 w-80 bg-white/20 backdrop-blur-xl text-gray-800 rounded-3xl shadow-2xl border border-white/30 z-[9999] p-5 space-y-4 animate-fade-in pointer-events-auto"
  >
    <div class="flex justify-between items-center">
      <h2 class="font-bold text-lg text-white">Asistente Caro</h2>
      <button
        on:click={() => (open = false)}
        class="text-white hover:text-gray-300"
      >
        ✖️
      </button>
    </div>

    <div class="space-y-2 max-h-48 overflow-y-auto">
      {#each messages as msg (msg)}
        <div
          class="bg-white/30 backdrop-blur-sm text-gray-900 p-2 rounded-lg border border-white/20 text-sm shadow"
        >
          {msg}
        </div>
      {/each}
    </div>

    <div class="flex flex-col gap-2">
      <button
        on:click={leerEventos}
        class="bg-green-400/70 text-white rounded-lg py-2 hover:bg-green-300/80 transition"
      >
        ✔️ Leer
      </button>
      <button
        on:click={rechazarLectura}
        class="bg-red-400/70 text-white rounded-lg py-2 hover:bg-red-300/80 transition"
      >
        ❌ No gracias
      </button>
      <button
        on:click={escuchar}
        class="bg-blue-400/70 text-white py-2 rounded-lg hover:bg-blue-300/80 transition"
      >
        🎙️ Hablar {#if listening}
          (escuchando...){/if}
      </button>
    </div>

    {#if transcript}
      <p class="text-xs text-white/80 italic">“{transcript}”</p>
    {/if}
  </div>
{/if}

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.4s ease-out;
  }
</style>
