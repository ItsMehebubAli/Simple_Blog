"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./_components/BlogCard";
import { formatMemberSince } from "./_utils/Format";
import BlogViewCard from "./_components/BlogViewCard";
import Spinner from "./_components/Spinner";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState(null);
  const [loading,SetLoading] = useState(true);
  useEffect(() => {
    // Fetch the sorted posts from the backend
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPosts(sortedData);
        SetLoading(false);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

 

  return (
    <main className="flex justify-center items-center h-[calc(100vh-56px)]    ">
      {data ? (
        <BlogViewCard
          title={data.title}
          content={data.content}
          setData={setData}
        />
      ) : (
        <div className={`lg:w-1/2  w-[100%]  bg-glass  px-8 py-6 h-full  flex flex-col justify-center bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ${!loading?'p-10':'p-0'}  hover:`}>
          {
            loading?(<Spinner/>):(<ol className="relative border-s">
              {posts.map((post) => {
                console.log(post.created_at);
                return (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    setData={setData}
                    created_at={formatMemberSince(post.created_at)}
                    setPosts={setPosts}
                    posts={posts}
                  />
                );
              })}
            </ol>)
          }
          
          
        </div>
      )}
    </main>
  );
}
