import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { IoMdAddCircle } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDelete, MdOutlineRadioButtonUnchecked, MdEdit, MdCheck, MdClose } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BASE_URL } from "./lib/config";

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [filterTask, setFilterTask] = useState("ALL");
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tasks`);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };

    const addTask = async () => {
        if (task.trim() === "") return;
        if (task.length > 150) {
            toast.warning("Maximum 150 characters allowed!");
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: task })
            });
            if (!response.ok) throw new Error("Failed to add task");
            toast.success("Task Added");
            setTask("");
            fetchTasks();
        } catch (error) {
            console.log(error);
            toast.error("Couldn't add task.");
        }
    };

    const deleteTask = async (id) => {
        const result = await Swal.fire({
            title: "Delete Task?",
            text: "This action cannot be undone.",
            icon: "warning",
            showDenyButton: true,

  confirmButtonText: 'Yes',
  denyButtonText: 'No',
        });

        if (result.isConfirmed) {
            try {
                await fetch(`${BASE_URL}/tasks/${id}`, {
                    method: "DELETE",
                });
                fetchTasks();
                Swal.fire("Task deleted!", { icon: "success" });
            } catch (error) {
                console.log(error);
            }
        }
    };

   const statusCheck = async (id) => {
    const currentTask = tasks.find(item => item.id === id);
    if (!currentTask) return;
    const newStatus =
        currentTask.status === "pending"
            ? "completed"
            : "pending";
    try {
        await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: newStatus
            })
        });
        fetchTasks();
    }
    catch (error) {
        console.log(error);
    }
};

    const startEditing = (taskItem) => {
        setEditId(taskItem.id);
        setEditText(taskItem.text);
    };

  const saveTask = async () => {

    if (editText.trim() === "") {
        alert("Task cannot be empty");
        return;
    }
    if (editText.length > 150) {
        toast.warning("Max Character limit upto 150");
        return;
    }
    try {
        await fetch(`${BASE_URL}/tasks/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: editText
            })
        });
        setEditId(null);
        setEditText("");
        fetchTasks();
    }
    catch (error) {
      console.log(error);

    }

};
    const cancelEdit = () => {
        setEditId(null);
        setEditText("");
    };

    const filteredTasks = tasks.filter((item) => {
        if (filterTask === "Completed") return item.status === "completed";
        if (filterTask === "Pending") return item.status === "pending";
        return true;
    });

    return (
        <>
            <div className="video">
                <video autoPlay loop muted className="max-w-screen min-h-screen h-[calc(100dvh-2px)] w-full object-cover -z-2">
                    <source src="assets/video1.mp4" type="video/mp4" />
                </video>
            </div>

            <section className="absolute top-14.5 z-10 flex flex-col w-full gap-12.5 mx-auto">
                <div className="bg-[#D9D9D980] backdrop-blur-[32px] rounded-[85px] border border-[#FFFFFFB2] max-w-109 h-23.25 w-full mx-auto">
                    <div
                        style={{ fontFamily: "Baloo, cursive" }}
                        className="max-w-73.25 w-full text-center mx-auto py-3"
                    >
                        <p className="text-[64px] bg-linear-to-r from-[#C4564D] to-[#864B49] bg-clip-text text-transparent leading-[100%]">
                            To-Do List
                        </p>
                    </div>
                </div>


                <div className="flex items-center justify-center gap-12.5">

                    <input
                        id="taskInput"
                        autoFocus
                        className="max-w-155.5 w-full text-[40px] pt-1.25 px-2 bg-[#C4BABA5E] border border-[#FFFFFFB2] backdrop-blur-[32px]"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                addTask();
                            }
                        }}
                    />
                    <button onClick={addTask}>
                        <IoMdAddCircle className="text-7xl cursor-pointer text-white" />
                    </button>
                    <select id="filterSelect" value={filterTask} onChange={(e) => setFilterTask(e.target.value)}
                        className=" max-w-62.5 w-full appearance-none  bg-[#C4BABA5E] backdrop-blur-[32px] border-[#FFFFFFB2] border rounded-xs p-6 text-[24px] text-white font-normal">
                        <option className=" text-black ">ALL</option>
                        <option className=" text-black">Completed</option>
                        <option className=" text-black">Pending</option>
                    </select>
                    <div className="pointer-events-none absolute ml-247.5 flex items-center">
                        <RiArrowDropDownLine className="text-5xl text-white" />
                    </div>
                </div>

                <div id="taskList" className="flex flex-col  gap-5  h-[calc(100vh-380px)] overflow-y-auto   scrollbar-thin  ">
                    {filteredTasks.map((item) => (
                        <div key={item.id} className="bg-[#C4BABA40]  flex flex-wrap border max-w-183.75 w-full mx-auto rounded-[85px] justify-between   items-center px-8.25 py-3 ">

                            {editId === item.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    length={150}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="text-white text-[40px] bg-transparent border-b border-white outline-none max-w-110 w-full"
                                    autoFocus />
                            ) : (
                                <p
                                    className={`text-white text-[40px] max-w-110 break-all  scrollbar-none  w-full ${item.status === "completed" ? "line-through" : ""
                                        }`}>
                                    {item.text}
                                </p>
                            )}

                            <div className=" flex gap-5 ">

                                {editId === item.id ? (
                                    <>
                                        <button onClick={saveTask}>
                                            <MdCheck className="text-5xl text-white cursor-pointer" />
                                        </button>

                                        <button onClick={cancelEdit}>
                                            <MdClose className="text-5xl text-white cursor-pointer" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => statusCheck(item.id)} >
                                            {item.status === "pending" ? (
                                                <MdOutlineRadioButtonUnchecked className="text-5xl text-white cursor-pointer" />
                                            ) : (
                                                <FaCheckCircle className="text-5xl text-white cursor-pointer" />
                                            )}

                                        </button>
                                        {item.status === "pending" && (
                                            <button onClick={() => startEditing(item)}>
                                                <MdEdit className="text-5xl text-white cursor-pointer" />
                                            </button>
                                        )}
                                        <button onClick={() => deleteTask(item.id)}>
                                            <MdDelete className="text-5xl text-white cursor-pointer" />
                                        </button>

                                    </>
                                )}


                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="flex  absolute bottom-6 right-27.75  ">
                <img src="assets/img5.png" alt="logo" className="max-w-10.75 h-10.75 w-full " />
                <p className="text-[32px] font-normal underline text-white">POMODORO</p>
                <img src="assets/img6.png" alt="logo" className="max-w-16.25 w-full  bottom-4.5" />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                theme="dark"
            />
        </>
    );
}

export default App;


