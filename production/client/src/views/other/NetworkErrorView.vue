<template>
  <!-- NetworkErrorView page content -->
  <div class="flex h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="text-9xl font-extrabold text-gray-600 mb-4">500</h1>
      <h2 class="text-2xl font-bold text-gray-600 mb-2">Network Error</h2>
      <p class="text-lg text-gray-600 mb-4">
        Sorry, there's a problem with our network. Please try again later.
      </p>
      <button class="btn btn-primary" @click="$router.go(-1)">Try Again</button>
    </div>
  </div>
</template>
