import { Store } from "@/app/store.ts"; // path to store file

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
