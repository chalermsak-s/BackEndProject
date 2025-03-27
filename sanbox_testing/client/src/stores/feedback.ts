import type { FeedbackState, Feedback } from "@/types";
import { defineStore } from "pinia";
export const useFeedbackStore = defineStore("feedback", {
  state: (): FeedbackState => ({
    feedback: null,
  }),
  actions: {
    setStore(feedback: Feedback): void {
      this.feedback = feedback;
    },
  },
});
