"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import Modal from "./task.modal";

import DeleteModal from "./delete.modal";
import {
  postData,
  getAuthToken,
  getTaskData,
  updateTaskData,
  deleteTaskData,
} from "../apiHandlers/api-functions";

import { TaskTypes } from "@/types/types";

import Cookies from "js-cookie";

export default function TaskTable() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskTypes[]>([]);

  const [tasksProps, setTaskProps] = useState({
    pageNo: 1,
    pageSize: 5,
    totalTasks: 0,
    totalPages: 0,
  });

  const intialFormInput = {
    _id: "",
    taskName: "",
    description: "",
    startDate: "",
    endDate: "",
    totalTasks: 0,
    status: "pending",
  };
  const [inputValues, setInputValues] = useState(intialFormInput);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [method, setMethod] = useState<"Create Task" | "Update Task">(
    "Create Task"
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const taskResponse = await getTaskData(
          searchKeyword,
          tasksProps.pageNo,
          tasksProps.pageSize
        );

        if (!taskResponse) {
          setTasks([]);
          setTaskProps((pre) => ({
            ...pre,
            totalTasks: 0,
            totalPages: 0,
          }));
          return;
        }

        setTasks(taskResponse.tasks);
        setTaskProps((pre) => ({
          ...pre,
          totalTasks: taskResponse.totalTasks,
          totalPages: taskResponse.totalPages,
        }));
      } catch (error: any) {
        setTasks([]);
        setTaskProps((pre) => ({
          ...pre,
          totalTasks: 0,
          totalPages: 0,
        }));
        if (error.message.includes("Invalid or expired access token")) {
          router.push("/login");
        }
      }

      setLoading(false);
    };
    getData();
  }, [tasksProps.pageNo, refreshData]);

  const handleSearchKeywordChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setSearchKeyword(e.target.value);
    setTaskProps((pre) => ({ ...pre, pageNo: 1, pageSize: 5 }));
    setRefreshData(!refreshData);
  };

  const handleSetPageNo = (type: string) => {
    setTaskProps((prevProps) => {
      let newPageNo = prevProps.pageNo;

      if (type === "next" && newPageNo < prevProps.totalPages) {
        newPageNo += 1;
      } else if (type === "previous" && newPageNo > 1) {
        newPageNo -= 1;
      }
      return {
        ...prevProps,
        pageNo: newPageNo,
      };
    });
  };

  const handleCreateTask = () => {
    setMethod("Create Task");
    setModalOpen(true);
  };
  const closeModal = () => {
    setInputValues(intialFormInput);
    setModalOpen(false);
  };
  const formSumit = async (inputData: TaskTypes) => {
    console.log({ inputData });
    setModalOpen(false);

    if (!inputData._id) {
      inputData.totalTasks = tasksProps.totalTasks + 1;
      const creatTask = await postData("/tasks", inputData);
    } else {
      inputData.totalTasks = tasksProps.totalTasks;
      const updateTask = await updateTaskData(inputData, inputData._id);
    }
    setRefreshData(!refreshData);
    setInputValues(intialFormInput);
  };

  const handleUpdate = (item: TaskTypes) => {
    setMethod("Update Task");
    setInputValues((pre) => ({
      ...pre,
      ...item,
    }));
    setModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setInputValues((pre) => ({
      ...pre,
      _id: id,
    }));
    setDeleteModalOpen(true);
  };

  const handleDeleteConform = async () => {
    setDeleteModalOpen(false);
    if (inputValues._id) {
      const deleteTask = await deleteTaskData(inputValues._id);
      setRefreshData(!refreshData);
      setInputValues(intialFormInput);
    }
  };

  const handleLogout = async () => {
    Cookies.remove("accessToken");
    router.push("/login");
  };

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between items-center w-full px-8 py-2 bg-blue-200">
        <h1 className="text-xl font-black ">Task Assignment</h1>
        <button
          className="bg-blue-500 text-white p-2 rounded w-32"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="overflow-x-auto min-h-96 h-auto overflow-y-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-2 font-semibold">Task list</h1>

            <div className="flex items-center ml-auto space-x-4">
              <div className="relative w-64">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  className="bg-slate-200 p-2 text-black border-2 border-blue-200 rounded-sm pl-10 w-full"
                  type="text"
                  placeholder="Search by status...."
                  aria-label="Search task"
                  value={searchKeyword}
                  onChange={handleSearchKeywordChange}
                />
              </div>

              <button
                className="bg-blue-500 text-white p-2 rounded w-32"
                onClick={handleCreateTask}
              >
                Create +
              </button>
            </div>
          </div>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>SL.No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Tasks</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                tasks.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {(tasksProps.pageNo - 1) * tasksProps.pageSize +
                        index +
                        1}
                    </td>
                    <td>{item._id}</td>
                    <td>{item.taskName}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.startDate ? item.startDate.split("T")[0] : "-"}
                    </td>
                    <td>{item.endDate ? item.endDate.split("T")[0] : "-"}</td>
                    <td>{tasksProps.totalTasks}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleUpdate({ ...item, _id: String(item._id) })
                        }
                      >
                        <FaEdit size={20} color="blue" />
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item._id ?? "")}>
                        <FaTrashAlt size={20} color="red" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center py-4">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjusted spacing for pagination buttons */}
      <div className="join grid grid-cols-2 mt-1 gap-5">
        <button
          className="bg-blue-500 text-white p-2 rounded w-32"
          onClick={() => handleSetPageNo("previous")}
        >
          Previous page
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded w-32"
          onClick={() => handleSetPageNo("next")}
        >
          Next page
        </button>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={formSumit}
          buttonState={method}
          fieldInputs={inputValues}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          onDeleteModalClose={handleDeleteModalClose}
          onDeleteSubmit={handleDeleteConform}
        />
      )}
    </div>
  );
}
