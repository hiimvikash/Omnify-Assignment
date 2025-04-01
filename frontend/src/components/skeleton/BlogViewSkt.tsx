
function BlogViewSkeleton() {
  return (
    <>
      <div className="p-10 min-h-[92vh] animate-pulse">
        <div>
          <div className="h-12 md:h-16 w-full bg-gray-200 rounded"></div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-[10px]">
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>

        <div className="rounded-xl shadow-lg mt-5 md:px-3 px-10">
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className=" m-10 w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 animate-pulse">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>

      <h3 className="m-10 text-2xl text-gray-500 font-medium animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      </h3>
      <ul className="m-10 mt-4 space-y-4">
        <li className="mb-2 text-gray-400 shadow-md sm:p-4 p-5 rounded-md bg-gray-50 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </li>
        <li className="mb-2 text-gray-400 shadow-md sm:p-4 p-5 rounded-md bg-gray-50 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </li>
        <li className="mb-2 text-gray-400 shadow-md sm:p-4 p-5 rounded-md bg-gray-50 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </li>
      </ul>
    </>
  );
}

export default BlogViewSkeleton;
