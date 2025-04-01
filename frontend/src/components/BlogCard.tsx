import { memo } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";


type BlogCardType = {
    id: number;
    author: string; // we will take author username 
    title: string;
    date: string;
};



const BlogCard = memo(function({id, author, title, date} :BlogCardType ) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex items-center mb-1">
                <h4  className="text-[12px] text-gray-700 font-medium bg-gray-200 px-[10px] py-1 rounded-full tracking-wide">{ author || "Anonymous"}</h4>
                <div className="ml-1 mr-1 font-bold text-gray-400">
                    &#xb7;
                </div>
                <div className="text-gray-600 text-[12px] font-medium">{date}</div>
        </div>

        
        <p className="md:hidden block mb-4 text-2xl font-bold  text-gray-900">
          {title.length > 100 ? title.slice(0, 50) + "..." : title}        
        </p>
        <p className="hidden md:block mb-4 text-2xl font-bold  text-gray-900">
          {title.length > 100 ? title.slice(0, 100) + "..." : title}
          </p>
      
        {/* <p className="md:hidden block mb-3 font-normal text-gray-700">
            {content.length > 100 ? content.slice(0, 50) + "..." : content}
        </p>
        <p className=" hidden md:block mb-3 font-normal text-gray-700">
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </p> */}
        



      <Link to={`/jotter/${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-100 bg-gray-900 rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-200"
      >
        <span className="">Read more</span>
        <span className="motion-safe:animate-pulse ml-2 mt-1"><FaArrowRightLong /></span>
      </Link>
    </div>
  );
})

export default BlogCard;
