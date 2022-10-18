<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const num = '5';
console.log(num);

export default defineComponent({
  name: 'App',

  data() {
    return {
      //
    };
  },
});
</script>
