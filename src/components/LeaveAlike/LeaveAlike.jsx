import axios from "axios";
import { Like1 } from "iconsax-reactjs";
import { useState } from "react";

export default function LeaveAlike({ postId, likesCount = 0, onLikeUpdated }) {
	const [currentLikesCount, setCurrentLikesCount] = useState(likesCount || 0);
	const [isLikedByMe, setIsLikedByMe] = useState(false);
	const [loading, setLoading] = useState(false);

	async function sendLikeToggleRequest(url, headers) {
		const methods = ["patch", "post", "put", "delete"];
		let lastError;

		for (const method of methods) {
			try {
				if (method === "delete") {
					return await axios.delete(url, { headers });
				}

				return await axios[method](url, {}, { headers });
			} catch (error) {
				lastError = error;

				if (error?.response?.status !== 404 && error?.response?.status !== 405) {
					throw error;
				}
			}
		}

		throw lastError;
	}

	async function handleLikeToggle() {
		if (loading) {
			return;
		}

		if (!postId) {
			alert("Post ID is missing for like request");
			return;
		}

		try {
			setLoading(true);

			const token = localStorage.getItem("token");
			const url = `${import.meta.env.VITE_BASE_URL}/posts/${postId}/like`;

			const response = await sendLikeToggleRequest(url, {
				Authorization: `Bearer ${token}`,
			});

			const responseData = response?.data;
			const nextLikesCount =
				responseData?.data?.likesCount ??
				responseData?.likesCount ??
				responseData?.data?.post?.likesCount;
			const nextIsLiked =
				responseData?.data?.isLiked ?? responseData?.isLiked ?? responseData?.data?.liked;

			if (typeof nextLikesCount === "number") {
				setCurrentLikesCount(nextLikesCount);
			}

			if (typeof nextIsLiked === "boolean") {
				setIsLikedByMe(nextIsLiked);
			} else {
				const previousIsLiked = isLikedByMe;
				const updatedIsLiked = !previousIsLiked;

				setIsLikedByMe(updatedIsLiked);
				setCurrentLikesCount((prev) =>
					previousIsLiked ? Math.max(prev - 1, 0) : prev + 1,
				);
			}

			if (onLikeUpdated) {
				onLikeUpdated();
			}
		} catch (error) {
			console.error("Error liking/unliking post:", error?.response?.data || error.message);
			alert(error?.response?.data?.message || "Failed to like/unlike post");
		} finally {
			setLoading(false);
		}
	}

	return (
		<button
			type="button"
			onClick={handleLikeToggle}
			disabled={loading}
			className="flex cursor-pointer items-center gap-2 text-gray-600 disabled:cursor-not-allowed disabled:opacity-60"
		>
			<Like1 size="22" color={isLikedByMe ? "#ba68c8" : "#7512ea"} />
			{currentLikesCount}
		</button>
	);
}
