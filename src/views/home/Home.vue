<template>
  <GroupList />
  <MenuList />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GroupList from "./group-list/GroupList.vue";
import MenuList from "./menu-list/MenuList.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { GroupList, MenuList },
});
</script>
