<template>
  <ul>
    <li v-for="menu in menus" :key="menu.id">
      {{ menu.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["menus"],
  name: "MenuList",
});
</script>
