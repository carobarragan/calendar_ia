<script>
  let dark = true;
  function toggleTheme() {
    dark = !dark;
    document.documentElement.classList.toggle("dark", dark);
  }
</script>

<button
  on:click={toggleTheme}
  class="fixed top-6 right-6 p-2 bg-slate-700 text-white rounded"
>
  {dark ? "☀️ Claro" : "🌙 Oscuro"}
</button>
