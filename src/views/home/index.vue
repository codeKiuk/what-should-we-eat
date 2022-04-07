<template>
  <header>
    <button type="text" @click="getMenus">메뉴</button>
    <button type="text" @click="getGroups">점심 파티!</button>
  </header>
  <GroupList v-show="listType === 'Groups'" :groups="groupsJoin" />
  <MenuList
    v-show="listType === 'Menus'"
    :menus="menus"
    @setListType="setListType($event)"
  />
</template>

<script lang="ts">
import { IGroup } from "@/app/group/types";
import { IMenu } from "@/app/menu/types";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import GroupList from "./group-list/GroupList.vue";
import MenuList from "./menu-list/MenuList.vue";
import { ListType, TListType } from "./types";

export default defineComponent({
  mounted() {
    this.getUsersAsync();
    this.getGroupsAsync();
    this.getMenusAsync();
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
    ...mapGetters({
      groupsJoin: "GroupStore/getGroupsJoin",
      menus: "MenuStore/getMenus",
      currentUser: "UserStore/getCurrentUser",
    }),
  },
  methods: {
    ...mapActions({
      getUsersAsync: "UserStore/getUsersAsync",
      getGroupsAsync: "GroupStore/getGroupsAsync",
      getMenusAsync: "MenuStore/getMenusAsync",
      createGroupAsync: "GroupStore/createGroupAsync",
      participateInGroupAsync: "GroupStore/participateInGroupAsync",
    }),
    getGroups() {
      this.getGroupsAsync();
      this.setListType(ListType.Groups);
    },
    getMenus() {
      this.getMenusAsync();
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
