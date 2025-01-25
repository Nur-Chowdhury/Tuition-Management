import { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from '../../components/login and reg/Navbar';
import Footer from '../../components/login and reg/Footer';
import { register } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';



export default function GuardianReg() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pass: "",
        rePass: "",
    });

    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    const {error, loading, successMessage} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const togglePass = () => {
        setShowPass(!showPass);
    };

    const toggleRePass = () => {
        setShowRePass(!showRePass); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.name||!formData.email||!formData.pass){
            toast.error('Please fill out the required fields.');
            return;
        }
        if (formData.pass !== formData.rePass) {
            toast.error("Passwords do not match!");
            return;
        }
        formData.userType="guardian";
        formData.inst="";
        formData.department="";
        dispatch(register(formData.userType, formData.name, formData.email, formData.inst, formData.department, formData.pass, navigate));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 py-32">
                <form
                    onSubmit={handleSubmit}
                    className="shadow-md rounded-md p-6 w-full max-w-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    encType="multipart/form-data"
                >
                    <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
                        Sign Up
                    </h3>

                    {/* Full Name */}
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength="50"
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-gray-700"
                    />

                    {/* Email */}
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                        required
                        maxLength="50"
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-gray-700"
                    />

                    {/* Password */}
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                        Enter Your Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            name="pass"
                            value={formData.pass}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            maxLength="20"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-gray-700"
                        />
                        <button
                            type="button"
                            onClick={togglePass}
                            className="absolute top-[36%] right-4 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>

                    {/* Re-enter Password */}
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                        Re-enter Your Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showRePass ? "text" : "password"}
                            name="rePass"
                            value={formData.rePass}
                            onChange={handleChange}
                            placeholder="Re-type password"
                            required
                            maxLength="20"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-gray-700"
                        />
                        <button
                            type="button"
                            onClick={toggleRePass}
                            className="absolute top-[36%] right-4 transform -translate-y-1/2 text-gray-500"
                        >
                            {showRePass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition duration-200"
                    >
                        {loading ? "Loading...":"Sign Up"}
                    </button>

                    {/* Link to Login */}
                    <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-purple-600 hover:underline font-medium"
                        >
                            Login
                        </a>
                    </p>
                </form>
            </main>

            <Footer />
        </div>
    );
}
