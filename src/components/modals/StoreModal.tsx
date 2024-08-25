"use client";

import { useModal } from "@/hooks/use-modal";
import { Modal } from "@/components/shared/Modal";

export const StoreModal = () => {
  const storeModal = useModal();
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      {" "}
      Future Create Store Form
    </Modal>
  );
};
