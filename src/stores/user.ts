import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { server } from '@/api/auth';
import { cleanTokensData, setTokens } from '@/api/tokens';

import type { I_User } from '@/types/User';

export const useUserStore = defineStore('user', () => {
  const user = ref<null | I_User>(null);

  const isAuth = computed(() => user.value !== null);
  const getUser = computed(() => user.value);

  function setUser(newUser: I_User) {
    user.value = newUser;
  }

  async function setUserById(id: number) {
    const user = await server.get(`users/${id}`);
    setUser(user.data);
  }

  async function checkAuth() {
    const response = await server.get('info/me');
    await setUserById(response.data.id);
  }

  async function getNewAccessToken() {
    try {
      const token = await server.post('auth/refresh');

      // setTokens(token.data);
      console.log(token);
    } catch (error: any) {
      console.log(error);
    }
  }

  function logout() {
    cleanTokensData();
    user.value = null;
  }

  return {
    getUser,
    setUserById,
    setUser,
    isAuth,
    checkAuth,
    logout,
    getNewAccessToken,
  };
});
