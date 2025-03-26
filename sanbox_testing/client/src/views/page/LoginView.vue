<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCirclePlay,
  faRightToBracket,
  faEnvelope,
  faKey,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
//เพิ่มเฉพาะไอคอนที่ใช้ในหน้านี้
library.add(faCirclePlay, faRightToBracket, faEnvelope, faKey, faComment);
</script>
<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div
      class="card card-xl card-border border-base-300 overflow-hidden m-auto sm:w-1/3 md:w-4/12 lg:w-1/4 max-w-lg"
    >
      <div class="border-base-300 border-b border-dashed">
        <div class="flex items-center gap-2 p-4">
          <div class="grow">
            <div class="flex items-center gap-2 text-sm font-medium">
              <font-awesome-icon :icon="['fas', 'comments']" />
              เข้าสู่ระบบ ApptCamt
            </div>
          </div>
        </div>
      </div>
      <div class="card-body gap-4">
        <form action="">
          <div class="flex flex-col gap-1 mb-3">
            <label class="input input-border flex max-w-none items-center gap-2"
              ><font-awesome-icon :icon="['fas', 'envelope']" />
              <input
                type="text"
                class="grow text-base"
                placeholder="Email"
                autocomplete="off"
            /></label>
          </div>
          <div class="flex flex-col gap-1 mb-3">
            <label class="input input-border flex max-w-none items-center gap-2"
              ><font-awesome-icon :icon="['fas', 'key']" />
              <input
                type="password"
                class="grow text-base"
                placeholder="password"
                autocomplete="current-password"
            /></label>
            <!-- <span
              class="text-base-content/60 flex items-center gap-2 px-1 text-[0.6875rem]"
              >
              <span class="status status-error inline-block"></span> Password
              must be 8+ characters</span
            > -->
          </div>
          <div class="card-actions items-center gap-6">
            <button type="button" class="btn btn-primary btn-block">
              <font-awesome-icon :icon="['fas', 'right-to-bracket']" /> Login
            </button>
            <div class="relative w-full">
              <button class="link text-sm absolute right-0">สมัครสมาชิก</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
