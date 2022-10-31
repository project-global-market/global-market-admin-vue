<template>
  <v-app v-if="appReady">
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { getAccessToken } from '@/api/tokens';

const userStore = useUserStore();
const appReady = ref<boolean>(false);

const authToken = getAccessToken();

if (!authToken) {
  appReady.value = true;
}

async function checkUserAuth() {
  if (authToken) {
    await userStore.checkAuth();
    appReady.value = true;
  }
}

checkUserAuth();

// supabase.auth.onAuthStateChange(async (authEvent, session) => {
//   Store.setDbUser(session);

//   if (supabase.auth.user()) {
//     await Store.loadUser();
//     await ChatsListStore.loadChatsList();
//     await MainChatStore.loadChatUsers();
//     await MainChatStore.loadChatMessages();
//   }

//   appReady.value = true;
// });
</script>
