import { FaArrowRightLong } from "react-icons/fa6";

function BlogCardSkeleton() {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow animate-pulse">
        <div className="flex items-center mb-1">
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="ml-1 mr-1 font-bold text-gray-400">
            &#xb7;
          </div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>
  
        <div className="md:hidden block mb-4 h-8 bg-gray-200 rounded"></div>
        <div className="hidden md:block mb-4 h-8 bg-gray-200 rounded"></div>
  
        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-100 bg-gray-200 rounded-lg">
          <span className="">Read more</span>
          <span className="ml-2 mt-1"><FaArrowRightLong /></span>
        </div>
      </div>
    );
  }

  export default BlogCardSkeleton;
  