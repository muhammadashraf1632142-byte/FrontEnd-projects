import axios from "axios";
import { Image } from "iconsax-reactjs";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePfp() {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

  async function pfpUpdate() {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", image);

    try {
      setLoading(true);

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
        formData,
        {
          headers: {
            token: token,
          },
        }
      );

      console.log("Upload success:", response.data);
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      console.error("Status:", error?.response?.status);
      console.error("Response data:", error?.response?.data);

      alert(
        error?.response?.data?.message ||
          "Failed to update profile picture"
      );
    } finally {
      setLoading(false);
      navigate("/posts");
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-16">
      <span className="bg-linear-to-r from-violet-700 to-purple-500 bg-clip-text p-1.5 text-4xl font-bold text-transparent">
        Change PFP from here
      </span>

      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="hidden"
      />

      <Image
        size="32"
        color="#ba68c8"
        onClick={() => imageRef.current?.click()}
        className="cursor-pointer mt-4"
      />

      <button
        onClick={pfpUpdate}
        disabled={loading}
        className="mt-4 cursor-pointer rounded-lg bg-linear-to-r from-violet-700 to-purple-500 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Update PFP"}
      </button>
    </div>
  );
}