"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";
import toast from "react-hot-toast";
import axios from "axios";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Layout from '../components/Layout';
export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title||!content){
      toast.error("Please fill both the fields")
    }
    else if(!title){
      toast.error("Please fill out the title")
      return
    }
    else if(!content){
      toast.error("Please fill out the content")
      return
    }
    else{
    await axios.post("http://localhost:5000/posts", { title, content }).then((resonse)=>{
      toast.success("The blog title and content have been successfully posted")
      router.replace("/");

    });
    
  }
  };
  return (
    <main className="  flex p-6 h-fit   flex-col items-center justify-center font-myfont ">
      <Card className="relative w-[40rem] dark font-myfont border-2  mt-9 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 ">
        <CardHeader>
          <CardTitle className="font-myfont">Create a blog card</CardTitle>
          <CardDescription>Deploy your new blog in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Title">Title</Label>
                <Input
                  id="Title"
                  placeholder="title of the card here ..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Conetent">Description</Label>
                <Textarea
                  id="Content"
                  placeholder="Title content here ..."
                  rows="10"
                  cols="20"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.replace("/")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Deploy</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
