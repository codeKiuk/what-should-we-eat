import { Ref, ref } from "vue";

function useModal() {
  const isModalOpen: Ref<boolean> = ref(false);

  function setIsModalOpen(event: Event, isOpen: boolean) {
    isModalOpen.value = isOpen;
  }

  function openModal() {
    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
  }

  return {
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal,
  };
}

export default useModal;
