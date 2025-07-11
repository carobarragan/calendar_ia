<script lang="ts">
  import { onMount } from "svelte";
  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import { currentView, events, activarModoEmergencia } from "../stores/events";

  // Referencia al elemento DOM donde se montará el calendario
  let calendarEl;
  let calendarInstance;

  // Configurar eventos iniciales desde el store
  let calendarEvents = $events.map((event) => ({
    title: event.title,
    start: event.start,
    end: event.end,
  }));

  // Actualizar eventos cuando el store cambie
  $: {
    calendarEvents = $events.map((event) => ({
      title: event.title,
      start: event.start,
      end: event.end,
    }));
    if (calendarInstance) {
      calendarInstance.getEvents().forEach((event) => event.remove());
      calendarInstance.addEventSource(calendarEvents);
    }
  }

  // Fecha inicial (hoy: 11 de julio de 2025, 11:00 AM -03)
  const today = new Date("2025-07-11T11:00:00-03:00");

  onMount(() => {
    import("@fullcalendar/core/locales/es").then((locale) => {
      calendarInstance = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: $currentView === "week" ? "timeGridWeek" : "dayGridMonth",
        events: calendarEvents,
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        },
        titleFormat: { year: "numeric", month: "long", locale: "es" }, // Forzar español
        locale: "es", // Establecer idioma español
        buttonText: {
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          prev: "Anterior",
          next: "Siguiente",
        },
        editable: true,
        selectable: true,
        dateClick: (info) => console.log("Fecha clicada:", info.dateStr),
        eventClick: (info) => console.log("Evento clicado:", info.event),
        initialDate: today,
        height: "auto",
        customButtons: {
          antiBurnout: {
            text: "🧘‍♀️ Anti-Burnout",
            click: () => activarModoEmergencia(),
          },
        },
        dayCellClassNames: (arg) => {
          const d = new Date(arg.date);
          return d.toDateString() === today.toDateString()
            ? "bg-pastel-pink"
            : "";
        },
        eventContent: (arg) => {
          return {
            html: `<div style="background-color: #c8e6c9; color: white; padding: 2px; border-radius: 3px;">${arg.event.title}</div>`,
          };
        },
      });

      calendarInstance.render();
    });
  });

  // Actualizar vista cuando cambie currentView
  $: {
    if (calendarInstance) {
      calendarInstance.changeView(
        $currentView === "week" ? "timeGridWeek" : "dayGridMonth"
      );
      calendarInstance.gotoDate(today);
    }
  }
</script>

<div
  class="p-4"
  style="background: linear-gradient(135deg, #e6e6fa, #b0e0e6); border-radius: 10px;"
  bind:this={calendarEl}
/>

<style>
  :global(body) {
    background: #f0f4f8;
    margin: 0;
    padding: 20px;
  }
  :global(.fc .fc-button) {
    background-color: #d1c4e9 !important;
    border-color: #d1c4e9 !important;
    color: white !important;
  }
  :global(.fc .fc-button:hover) {
    background-color: #b0a8d1 !important;
  }
  :global(.fc .fc-daygrid-day-number) {
    color: #333;
  }
  :global(.fc .bg-pastel-pink) {
    background-color: #f8bbd0 !important;
    border-radius: 50%;
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
  }
  :global(.fc .fc-day-today) {
    background-color: transparent !important; /* Evita conflicto con bg-pastel-pink */
  }
</style>
