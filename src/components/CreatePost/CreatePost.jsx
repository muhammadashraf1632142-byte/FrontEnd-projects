import { Form, Input } from "@heroui/react";
import React, { useState } from "react";
import AppButton from "./../shareComponents/AppButton";
import axios from "axios";

export default function CreatePost({ getPosts }) {
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function createPost(e) {
    e.preventDefault();

    if (!body.trim() && !image) {
      console.error("Post body and image are both empty");
      return;
    }

    if (!image) {
      console.error("Image is required by the backend");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("body", body);
      formData.append("image", image, image.name);

      await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBody("");
      setImage(null);
      await getPosts();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      onSubmit={createPost}
      className="create-posts mt-6 flex w-full max-w-4xl flex-col gap-3 rounded-lg p-4"
    >
      <Input
        type="text"
        placeholder={`What's on your mind ${localStorage.getItem("name") || ""}?`}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />  

      <div className="flex items-center w-full gap-2">
        <AppButton
          type="submit"
          disabled={loading}
          className="w-full h-10 cursor-pointer rounded-lg bg-linear-to-r from-violet-700 to-purple-500 px-4 text-white"
        >
          {loading ? "Creating..." : "Create Post"}
        </AppButton>

        <input
          id="post-image-input"
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
              setImage(file);
            }
          }}
        />

        <label htmlFor="post-image-input" className="cursor-pointer">
          <img src="./images/Image-Linear-24px.png" alt="Choose image" className="h-6 w-6" />
        </label>
      </div>

      {image && <p className="text-sm text-gray-600 w-full">{image.name}</p>}
    </Form>
  );
}
