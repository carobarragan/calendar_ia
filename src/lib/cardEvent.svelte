<script lang="ts">
  export let event: {
    title: string;
    date: string;
    time: string;
    description: string;
  };
</script>

<div
  class="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow hover:shadow-lg transition"
>
  <h4 class="text-lg font-semibold text-yellow-300">{event.title}</h4>
  <p class="text-sm text-gray-400 mt-1">{event.date} a las {event.time}</p>
  <p class="text-sm text-gray-300 mt-2">{event.description}</p>
</div>
