import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import axios from "axios";
import UpdateComment from "../UpdateComment/UpdateComment";
import DeleteComment from "../DeleteComment/DeleteComment";

export default function CommentCard({ postId, name, pfp, topComment, refreshCommentsKey }) {
  const [comments, setComments] = useState([]);

  function getCommentId(comment) {
    return comment?._id || comment?.id;
  }

  function handleCommentDeleted(deletedCommentId) {
    setComments((prevComments) =>
      prevComments.filter((comment) => getCommentId(comment) !== deletedCommentId),
    );
  }

  async function getComments() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: 1,
          limit: 10,
        },
      },
    );

    // console.log("Actual API data:", data);
    // console.log("Comments list:", data?.data?.comments);

    setComments(data?.data?.comments || []);
  }

  useEffect(() => {
    if (postId) {
      getComments();
    }
  }, [postId, refreshCommentsKey]);

  useEffect(() => {
    if (!topComment) {
      return;
    }

    const incomingCommentId = getCommentId(topComment);

    setComments((prevComments) => {
      if (!incomingCommentId) {
        return [topComment, ...prevComments];
      }

      const alreadyExists = prevComments.some(
        (existingComment) => getCommentId(existingComment) === incomingCommentId,
      );

      if (alreadyExists) {
        return prevComments;
      }

      return [topComment, ...prevComments];
    });
  }, [topComment]);

  return (
    <div className="flex flex-1 flex-col justify-center gap-2">
      {comments.length > 0 ? (
        <div className="max-h-40 overflow-y-auto shadow-inner">
          {comments.map((comment) => (
            <Card
              key={getCommentId(comment)}
              className="mt-5 h-full w-full max-w-md rounded-lg bg-gray-100 p-4 shadow-md"
            >
              <CardHeader className="pb-1 px-1">
                <div className="flex w-full items-center justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-3 pr-2">
                    <img
                      className="w-8 rounded-full"
                      src={
                        comment.commentCreator?.photo || "./images/default-pfp.png"
                      }
                      alt="User Avatar"
                    />
                    <h3 className="truncate text-sm font-semibold">
                      {comment.commentCreator?.name || "Unknown user"}
                    </h3>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 pl-1">
                    <UpdateComment
                      postId={postId}
                      commentId={getCommentId(comment)}
                      currentContent={comment.content}
                      commentCreatorId={comment.commentCreator?._id || comment.commentCreator?.id}
                      onCommentUpdated={getComments}
                    />
                    <DeleteComment
                      postId={postId}
                      commentId={getCommentId(comment)}
                      commentCreatorId={comment.commentCreator?._id || comment.commentCreator?.id}
                      onCommentDeleted={handleCommentDeleted}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardBody className="pt-0">
                <p className="text-xs text-gray-500">
                  {comment.content || "No comment available"}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-500">No comments available</p>
      )}
    </div>
  );
}
