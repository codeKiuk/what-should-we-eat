<template>
  <header>
    <button type="text" @click="getMenus">메뉴</button>
    <button type="text" @click="getGroups">점심 파티!</button>
  </header>
  <GroupList v-if="listType === 'Groups'" :groups="groupsJoin" />
  <MenuList v-else :menus="menus" @setListType="setListType($event)" />
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import GroupList from "./group-list/GroupList.vue";
import MenuList from "./menu-list/MenuList.vue";
import { ListType, TListType } from "./types";
import { firebaseAuth } from "@/main";
import { IUser } from "@/app/user/types";

const store = useStore();

const state = reactive<{ listType: TListType }>({
  listType: ListType.Menus,
});

onMounted(() => {
  if (firebaseAuth.currentUser && !currentUser.value.uid) {
    setCurrentUser({
      name: firebaseAuth.currentUser.displayName as string,
      uid: firebaseAuth.currentUser.uid,
      email: firebaseAuth.currentUser.email as string,
    });
  }

  getUsersAsync();
  getGroupsAsync();
  getMenusAsync();
});

const groupsJoin = computed(() => store.getters["GroupStore/getGroupsJoin"]);
const menus = computed(() => store.getters["MenuStore/getMenus"]);
const currentUser = computed(() => store.getters["UserStore/getCurrentUser"]);

const setCurrentUser = (currentUser: IUser) =>
  store.commit("UserStore/setCurrentUser", currentUser);

const getUsersAsync = () => store.dispatch("UserStore/getUsersAsync");
const getGroupsAsync = () => store.dispatch("GroupStore/getGroupsAsync");
const getMenusAsync = () => store.dispatch("MenuStore/getMenusAsync");
const createGroupAsync = () => store.dispatch("GroupStore/createGroupAsync");
const participateInGroupAsync = () =>
  store.dispatch("GroupStore/participateInGroupAsync");

function getGroups() {
  getGroupsAsync();
  setListType(ListType.Groups);
}

function getMenus() {
  getMenusAsync();
  setListType(ListType.Menus);
}

function setListType(type: TListType) {
  state.listType = type;
}
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
