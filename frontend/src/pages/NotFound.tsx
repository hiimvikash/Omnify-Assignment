import NavBar from "../components/NavBar"


function NotFound() {
    return (
        <>
        <NavBar/>
        <div className="h-[92vh] flex gap-5 items-center justify-center">
            <h1 className='md:text-5xl sm:text-3xl text-sm text-gray-700 font-medium'>404 Not found 🤕</h1>
        </div>
        </>
    )
  }
  export default NotFound