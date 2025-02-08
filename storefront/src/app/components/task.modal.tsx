import React, { useState } from "react";

import { TaskTypes } from "@/types/types";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inputData: TaskTypes) => void;
  buttonState: string;
  fieldInputs: TaskTypes;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  buttonState,
  fieldInputs,
}) => {
  const [inputData, setInputData] = useState(fieldInputs);
  if (!isOpen) return null;

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box flex flex-col space-y-4">
        <h3 className="font-bold text-lg text-center">{buttonState}</h3>
        <div className="py-4">
          <label className="block">Name</label>
          <input
            className="bg-slate-200 p-2 text-black border-2 border-blue-500 rounded-sm w-full"
            placeholder="Enter your task name here..."
            value={inputData.taskName}
            onChange={handleOnChange}
            required
            name="taskName"
          ></input>
          <label className="block">Description</label>

          <textarea
            className="bg-slate-200 p-2 text-black border-2 border-blue-500 rounded-sm w-full"
            placeholder="Enter your message here..."
            rows={4}
            value={inputData.description}
            onChange={handleOnChange}
            name="description"
            required
          ></textarea>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="startDate" className="block">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={
                inputData.startDate ? inputData.startDate.split("T")[0] : ""
              }
              onChange={handleOnChange}
              className="bg-slate-200 p-2 text-black border-2 border-blue-500 rounded-sm w-full"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={inputData.endDate ? inputData.endDate.split("T")[0] : ""}
              onChange={handleOnChange}
              className="bg-slate-200 p-2 text-black border-2 border-blue-500 rounded-sm w-full "
            />
          </div>
          <div>
            <label htmlFor="status" className="block">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={inputData.status}
              onChange={handleOnChange}
              className="bg-slate-200 p-2 text-black border-2 border-blue-500 rounded-sm w-full"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={() => onSubmit(inputData)}>
            {buttonState}
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
