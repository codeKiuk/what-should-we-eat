<template>
  <div class="container">
    <ul class="group-container">
      <li class="group-item" v-for="group in groups" :key="group.id">
        <img
          class="menu-image"
          :src="require(`@/assets/menus/images/${group.menu.imgSrc}.png`)"
        />
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
              group.createdAt.toMillis() + 60000 * 20 >
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
  </div>
</template>

<script>
import { Timestamp } from "@firebase/firestore";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      timestamp: Timestamp,
    };
  },
  props: ["groups"],
  name: "GroupList",
});
</script>

<style lang="scss" scoped>
@import "@/styles/color.scss";

.container {
  display: flex;
  flex-direction: column;
  align-items: center;

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

    &:hover {
      cursor: pointer;
    }
  }

  .member-container {
    display: flex;
    flex-direction: row;
    align-items: center;

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
      padding: 1rem 0;
    }

    .detail {
      font-weight: bold;
      @include mainGreenFont;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
