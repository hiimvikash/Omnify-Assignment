import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import NavBar from "../components/NavBar";
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

function Blogs() {
  localStorage.removeItem("editTitle");
  localStorage.removeItem("editContent");

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages from API

  const navigate = useNavigate();

  async function fetchBlogs(currentPage: number) {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/blog/bulk?page=${currentPage}`);
      
      if (res.data.message === "No blogs found") {
        setBlogs([]);
        setTotalPages(1);
      } else {
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages); // Get total pages from API
      }
    } catch (error) {
      navigate("/notfound");
    }
    setLoading(false);
  }

  useEffect(() => {
    setMounted(true);
    fetchBlogs(page);
  }, [page]); // Refetch when `page` changes

  if (mounted) {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10 ">
          {[...Array(9)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    return (
      <div>
        <NavBar />
        {blogs.length === 0 ? (
          <div className="h-[92vh] flex items-center justify-center">
            <h2 className="text-xl text-gray-700">No Jotters found.</h2>
          </div>
        ) : (
          <div>
            {/* Blog Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  author={blog.author.username}
                  date={blog.createdAt.split("T")[0]}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center my-5 space-x-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-2 text-sm bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm font-semibold">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                disabled={page === totalPages}
                className="px-3 py-2 text-sm bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Blogs;
