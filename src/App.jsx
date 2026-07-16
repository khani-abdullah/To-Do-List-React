import { useState, useEffect } from "react";
import swal from 'sweetalert';
import "./App.css";

import { IoMdAddCircle } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDelete, MdOutlineRadioButtonUnchecked, MdEdit } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";


function App() {
    const [task, setTask] = useState("")

    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || []
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const [filterTask, setFilterTask] = useState("ALL")

    const addTask = () => {
        if (task.trim() === "") return;
        const newTask = {
            id: Date.now(), text: task, status: "pending"
        };
        setTasks([...tasks, newTask]);
        setTask("");
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((item) => item.id !== id));
    };


    const statusCheck = (id) => {
        const updateTasks = tasks.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    status:
                        item.status === "pending" ? "completed" : "pending"

                };
            }
            return item;
        });
        setTasks(updateTasks);
    };


    const filteredTasks = tasks.filter((item) => {
        if (filterTask === "Completed") return item.status === "completed";
        if (filterTask === "Pending") return item.status === "pending";
        return true;
    });



    return (
        <>
            <div className="video">
                <video
                    autoPlay
                    loop
                    muted
                    className="max-w-screen min-h-screen h-[calc(100dvh-2px)] w-full object-cover -z-2"
                >
                    <source src="public/assets/video1.mp4" type="video/mp4" />
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
                        <div key={item.id} className="bg-[#C4BABA40]  flex flex-wrap border max-w-183.75 w-full ml-70 rounded-[85px] justify-between   items-center px-8.25 py-3 ">
                            <p className={`text-white text-[40px] max-w-110 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] 
            [::-webkit-scrollbar]:hidden w-full ${item.status === "completed" ? "line-through" : ""}`} >{item.text} </p>

                            <div className=" flex gap-5 ">
                                <button onClick={() => statusCheck(item.id)} >
                                    {item.status === "pending" ? (
                                        <MdOutlineRadioButtonUnchecked className="text-5xl text-white cursor-pointer" />
                                    ) : (
                                        <FaCheckCircle className="text-5xl text-white cursor-pointer" />
                                    )}
                                </button>
                                <button><MdEdit className="text-5xl text-white cursor-pointer" /></button>

                                <button onClick={() => deleteTask(item.id)}>
                                    <MdDelete className="text-5xl text-white cursor-pointer" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="flex  absolute bottom-6 right-27.75  ">
                <img src="public/assets/img5.png" alt="logo" className="max-w-10.75 h-10.75 w-full " />
                <p className="text-[32px] font-normal underline text-white">POMODORO</p>
                <img src="public/assets/img6.png" alt="logo" className="max-w-16.25 w-full  bottom-4.5" />
            </div>
        </>
    )
};


export default App


