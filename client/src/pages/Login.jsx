import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/login and reg/Navbar';
import Footer from '../components/login and reg/Footer';
import { login } from "../redux/actions/authActions";
import { toast } from "react-toastify";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", pass: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [err, setErr] = useState(null);

    const {successMessage, error, loading} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData.email, formData.pass, navigate));
    };

    return (
        <div className=" flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="shadow-md rounded-md p-6 w-full max-w-md bg-gray-100 dark:bg-gray-900 py-12 text-gray-900 dark:text-gray-100"
                    encType="multipart/form-data"
                >
                    <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
                        Login
                    </h3>

                    <label className="block mb-2 text-gray-700 dark:text-gray-200">
                        Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        required
                        maxLength="50"
                        className="w-full p-2 mb-4 text-gray-700 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                    />

                    <label className="block mb-2 text-gray-700 dark:text-gray-200">
                        Your Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="pass"
                        value={formData.pass}
                        onChange={handleChange}
                        placeholder="Enter Your Password"
                        required
                        maxLength="20"
                        className="w-full p-2 mb-4 border text-gray-700 border-gray-300 rounded focus:outline-none focus:border-purple-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition duration-200"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                    <p className="mt-4 text-center text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="/register/guardian"
                            className="text-purple-600 hover:underline font-medium"
                        >
                            Sign Up
                        </a>
                    </p>
                    <p className="mt-4 text-center text-gray-600">
                        Are You a Tutor?{" "}
                        <a
                            href="/register/tutor"
                            className="text-purple-600 hover:underline font-medium"
                        >
                            Sign Up
                        </a>
                    </p>
                </form>
            </main>

            <Footer />
        </div>
    )
}
