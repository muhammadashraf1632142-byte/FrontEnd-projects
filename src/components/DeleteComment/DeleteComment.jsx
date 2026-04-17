import axios from "axios";
import { Trash } from "iconsax-reactjs";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider/AuthContextProvider";

export default function DeleteComment({
	postId,
	commentId,
	commentCreatorId,
	onCommentDeleted,
}) {
	const { userData } = useContext(AuthContext);

	const currentUserId = userData?.user?._id || userData?.user?.id;
	const isNotOwner = Boolean(
		currentUserId && commentCreatorId && currentUserId !== commentCreatorId,
	);

	async function handleDeleteComment() {
		if (!postId || !commentId) {
			alert("Post ID or Comment ID is missing");
			return;
		}

		if (isNotOwner) {
			alert("This comment is not yours to delete");
			return;
		}

		try {
			await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			if (onCommentDeleted) {
				onCommentDeleted(commentId);
			}
		} catch (error) {
			const status = error?.response?.status;

			if (status === 401 || status === 403) {
				alert("This comment is not yours to delete");
				return;
			}

			alert(error?.response?.data?.message || "Failed to delete comment");
			console.error("Error deleting comment:", error?.response?.data || error.message);
		}
	}

	return <Trash color="#ba68c8" onClick={handleDeleteComment} className="cursor-pointer" />;
}
