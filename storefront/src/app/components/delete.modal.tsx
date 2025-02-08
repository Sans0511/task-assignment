import React, { useEffect, useRef } from "react";

interface ModalProps {
  isDeleteModalOpen: boolean;
  onDeleteModalClose: () => void;
  onDeleteSubmit: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({
  isDeleteModalOpen,
  onDeleteModalClose,
  onDeleteSubmit,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isDeleteModalOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (!isDeleteModalOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [isDeleteModalOpen]);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">Are you sure you want to delete this item?</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={onDeleteSubmit}>
            Delete
          </button>
          <button className="btn" onClick={onDeleteModalClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
