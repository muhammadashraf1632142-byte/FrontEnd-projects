import axios from "axios";
import { Trash } from "iconsax-reactjs";

export default function DeletePost({ postId }) {
  async function handleDelete() {
    if (!postId) {
      alert("Post ID is missing");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
        {
          headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Post deleted successfully:", response.data);
      alert("Post deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
      console.error("Post ID sent:", postId);
      console.error("Status:", error?.response?.status);
      console.error("Response data:", error?.response?.data);

      alert(error?.response?.data?.message || "Failed to delete post");
    }
  }

  return (
    <Trash
      color="#ba68c8"
      onClick={handleDelete}
      className="cursor-pointer"
    />
  );
}