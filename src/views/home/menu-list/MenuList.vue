<template>
  <div class="container">
    <ul class="menu-container">
      <li class="menu-item" v-for="menu in menus" :key="menu.id">
        <img
          class="menu-image"
          :src="require(`@/assets/menus/images/${menu.imgSrc}.png`)"
        />

        <span class="menu-name">
          {{ menu.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["menus"],
  name: "MenuList",
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
</style>
