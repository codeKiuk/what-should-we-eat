<template>
  <header>
    <button type="text" @click="getMenus">메뉴</button>
    <button type="text" @click="getGroups">점심 파티!</button>
  </header>
  <GroupList v-if="listType === 'Groups'" :groups="groupsJoin" />
  <MenuList v-else :menus="menus" v-on:setListType="setListType(type)" />
</template>

<script lang="ts">
import { IGroup } from "@/app/group/types";
import { IMenu } from "@/app/menu/types";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import GroupList from "./group-list/GroupList.vue";
import MenuList from "./menu-list/MenuList.vue";
import { ListType, TListType } from "./types";

export default defineComponent({
  async setup() {
    const store = useStore();
    await store.dispatch("UserStore/getUsersAsync");
    await Promise.all([
      store.dispatch("GroupStore/getGroupsAsync"),
      store.dispatch("MenuStore/getMenusAsync"),
    ]);
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      listType: ListType.Menus,
    } as { listType: TListType; groups: IGroup[]; menus: IMenu[] };
  },
  components: { GroupList, MenuList },
  computed: {
    groupsJoin() {
      return this.$store.getters["GroupStore/getGroupsJoin"];
    },
    menus() {
      return this.$store.getters["MenuStore/getMenus"];
    },
  },
  methods: {
    getGroups() {
      this.$store.dispatch("GroupStore/getGroupsAsync");
      this.setListType(ListType.Groups);
    },
    getMenus() {
      this.$store.dispatch("MenuStore/getMenusAsync");
      this.setListType(ListType.Menus);
    },
    setListType(type: TListType) {
      this.$data.listType = type;
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

  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
}
</style>
