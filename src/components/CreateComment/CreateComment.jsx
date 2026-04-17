import { Input } from "@heroui/react";
import axios from "axios";
import { useState } from "react";

export default function CreateComment({ postId, onCommentCreated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createComment() {
    const trimmedContent = content.trim();
    const token = localStorage.getItem("token");

    if (!trimmedContent) return;

    if (!postId) {
      setError("Post ID is missing");
      return;
    }

    if (!token) {
      setError("You are not logged in");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,
        {
          content: trimmedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");

      if (onCommentCreated) {
        onCommentCreated(response.data);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      console.error("Status:", error?.response?.status);
      console.error("Response data:", error?.response?.data);

      setError(error?.response?.data?.message || "Failed to create comment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Input
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="h-10 cursor-pointer rounded-lg bg-linear-to-r from-violet-700 to-purple-500 px-4 text-white"
        onClick={createComment}
        disabled={loading || !content.trim()}
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}