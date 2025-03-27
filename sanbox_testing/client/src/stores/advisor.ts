import type { AdvisorState, Advisor } from "@/types";
import { defineStore } from "pinia";
export const useAdvisorStore = defineStore("advisor", {
  state: (): AdvisorState => ({
    advisor: null,
  }),
  actions: {
    setStore(advisor: Advisor): void {
      this.advisor = advisor;
    },
  },
});
