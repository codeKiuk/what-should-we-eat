<template>
  <ul>
    <li v-for="group in groups" :key="group.id">
      {{ group.lead }}와 같이 먹어요!
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["groups"],
  name: "GroupList",
});
</script>
