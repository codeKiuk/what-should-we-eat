<template>
  <div class="container">
    <ul class="group-container">
      <li
        class="group-item"
        v-for="group in groups"
        :key="group.id"
        @click="setIsModalOpen($event, true, group.id)"
      >
        <img class="menu-image" :src="group.menu.imgSrc" />
        <span class="group-metadata-container">
          <span class="group-name">
            <span class="group-name-detail detail"> {{ group.menu.name }}</span>
            같이 먹어요!
          </span>

          <ul class="member-container" v-if="group.users.length < 3">
            <li
              class="memeber-item"
              v-for="user in group.users"
              :key="user.uid"
            >
              <span class="member-detail detail">{{ user.name }}님</span>
            </li>
            <span class="">도 같이 먹어요.</span>
          </ul>

          <ul class="member-container" v-else>
            <span class="">
              <span class="detail">클릭</span>해서 같이 먹을 사람이 누군지
              확인해요!</span
            >
          </ul>

          <span
            class="timestamp"
            v-if="
              group.createdAt.toMillis() + TWENTY_MIN_BY_MS >
              timestamp.now().toMillis()
            "
          >
            마감
            <span class="timestamp-detail detail">
              {{
                20 -
                parseInt(
                  timestamp.fromMillis(
                    timestamp.now().toMillis() - group.createdAt.toMillis()
                  ).seconds / 60
                )
              }}

              분
            </span>
            전이에요!
          </span>
          <span class="timestamp" v-else
            >파티가 만들어진 지 20분이 지나 마감됐어요!</span
          >
        </span>
      </li>
    </ul>

    <Modal v-show="isModalOpen && !isParticipatedUser">
      <template v-slot:header>
        <span> 파티에 참여합니다! 🎉 </span>
      </template>
      <template v-slot:body>
        <ul>
          <li
            class="group-detail detail"
            v-for="user in participatedUsers"
            :key="user.id"
          >
            {{ user.name }} 님
          </li>
          {{
            participatedUsers?.length
          }}
          명과 함께 먹을 수 있어요!
        </ul>
      </template>
      <template v-slot:footer-yes-button>
        <button type="text" @click="participateInGroup">네!</button>
      </template>
      <template v-slot:footer-close-button>
        <button type="text" @click="closeModal">다음에 참여할게요</button>
      </template>
    </Modal>

    <Modal v-show="isModalOpen && isParticipatedUser">
      <template v-slot:header>
        <span> 파티에 이미 참여하셨어요! 🎉 </span>
      </template>
      <template v-slot:body>
        <span class="share-link-text" @click="shareLink">
          파티 링크를 공유할까요?
        </span>
      </template>
      <template v-slot:footer-yes-button>
        <button type="text" @click="shareLink">네!</button>
      </template>
      <template v-slot:footer-close-button>
        <button type="text" @click="closeModal">다음에 공유할게요</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Timestamp } from "@firebase/firestore";
import { computed, defineProps, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import Modal from "@/components/Modal.vue";
import { IGroupJoin } from "@/app/group/types";
import { TWENTY_MIN_BY_MS } from "@/assets/constants/constants";
import useModal from "@/hooks/useModal";
import { useRouter } from "vue-router";
import { ListType, TListType } from "../types";

const store = useStore();
const router = useRouter();
const { isModalOpen, closeModal, openModal } = useModal();
const timestamp = Timestamp;

const props = defineProps<{
  groups: IGroupJoin[];
}>();

const state = reactive({
  clickedGroupId: router.currentRoute.value.params.id || "",
  TWENTY_MIN_BY_MS: TWENTY_MIN_BY_MS,
});

onMounted(() => {
  const isRoutedByGroupId = router.currentRoute.value.params.id ? true : false;

  if (!isRoutedByGroupId) return;
  openModal();
});

const { groups } = toRefs(props);

function participateInGroup() {
  closeModal();

  if (clickedGroup.value?.lead.uid === currentUser.value.uid) {
    alert("이미 참여하셨어요!");
    return;
  }
  if (
    clickedGroup.value &&
    clickedGroup.value.createdAt.toMillis() + TWENTY_MIN_BY_MS <
      timestamp.now().toMillis()
  ) {
    alert("마감됐습니다.");
    return;
  }

  store.dispatch("GroupStore/participateInGroupAsync", state.clickedGroupId);
}

function setIsModalOpen(event: Event, isOpen: boolean, groupId: string) {
  isModalOpen.value = isOpen;
  state.clickedGroupId = groupId;
}

async function shareLink() {
  await navigator.clipboard.writeText(
    `https://what-should-we-eat.vercel.app/#/${state.clickedGroupId}`
  );

  alert("링크를 클립보드에 저장했어요!");
  closeModal();
}

const participatedUsers = computed(() => {
  return groups.value.find(
    (group: IGroupJoin) => group.id === state.clickedGroupId
  )?.users;
});

const clickedGroup = computed(() => {
  return groups.value.find(
    (group: IGroupJoin) => group.id === state.clickedGroupId
  );
});

const currentUser = computed(() => store.getters["UserStore/getCurrentUser"]);

const isParticipatedUser = computed(() =>
  clickedGroup.value?.users
    .map((user) => user.uid)
    .includes(currentUser.value.uid)
);
</script>

<style lang="scss" scoped>
@import "@/styles/color.scss";
@import "@/styles/layout.scss";
@import "@/styles/button.scss";

.container {
  @include column-center;

  width: 100vw;
  margin: auto;

  .group-container {
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
  }

  .group-item {
    @include column-center;
    justify-content: center;

    border: 1px solid whitesmoke;
    border-radius: 10px;
    box-shadow: whitesmoke 1px 2px 1px 0px;

    width: 280px;
    height: 300px;

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
    max-height: 220px;

    &:hover {
      cursor: pointer;
    }
  }

  .member-container {
    @include row-center;
    padding: 1rem 0;

    .member-item {
    }

    .member-detail {
      margin: 0 0 0 2px;
    }
  }

  .group-metadata-container {
    flex-direction: column;
    align-items: flex-start;

    width: 100%;
    margin-top: 1rem;

    .group-name {
      align-self: center;
      font-weight: bold;
    }

    .timestamp {
    }
  }

  .detail {
    @include mainGreenFont;
    font-weight: bold;
    padding: 10px 0;

    &:hover {
      cursor: pointer;
    }
  }

  .share-link-text {
    font-weight: bold;
    color: $mainGreen;

    &:hover {
      cursor: pointer;
    }
  }

  button {
    @include button;
  }
}
</style>
