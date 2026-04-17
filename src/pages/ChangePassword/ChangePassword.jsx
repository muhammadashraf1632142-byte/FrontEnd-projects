import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 const navigate = useNavigate();
  async function changePass(e) {
    e.preventDefault();

    const password = e.target.currentPassword.value.trim();
    const newPassword = e.target.newPassword.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();
    const token = localStorage.getItem("token");

    setError("");
    setSuccess("");

    if (!password || !newPassword || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (!token) {
      setError("You are not logged in!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    if (password === newPassword) {
      setError("New password must be different from current password!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/change-password`,
        {
          password,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Change password response:", response.data);

      const returnedToken =
        response.data?.data?.token || response.data?.token;

      if (returnedToken) {
        localStorage.setItem("token", returnedToken);
      }

      setSuccess("Password changed successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error changing password:", error);
      console.error("Status:", error?.response?.status);
      console.error("Response data:", error?.response?.data);

      setError(
        error?.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
      navigate("/posts");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center p-16">
        <span className="bg-linear-to-r from-violet-700 to-purple-500 bg-clip-text p-1.5 text-4xl font-bold text-transparent">
          Change Password from here
        </span>
      </div>

      <form
        className="container mx-auto flex w-4xl flex-col gap-4"
        onSubmit={changePass}
      >
        <label htmlFor="currentPassword" className="text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="newPassword" className="text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="confirmPassword" className="text-gray-700">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="h-10 cursor-pointer rounded-lg bg-linear-to-r from-violet-700 to-purple-500 px-4 text-white disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}
      </form>
    </>
  );
}