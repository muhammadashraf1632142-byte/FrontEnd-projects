import { Card } from "@heroui/react";
import { KeyboardOpen } from "iconsax-reactjs";
import { useState } from "react";
import CommentCard from "../CommentCard/CommentCard";
import CreateComment from "../CreateComment/CreateComment";
import DeletePost from "../DeletePost/DeletePost";
import PostaUpdate from "../PostUpdate/PostaUpdate";
import LeaveAlike from "../LeaveAlike/LeaveAlike";

export default function PostCard({
  id,
  pfp,
  body,
  image,
  commentsCount,
  likesCount,
  createdAt,
  name,
  email,
  topComment,
  onPostUpdated,
}) {
  const [currentTopComment, setCurrentTopComment] = useState(topComment);
  const [currentCommentsCount, setCurrentCommentsCount] = useState(commentsCount);
  const [commentsRefreshKey, setCommentsRefreshKey] = useState(0);

  function handleCommentCreated(newCommentData) {
    const newComment =
      newCommentData?.comment ||
      newCommentData?.data?.comment ||
      newCommentData?.data ||
      newCommentData;

    setCurrentTopComment(newComment);
    setCurrentCommentsCount((prev) => prev + 1);
    setCommentsRefreshKey((prev) => prev + 1);
  }

  return (
    <Card className="mt-5 h-11/12 w-full max-w-md overflow-hidden rounded-lg bg-gray-100 p-4 shadow-md">
      <div className="flex items-center justify-between space-x-4">
        <div  className="flex items-center  space-x-4">

        <img
          src={pfp ? pfp : "./images/default-pfp.png"}
          alt="User Avatar"
          className="h-16 w-16 rounded-full"
          />
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
          </div>
        <div className="flex items-center gap-2">
          <PostaUpdate postId={id} currentBody={body} onPostUpdated={onPostUpdated} />
          <DeletePost postId={id}  />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-lg text-fuchsia-950">{body}</p>

        {image ? (
          <img
            src={image}
            alt="Post Image"
            className="mt-4 h-80 w-full rounded-lg object-cover"
          />
        ) : (
          <img
            src="./images/noImage.png"
            alt="No Image"
            className="mt-4 h-80 w-full rounded-lg object-cover"
          />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-600">
          {new Date(createdAt).toLocaleString()}
        </span>

        <div className="flex items-center space-x-4">
          <LeaveAlike postId={id} likesCount={likesCount} onLikeUpdated={onPostUpdated} />

          <span className="flex cursor-pointer items-center gap-2 text-gray-600">
            <KeyboardOpen size="22" color="#7512ea" />
            {currentCommentsCount}
          </span>
        </div>
      </div>

      <CommentCard
        postId={id}
        pfp={pfp}
        name={name}
        topComment={currentTopComment}
        refreshCommentsKey={commentsRefreshKey}
      />

      <CreateComment postId={id} onCommentCreated={handleCommentCreated} />
    </Card>
  );
}