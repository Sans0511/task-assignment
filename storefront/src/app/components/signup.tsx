"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { postData } from "../apiHandlers/api-functions";

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    state: "",
    gender: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const { confirmPassword, ...formDataToSend } = formData;
      const res = await postData("/register", formDataToSend);

      if (res.success) {
        router.push("/login");
      } else {
        setErrorMessage(
          res.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-gray-500">
        <div className="relative w-full h-screen">
          <Image
            src="/images/registration.jpg"
            alt="Registration Illustration"
            fill
            className="rounded-md shadow-md object-cover"
          />
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white p-6 ">
        <div className="w-[90%] max-w-lg p-8 shadow-xl rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  pattern="^\d{10}$"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex flex-row justify-around">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    className="w-4 h-4"
                    required
                  />
                  <span>Male</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>Female</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-500 bg-red-100 p-2 rounded-md mt-2 text-center">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
