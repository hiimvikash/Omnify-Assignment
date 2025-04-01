import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../config";


function CommentForm({blogId, setReverseComment}:any) {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleAddComment(e:any){
        e.preventDefault();

        setLoading(true);
        try {
            const res = await axios.post(`${BACKEND_URL}/blog/${blogId}/addcomment`,
                {
                    comment
                },
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}` // Replace with your actual token
                    }
                }
            );
            console.log(res);
            setReverseComment((prevComment : [])=>{
                return [res.data , ...prevComment]
            });
            
            setComment("");
            setLoading(false);
        } catch (error) {
            alert("Error while posting comment");
            setLoading(false);
        }
    }
  return (
    <form onSubmit={handleAddComment}>
    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
        <label htmlFor="comment" className="sr-only">Your comment</label>
        <textarea id="comment" rows={4} value={comment} onChange={(e)=>{setComment(e.target.value)}} className="w-full text-sm text-gray-900 bg-white border-0  focus:ring-0 p-5" placeholder="Have something to say? Type your comment here..." required></textarea>
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
        {loading ? (<button disabled type="button" className="text-gray-50 bg-gray-800  focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 inline-flex items-center">
<svg aria-hidden="true" role="status" className="inline w-3 h-3 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
Posting
</button>) : <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-50 bg-gray-800 rounded-lg hover:bg-gray-900">
          Post comment
        </button>}
        
      </div>
    </div>
  </form>  
  )
}

export default CommentForm