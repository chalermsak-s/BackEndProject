<script setup lang="ts">
import { withDefaults } from 'vue'
withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page',
  }
)
</script>
<template>
  <!-- 404 page content -->
  <div class="flex h-screen">
    <div class="m-auto text-center">
      <h1 class="text-9xl font-extrabold secondary">404</h1>
      <h2 class="text-2xl font-bold secondary">Page not found</h2>
      <p class="text-lg secondary">
        Sorry, the {{ resource }} page you're looking for doesn't exist.
      </p>
      <router-link :to="{ name: 'login-view' }" class="btn btn-primary mt-4"
        >Back to the home page</router-link
      >
    </div>
  </div>
</template>
