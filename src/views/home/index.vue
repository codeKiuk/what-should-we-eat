<template>
  <header>
    <button type="text" @click="getMenus">메뉴 리스트 가져오기</button>
    <button type="text" @click="getGroups">그룹 리스트 가져오기</button>
  </header>
  <GroupList :groups="this.$store.GroupStore.groups" />
  <MenuList :menus="this.$store.MenuStore.menus" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import GroupList from "./group-list/index.vue";
import MenuList from "./menu-list/index.vue";

export default defineComponent({
  async setup() {
    const store = useStore();
    store.dispatch("GroupStore/getGroupsAsync");
    store.dispatch("MenuStore/getMenusAsync");
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { GroupList, MenuList },
  methods: {
    getGroups() {
      this.$store.dispatch("GroupStore/getGroupsAsync");
    },
    getMenus() {
      this.$store.dispatch("MenuStore/getMenusAsync");
    },
  },
});
</script>
