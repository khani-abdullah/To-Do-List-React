import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../lib/config";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/auth/signup`, formData);

            localStorage.setItem("token",
                response.data.token
            ); 

            alert("Signup Successful");

            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Something went wrong"
            );
        }
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
            style={{
                background: "url('/assets/video1.mp4')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 backdrop-blur-md bg-black/40"></div>

            <div className="relative z-10 w-100 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-white text-center mb-8">
                    Create Account
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-white/80 outline-none"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-white/80 outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-white/80 outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 duration-300 text-white py-3 rounded-xl font-semibold"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-white mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-yellow-300 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;