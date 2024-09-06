import "./BlogCard.css";
import { FaCodeBranch, FaCopy, FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
export default function Card({title,created_at,setData ,id,setPosts,posts}) {
  console.log(created_at);
const handelFetch =async()=>{
  console.log(id);
  const dt = await axios.get(`http://localhost:5000/posts/${id}`);
  console.log(dt.data)
  setData(dt.data);
  // const d= await dt.Json();
  // console.log(d);
}
const handleDelete = () => {
  axios
    .delete(`http://localhost:5000/posts/${id}`)
    .then(() => {
      console.log("Post deleted successfully");
      toast.success("Post deleted successfully");
      setPosts(posts.filter((post) => post.id !== id)); // Update the state after deletion
    })
    .catch((error) => {
      console.error("Error deleting the post:", error);
      toast.error("Error deleting the post");
    });
};
  return (
    <li className="mb-10 ms-7  rounded-md ">
      <span
        className="absolute flex items-center justify-center w-6 h-6 bg-blue-100
    rounded-full -start-[1rem] ring-8 ring-white"
      >
        <FaCodeBranch className="w-5 h-5 text-blue-800" />
      </span>
      <div className="flex gap-2 items-center flex-wrap text-white">
        {title}
      </div>

      <time
        className="block my-1 text-xs font-normal leading-none
     text-gray-400"
      >
        {`Posted on ${created_at}`}
      </time>
      <div className="flex flex-wrap w-full justify-between mt-4">
        <Button  onClick={handelFetch} >View</Button>
        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
      </div>
    </li>
  );
}
