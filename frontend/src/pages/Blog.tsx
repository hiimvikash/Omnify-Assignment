import { useEffect, useState } from "react"
import Editorjs from "../components/EditorView/EditorjsView"
import NavBar from "../components/NavBar"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

import { GiFeather } from "react-icons/gi";
import BlogViewSkeleton from "../components/skeleton/BlogViewSkt";
import {  useRecoilValue } from "recoil";
import { userIdAtom } from "../atom";
import { MdDelete } from "react-icons/md";
import CommentForm from "../components/CommentForm";
import { LoginToAddComment } from "../components/Alert";
import DeleteBtns from "../components/DeleteBtns";
import EditBtns from "../components/EditBtns";





function Blog() {
  const { id } = useParams();
  const [blog, setBlog]:any = useState();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reverseComment, setReverseComment] = useState([]);
  

  const userId = useRecoilValue(userIdAtom);

  const navigate = useNavigate();

  async function fetchBlog(){
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/blog/${id}`);
      setBlog(res.data);
      setReverseComment(res.data.comments.slice().reverse())
    } catch (error) {
      setLoading(false);
      navigate("/notfound")
    }
    setLoading(false);
  }
  useEffect(()=>{
    setMounted(true);
    fetchBlog();
  }, [])




  async function handleDeleteComment(commentId:number) {
    try {
      setReverseComment(prevComments => prevComments.filter((comment:any) => comment.id !== commentId));
      await axios.delete(`${BACKEND_URL}/blog/comment/${commentId}`,
      {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}` // Replace with your actual token
        }
      }
      )
    } catch (error) {
      console.log("error while deleting")
    }
  }





  const [dloading, setDloading] = useState(false);
  async function handleDeleteBlog() {
    try {
      setDloading(true);
      await axios.delete(`${BACKEND_URL}/blog/${id}`,
      {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}` // Replace with your actual token
        }
      }
      )
      setDloading(false);
      navigate("/myjotters");
    } catch (error) {
      setDloading(false);

      console.log("error while deleting blog")
    }
  }





  function handleEditBlog(){
    localStorage.setItem("editContent", JSON.stringify(blog.content));
    localStorage.setItem("editTitle", blog.title);
    navigate(`/jotter/${blog.id}/${blog.authorId}/edit`);
  }

  if(mounted){
    if(loading){
      return <div>
        <BlogViewSkeleton/>
      </div>
    }
    else{
      return (
        <>
          <NavBar />
          <div className=" p-10  min-h-[92vh]">
            <div>
            <textarea disabled  rows={3} value={blog.title} className="h-full text-center w-[100%] md:text-5xl sm:text-4xl text-3xl border-gray-300 outline-none bg-transparent font-[600] placeholder-gray-300 text-gray-800"/>
            </div>
            

            <div className="flex items-center justify-center gap-2 mt-[10px]">
              <p className="flex items-center gap-2 text-[11px] text-gray-600 font-[500] bg-gray-100 px-[13px] py-1 rounded-full tracking-wide">
                {blog.author.username}
              </p>
              <div>
                <GiFeather />
              </div>
              <p className="flex items-center gap-2 text-[11px] text-gray-600 font-[500] bg-gray-100 px-[13px] py-1 rounded-full tracking-wide">
                {blog.createdAt.split("T")[0]}
              </p>
            </div>

            <div className="rounded-xl shadow-lg  mt-5 md:px-3 px-5">
              <Editorjs content={blog.content} />
            </div>
          </div>
          {blog.authorId === userId && <EditBtns onClick={handleEditBlog} />}
          

          {/* comment section */}
          <div className="m-10">
            {userId < 0 ? (
              <LoginToAddComment />
            ) : (
              <CommentForm
                blogId={blog.id}
                setReverseComment={setReverseComment}
              />
            )}

            {/* View & Delete - Comment */}
            <h3 className="text-2xl text-gray-500 font-medium">
              Comments ({reverseComment.length})
            </h3>
            {reverseComment.length > 0 && (
              <ul className="mt-4 ">
                {reverseComment.map((comment: any) => (
                  <li
                    key={comment.id}
                    className="mb-2  text-gray-400 shadow-md sm:p-4 p-5  rounded-md"
                  >
                    <div>
                      <strong className="text-gray-500">
                        {comment.commentorUsername}{" "}
                      </strong>
                      : {comment.comment}
                    </div>
                    {userId === comment.commentorId && (
                      <button
                        className="mt-3 text-[20px] text-red-800 hover:text-red-600"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <MdDelete />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
        
        {blog.authorId === userId && <DeleteBtns onClick={handleDeleteBlog} loading = {dloading}/>}
          
        </>
      );
    }
}
}

export default Blog