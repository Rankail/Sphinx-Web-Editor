<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const route = useRoute();

</script>

<template>
  <Navbar v-if="route.name != 'Editor'"/>

  <RouterView />
</template>
