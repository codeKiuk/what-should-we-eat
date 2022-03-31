<template>
  <header>
    <button type="text">메뉴 리스트 가져오기</button>
    <button type="text" @click="getGroups">그룹 리스트 가져오기</button>
  </header>
  <GroupList groups="this.$store.GroupStore.groups" />
  <MenuList />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GroupList from "./group-list/index.vue";
import MenuList from "./menu-list/index.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { GroupList, MenuList },
  methods: {
    getGroups() {
      this.$store.dispatch("getGroupsAsync");
    },
  },
});
</script>
