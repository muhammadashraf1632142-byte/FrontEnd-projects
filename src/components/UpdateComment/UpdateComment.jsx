import axios from "axios";
import { ReceiptEdit } from "iconsax-reactjs";
import { Input } from "@heroui/react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider/AuthContextProvider";

export default function UpdateComment({
	postId,
	commentId,
	currentContent,
	commentCreatorId,
	onCommentUpdated,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState(currentContent || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { userData } = useContext(AuthContext);

	const currentUserId = userData?.user?._id || userData?.user?.id;

	function isNotOwner() {
		return Boolean(currentUserId && commentCreatorId && currentUserId !== commentCreatorId);
	}

	async function handleUpdateComment() {
		const trimmedContent = content.trim();

		if (!postId || !commentId) {
			setError("Post ID or Comment ID is missing");
			return;
		}

		if (isNotOwner()) {
			alert("This comment is not yours to edit");
			setError("This comment is not yours to edit");
			return;
		}

		if (!trimmedContent) {
			setError("Comment content is required");
			return;
		}

		try {
			setLoading(true);
			setError("");

			await axios.put(
				`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`,
				{ content: trimmedContent },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);

			setIsOpen(false);
			if (onCommentUpdated) {
				await onCommentUpdated();
			}
		} catch (err) {
			console.error("Error updating comment:", err?.response?.data || err.message);
			const status = err?.response?.status;

			if (status === 401 || status === 403) {
				alert("This comment is not yours to edit");
				setError("This comment is not yours to edit");
			} else {
				setError(err?.response?.data?.message || "Failed to update comment");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="w-full">
			<ReceiptEdit
				color="#ba68c8"
				onClick={() => {
					if (isNotOwner()) {
						alert("This comment is not yours to edit");
						setError("This comment is not yours to edit");
						return;
					}

					setContent(currentContent || "");
					setError("");
					setIsOpen((prev) => !prev);
				}}
				className="cursor-pointer"
			/>

			{isOpen ? (
				<div className="mt-2 flex w-full flex-col gap-2">
					<Input
						placeholder="Edit your comment"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>

					<div className="flex gap-2">
						<button
							className="h-9 cursor-pointer rounded-lg bg-linear-to-r from-violet-700 to-purple-500 px-3 text-white"
							onClick={handleUpdateComment}
							disabled={loading}
						>
							{loading ? "Updating..." : "Update"}
						</button>

						<button
							className="h-9 cursor-pointer rounded-lg bg-gray-200 px-3 text-gray-700"
							onClick={() => {
								setIsOpen(false);
								setContent(currentContent || "");
								setError("");
							}}
							disabled={loading}
						>
							Cancel
						</button>
					</div>

					{error ? <p className="text-xs text-red-500">{error}</p> : null}
				</div>
			) : null}
		</div>
	);
}
