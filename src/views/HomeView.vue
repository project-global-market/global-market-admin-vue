<template>
  <h1>Home page</h1>
  <p>Hello, {{ user?.username }}</p>
  <button @click="logout">Logout</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const Router = useRouter();

const userStore = useUserStore();
const user = computed(() => userStore.getUser);

const logout = () => {
  userStore.logout();
  Router.push({ name: 'login' });
};
</script>
