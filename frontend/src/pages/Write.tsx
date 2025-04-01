import { useEffect, useState } from "react";
import Editorjs from "../components/Editor/Editorjs"
import { OutputData } from "@editorjs/editorjs";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useRecoilValue } from "recoil";
import { verifiedAtom } from "../atom";


function Write() {
    const [editorData, setEditorData] = useState<OutputData>({ blocks: []});
    const [title, setTitle] = useState("");

    const handleEditorChange = (data:OutputData) => {
        setEditorData(data);
        localStorage.setItem("editorData", JSON.stringify(data));
    };
    const handleTitleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
        localStorage.setItem("editorTitle", e.target.value);
    };

    
    const navigate = useNavigate();
    const verified = useRecoilValue(verifiedAtom);



    useEffect(() => {
        if(!verified){
            navigate("/signin");
        }
        const savedData = localStorage.getItem('editorData') || "{}"; 
        const savedTitle = localStorage.getItem('editorTitle') || "";
        if (savedData || savedTitle) {
          setEditorData(JSON.parse(savedData));
          setTitle(savedTitle);
        }
    }, []);


    // AFTER UPLOAD-BUTTON CLICKS
    const [loading, setLoading] = useState(false);
    async function handleUpload(){
        setLoading(true);
        if(!title || editorData.blocks.length === 0){
            setTimeout(()=>{
                alert("Empty jotter cannot be uploaded.");
                setLoading(false);
            },1000)
            return;
        }

        try {
            const response = await axios.post(
            `${BACKEND_URL}/blog`,
            {
                title,
                content : editorData
            },
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}` // Replace with your actual token
                }
            }
            );
        setLoading(false);
        localStorage.removeItem("editorTitle");
        localStorage.removeItem("editorData");
        navigate(`/jotter/${response.data.id}`);
        } catch (error:any) {
            setLoading(false);
            alert("Upload Error");
        }
    }
    // AFTER UPLOAD-BUTTON CLICKS






  return (
    <>
    <NavBar/>
    <div className=" p-10  min-h-[92vh]">
        {/* <div>
            <input type="text" value={title} onChange={handleTitleChange} placeholder="Untitled" className=" h-full text-center w-[100%] md:text-5xl sm:text-4xl text-3xl border-gray-300 outline-none bg-transparent font-[600] placeholder-gray-300 text-gray-800" />
        </div> */}
        <div>
            <textarea  rows={3} value={title} placeholder="Untitled" onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>handleTitleChange(e)} className="h-full text-center w-[100%] md:text-5xl sm:text-4xl text-3xl border-gray-300 outline-none bg-transparent font-[600] placeholder-gray-300 text-gray-800"/>
        </div>

        <div className="rounded-xl shadow-lg  mt-5 md:px-3 px-10">
            <Editorjs onChange={handleEditorChange}/>
        </div>

        <div className="mt-10 flex justify-center">
                <Button buttonText={"Upload"} onClick={handleUpload} loading={loading}/>
        </div>
    </div>
    </>
  )
}












interface ButtonType {
    buttonText: string,
    loading?: boolean
    onClick?: (e:any)=> void;
}

function Button({buttonText, loading, onClick}:ButtonType) {
 
  if(loading) {
     return (
    <div>
        <button disabled className="py-2 px-10 w-50 flex justify-center bg-gray-200 border-black rounded-md text-gray-700 border-2 space-x-2" ><span>{buttonText} </span><ButtonLoader/></button>
    </div>
     )
  }
  
  return (
    <div>
        <button onClick={onClick} className="py-2 px-10 w-50 bg-[#1c1c1c] hover:bg-black text-white rounded-md" >{buttonText}</button>
    </div>
  )
}

export const ButtonLoader = () => {
    return (
        <div>
            <div className="lds-dual-ring"></div>
        </div>
    )
}

export default Write