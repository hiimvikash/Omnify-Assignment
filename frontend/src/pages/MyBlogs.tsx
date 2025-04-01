import { useEffect, useState } from "react"
import  BlogCard  from "../components/BlogCard"
import NavBar from "../components/NavBar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import BlogCardSkeleton from "../components/skeleton/BlogCardSkt";

interface Blog {
  id: number;
  title: string;
  author: {
    username: string;
  };
  createdAt: string;
}


function MyBlogs() {
  localStorage.removeItem("editTitle");
  localStorage.removeItem("editContent");
  
  
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const navigate = useNavigate();

    async function fetchBlogs(){
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/blog/myblogs`,
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}` // Replace with your actual token
            }
        }
        );
        setBlogs(res.data);
        if(res.data.message === "No Blogs found associated to your account")
          setBlogs([]);
      } catch (error) {
        navigate("/notfound")
      }
      setLoading(false);
    }  
  

  useEffect(()=>{
    setMounted(true);
    fetchBlogs();
  }, [])


  if(mounted){
    if(loading){
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10 ">
            
          {[...Array(8)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
            
          </div>
        )
      }
  return (
    <div>

    <NavBar/>
      {
        (blogs.length === 0) ? (
          <div className="h-[92vh] flex items-center justify-center">
            <h2 className="md:text-xl sm:text-lg text-sm text-gray-700">No Jotters found associated to your account.</h2>
          </div>
        ):
        (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10 ">
          {
            blogs.map(blog => (
              <BlogCard key= {blog.id} id={blog.id} title={blog.title} author={blog.author.username} date={blog.createdAt.split("T")[0]} />
            ))
          }
        </div>)
      }
  
    </div>
  )

}
}

export default MyBlogs





