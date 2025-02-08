"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { postData } from "../apiHandlers/api-functions";
import Cookies from "js-cookie";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log({ formData });
      const res = await postData("/login", formData);

      if (res.success) {
        Cookies.set("accessToken", res.accessToken, { expires: 1 });
        router.push("/");
      }
    } catch (e: any) {
      setErrorMessage(e?.response?.data?.message || "Login Failed....");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-white">
      <div className="w-[30%] bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button className="w-full bg-blue-500 text-white p-2 rounded-md">
            Login
          </button>
          <div className=" text-red-500 text-center">{errorMessage}</div>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
      <div className="w-[30%] h-[60%] relative">
        <Image
          src="/images/login.jpg"
          alt="Login Illustration"
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default LoginForm;
