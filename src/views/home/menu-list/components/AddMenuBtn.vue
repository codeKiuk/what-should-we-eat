<template>
  <div class="container">
    <button class="add-menu" @click="openModal">땡기는 메뉴가 없다면?</button>

    <Modal v-if="isModalOpen">
      <template v-slot:header>
        <span> 땡기는 메뉴를 추가해주세요! 🥩 </span>
      </template>

      <template v-slot:body>
        <div class="slot-body">
          <input
            type="text"
            class="input-menu-name"
            id="menu-name"
            placeholder="새로 추가하고싶은 메뉴 이름을 써주세요!"
            v-model="state.menuName"
          />

          <label
            for="menu-image"
            class="label-menu-image"
            @dragenter.prevent=""
            @dragover.prevent=""
            @drop.prevent="uploadImage"
          >
            <span>메뉴 이미지를 업로드해주세요!</span>

            <span class="uploaded-file"> {{ state.file.name }}</span>

            <input
              type="file"
              accept="image/*"
              class="input-menu-image"
              id="menu-image"
              @change="uploadImage"
            />
          </label>
        </div>
      </template>

      <template v-slot:footer-yes-button>
        <button type="text" @click="createMenu">완료!</button>
      </template>
      <template v-slot:footer-close-button>
        <button type="text" @click="closeModal">다음에 만들게요</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import useModal from "@/hooks/useModal";
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";

const store = useStore();
const { isModalOpen, openModal, closeModal } = useModal();

const state = reactive({
  menuName: "",
  file: {
    lastModified: -1,
    name: "",
    webkitRelativePath: "",
  } as File,
});

const createMenu = () => {
  if (!state.menuName) {
    alert("메뉴 이름을 적어주세요!");
  } else if (!state.file.name) {
    alert("메뉴 이미지를 넣어주세요!");
  }

  store.dispatch("MenuStore/createMenuAsync", {
    menuName: state.menuName,
    file: state.file,
  });

  closeModal();
  return;
};

const uploadImage = async (event: Event) => {
  const uploadedFiles =
    ((event.target as HTMLInputElement).files as FileList) ||
    (event as DragEvent).dataTransfer?.files;

  if (uploadedFiles.length > 1) {
    alert("하나의 이미지만 업로드해주세요!");
    return;
  }

  state.file = uploadedFiles[0];
};
</script>

<style lang="scss" scoped>
@import "@/styles/button.scss";
@import "@/styles/layout.scss";
@import "@/styles/input.scss";
@import "@/styles/color.scss";

.container {
  @include column-center;
  justify-content: center;

  width: 100%;
  font-weight: bold;

  .slot-body {
    @include column-center;
    justify-content: flex-start;
  }

  label {
    font-size: 11px;
  }
  .label-menu-image {
    @include input;

    &:hover {
      cursor: pointer;
    }
  }

  .uploaded-file {
    display: block;
    color: $mainGreen;
  }

  button {
    @include button;
  }

  .add-menu {
    width: 200px;
    height: 40px;
  }

  input {
    @include input;

    margin: 10px 0;
  }

  .input-menu-image {
    display: none;
  }
}
</style>
