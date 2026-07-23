import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import Todo from "./pages/toDo";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/login" replace />;

}

function App() {

    return (

        <>
            <div className="video fixed inset-0 -z-10">
                <video autoPlay loop muted className="w-full h-full object-cover">
                    <source src="/assets/video1.mp4" type="video/mp4" />
                </video>
            </div>

            <Routes>

           <Route
    path="/login"
    element={
        localStorage.getItem("token")
            ? <Navigate to="/" replace />
            : <Login />
    }
/>

         <Route
    path="/signup"
    element={
        localStorage.getItem("token")
            ? <Navigate to="/" replace />
            : <Signup />
    }
/>

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Todo />
                    </ProtectedRoute>
                }
            />


            </Routes>

        </>

    );

}

export default App;