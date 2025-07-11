<script lang="ts">
  export let className = "";
</script>

<div class={`rounded-xl bg-white text-gray-900 shadow-md p-4 ${className}`}>
  <slot />
</div>
