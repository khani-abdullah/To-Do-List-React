import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../lib/config";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/auth/login`,
                {
                    email,
                    password,
                }
            );

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

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
                    Welcome Back
                </h1>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full p-3 rounded-xl bg-white/80 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full p-3 rounded-xl bg-white/80 outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white py-3 rounded-xl font-semibold"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-white mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-yellow-300 font-semibold hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;