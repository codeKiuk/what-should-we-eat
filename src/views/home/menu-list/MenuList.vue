<template>
  <div class="container">
    <ul class="menu-container">
      <li
        class="menu-item"
        v-for="menu in menus"
        :key="menu.id"
        :id="menu.id"
        @click="setIsModalOpen($event, true, menu.id)"
      >
        <img
          class="menu-image"
          :src="require(`@/assets/menus/images/${menu.imgSrc}.png`)"
        />

        <span class="menu-name">
          {{ menu.name }}
        </span>
      </li>
    </ul>

    <AddMenuBtn />

    <Modal v-if="isModalOpen">
      <template v-slot:header>
        <span> 새로운 그룹을 생성합니다! 🎉 </span>
      </template>
      <template v-slot:body>
        <span>
          <span class="menu-name-detail detail">
            {{ clickedMenu.name }}
          </span>
          메뉴를 선택하셨어요!</span
        >
      </template>
      <template v-slot:footer-yes-button>
        <button type="text" @click="createGroup">네!</button>
      </template>
      <template v-slot:footer-close-button>
        <button type="text" @click="closeModal">다음에 만들게요</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import AddMenuBtn from "@/views/home/menu-list/components/AddMenuBtn.vue";
import { Timestamp } from "@firebase/firestore";
import { ListType, TListType } from "../types";
import { IMenu } from "@/app/menu/types";
import { useStore } from "vuex";
import useModal from "@/hooks/useModal";
import { computed, defineEmits, defineProps, reactive, toRefs } from "vue";

const store = useStore();
const { isModalOpen, closeModal } = useModal();

const props = defineProps<{
  menus: IMenu[];
}>();

const emits = defineEmits<{
  (e: "setListType", event: TListType): void;
}>();

const { menus } = toRefs(props);

const state = reactive({
  clickedMenuId: "",
});

function setIsModalOpen(event: Event, isOpen: boolean, menuId: string) {
  state.clickedMenuId = menuId;
  isModalOpen.value = isOpen;
}

function createGroup() {
  const currentUser = store.getters["UserStore/getCurrentUser"];
  const currentUserId = currentUser.uid;

  const newGroup = {
    createdAt: Timestamp.now(),
    menu: state.clickedMenuId,
    users: [currentUserId],
    lead: currentUserId,
  };
  store.dispatch("GroupStore/createGroupAsync", newGroup);
  isModalOpen.value = false;
  emits("setListType", ListType.Groups);
}

const clickedMenu = computed(() => {
  return menus.value.find((menu: IMenu) => menu.id === state.clickedMenuId);
});
</script>

<style lang="scss" scoped>
@import "@/styles/color.scss";
@import "@/styles/layout.scss";
@import "@/styles/button.scss";

.container {
  @include column-center;

  width: 100vw;
  margin: auto;
}

.menu-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  margin: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 1px solid whitesmoke;
    border-radius: 10px;
    box-shadow: whitesmoke 1px 2px 1px 0px;

    width: 250px;
    height: 230px;

    padding: 0 10px 10px 10px;
    margin: 1rem;

    transition: 200ms ease-in-out;

    &:hover {
      transform: translateY(-10px);
    }
  }

  .menu-image {
    border-radius: 10px 10px 0 0;
    width: calc(100% + 20px);
    height: 190px;

    &:hover {
      cursor: pointer;
    }
  }

  .menu-name {
    max-width: 200px;
    margin-top: 1rem;
  }
}

button {
  @include button;
}

.menu-name-detail {
  @include mainGreenFont;
  font-weight: bold;
}
</style>
