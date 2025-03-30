import type { AdvisorState, Advisor } from "@/types";
import { defineStore } from "pinia"; // นำเข้า defineStore จาก Pinia สำหรับสร้าง store

export const useAdvisorStore = defineStore("advisor", { //สร้าง store ชื่อ "advisor"
  state: (): AdvisorState => ({ // กำหนด state เริ่มต้นเป็น object ที่มี property advisor เป็น null // AdvisorState ป็น interface ที่กำหนดไว้ในไฟล์ types
    advisor: null,
  }),
  actions: { // มี action เดียวชื่อ setStore สำหรับอัปเดตข้อมูลอาจารย์
    setStore(advisor: Advisor): void { // รับ parameter เป็น object Advisor และกำหนดให้กับ this.advisor
      this.advisor = advisor;
    },
  },
});
