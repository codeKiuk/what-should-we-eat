<template>
  <header>
    <button type="text" @click="getMenus">메뉴 리스트 가져오기</button>
    <button type="text" @click="getGroups">그룹 리스트 가져오기</button>
  </header>
  <GroupList :groups="groups" />
  <MenuList :menus="menus" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import GroupList from "./group-list/GroupList.vue";
import MenuList from "./menu-list/MenuList.vue";

export default defineComponent({
  async setup() {
    const store = useStore();
    await Promise.all([
      store.dispatch("GroupStore/getGroupsAsync"),
      store.dispatch("MenuStore/getMenusAsync"),
    ]);

    return {
      groups: store.getters["GroupStore/getGroups"],
      menus: store.getters["MenuStore/getMenus"],
    };
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

<style lang="scss" scoped>
button {
  all: unset;

  padding: 10px;
  margin: 0 10px;

  border: 1px solid whitesmoke;
  border-radius: 10px;
  box-shadow: whitesmoke 1px 2px 1px 0px;
  min-width: 100px;
  min-height: 30px;

  &:hover {
    cursor: pointer;
  }
}
</style>
