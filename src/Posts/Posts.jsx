import axios from "axios";
import { useState, useEffect} from "react";
import Loading from "../pages/Loading/Loading";
import PostCard from './../components/PostCard/PostCard';
import CreatePost from "../components/CreatePost/CreatePost";

export default function Posts() {
  const [posts, setPosts] = useState(null);
  async function getPosts() {
    const { data: { data: { posts } } } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Posts response:", posts);
    
     setPosts(posts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts ? (
        <div className="flex flex-col items-center min-h-screen  p-16">
          <h1 className="bg-linear-to-r from-violet-700 to-purple-500 bg-clip-text p-1.5 text-4xl font-bold text-transparent">
            Welcome to the Posts Page!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            This is where you can view and create posts.
          </p>
          <CreatePost getPosts={getPosts} />
          <div className="mt-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts</h2>

          </div>
          {posts.map((post) => (
            <PostCard
              key={post.id || post._id}
              id={post.id || post._id}
              body={post.body}
              image={post.image}
              commentsCount={post.commentsCount}
              likesCount={post.likesCount}
              createdAt={post.createdAt}
              name={post.user.name}
              email={post.user.email}
              pfp={post.user.photo}
              topComment={post.topComment}
              onPostUpdated={getPosts}
            />
          ))}
        </div>

      ) : (
        <div className="mt-4 flex flex-col items-center ">
          <Loading />
        </div>
      )}
    </>
  );
}