import type { AnnouncementState, Announcement } from "@/types";
import { defineStore } from "pinia";
export const useAnnouncementStore = defineStore("announcement", {
  state: (): AnnouncementState => ({
    announcement: null,
  }),
  actions: {
    setStore(announcement: Announcement): void {
      this.announcement = announcement;
    },
  },
});
