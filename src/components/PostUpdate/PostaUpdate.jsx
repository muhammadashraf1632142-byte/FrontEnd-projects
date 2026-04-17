import axios from "axios";
import { Edit } from "iconsax-reactjs";
import { useState } from "react";
import { Form, Input } from "@heroui/react";
import AppButton from "../shareComponents/AppButton";

export default function PostaUpdate({ postId, currentBody, onPostUpdated }) {
	const [isOpen, setIsOpen] = useState(false);
	const [body, setBody] = useState(currentBody || "");
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	async function handleUpdatePost(e) {
		e.preventDefault();

		if (!postId) {
			alert("Post ID is missing");
			return;
		}

		if (!body.trim() && !image) {
			alert("Please edit body or choose an image first");
			return;
		}

		try {
			setLoading(true);

			const formData = new FormData();
			formData.append("body", body.trim());

			if (image) {
				formData.append("image", image, image.name);
			}

			await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			setIsOpen(false);
			setImage(null);

			if (onPostUpdated) {
				await onPostUpdated();
			}
		} catch (error) {
			console.error("Error updating post:", error.response?.data || error.message);
			alert(error.response?.data?.message || "Failed to update post");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="w-full">
			<Edit
				color="#ba68c8"
				onClick={() => setIsOpen((prev) => !prev)}
				className="cursor-pointer"
			/>

			{isOpen ? (
				<Form onSubmit={handleUpdatePost} className="mt-3 flex w-full flex-col gap-3">
					<Input
						type="text"
						placeholder="Edit post body"
						value={body}
						onChange={(e) => setBody(e.target.value)}
					/>

					<div className="flex w-full items-center gap-2">
						<AppButton
							type="submit"
							disabled={loading}
							className="h-10 w-full rounded-lg bg-linear-to-r from-violet-700 to-purple-500 px-4 text-white"
						>
							{loading ? "Updating..." : "Update Post"}
						</AppButton>

						<input
							id={`update-post-image-input-${postId}`}
							type="file"
							accept="image/png,image/jpeg,image/jpg,image/webp"
							className="hidden"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (
									file &&
									["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)
								) {
									setImage(file);
								}
							}}
						/>

						<label htmlFor={`update-post-image-input-${postId}`} className="cursor-pointer">
							<img
								src="./images/Image-Linear-24px.png"
								alt="Choose image"
								className="h-6 w-6"
							/>
						</label>
					</div>

					{image ? <p className="w-full text-sm text-gray-600">{image.name}</p> : null}

					<AppButton
						type="button"
						onClick={() => {
							setIsOpen(false);
							setBody(currentBody || "");
							setImage(null);
						}}
						className="h-10 w-full rounded-lg bg-gray-200 px-4 text-gray-700"
					>
						Cancel
					</AppButton>
				</Form>
			) : null}
		</div>
	);
}
