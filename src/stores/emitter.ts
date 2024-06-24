import { inject } from "vue";
import { defineStore } from "pinia";
import { EventType, Emitter } from "mitt";

interface Events extends Record<EventType, unknown> {}

export const useEmitterStore = defineStore("emitter", () => {
  const emitter = inject("emitter") as Emitter<Events>;
  // emitter.emit("my_event");
  // emitter.on("my_event", () => {
  //   console.log(event);
  // });
  return { emitter };
});
