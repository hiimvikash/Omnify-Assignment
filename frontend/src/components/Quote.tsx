function Quote() {
  return (
    <div className="bg-gray-100 lg:h-screen py-10  flex items-center justify-center">
      <div className="w-[90%] p-5">
        <div className="lg:text-5xl text-4xl leading-tight font-bold text-black">
          Everyone has a story to tell.
        </div>
        <div className="text-gray-800 font-normal lg:text-lg text-md mt-2">— No Verification, Write Anonymously —</div>

        <p className="font-normal mt-5 lg:text-lg text-md text-gray-500">
          Jotter is a home for human stories and ideas. Here, anyone can share
          insightful perspectives, useful knowledge, and life wisdom with the
          world—without building a mailing list or a following first.
          </p>
          
          <p className="font-normal lg:text-lg text-md text-gray-500 mt-2">We believe that what you read
          and write matters. In a world where the most sensational and surface-level
          stories often win, we’re building a system that rewards depth, nuance,
          and time well spent. A space for thoughtful conversation more than
          drive-by takes, and substance over packaging.
        </p>

        <p className="font-bold text-gray-600 mt-3 lg:text-lg text-md">Ultimately, our goal is to deepen our collective understanding of the world through the power of writing.</p>
        <div className="text-slate-400 text-sm mt-2">— CEO, Jotter Inc.</div>
      </div>
    </div>
  );
}

export default Quote;
