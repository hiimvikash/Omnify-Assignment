import { SignupType } from "@vikashdev/jotter-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userIdAtom, userInfoAtom, verifiedAtom } from "../atom"
import { useSetRecoilState } from "recoil"
import { BACKEND_URL } from "../config"
import axios from "axios"
import "../App.css"
import { isValidPassword } from "../helper"
import { InputsError, ServerError} from "./Alert"




interface FormType {
    type : string
}




function Auth({type} : FormType) {

    const [postInput, setPostInput] = useState<SignupType>({
        name: "",
        username: "",
        password: "",
    })
    const navigate = useNavigate()
    const setUsername = useSetRecoilState(userInfoAtom);
    const setVerified = useSetRecoilState(verifiedAtom);
    const setUserId = useSetRecoilState(userIdAtom);
    
    const[loading, setLoading] = useState(false)
    const [inputsError, setInputsError] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An unexpected error occurred");

    async function handleSignup() {
      setLoading(true);
      setInputsError(false);
      setServerError(false);
      if (postInput.username.length < 3 || postInput.name.length < 1 || !isValidPassword(postInput.password)) {
        setTimeout(() => {
          setInputsError(true);
          setLoading(false);
        }, 800);
        return;
      }
      
      try {
        const response = await axios.post(
          `${BACKEND_URL}/user/signup`,
          postInput
        );
        console.log(response.data.token);
        localStorage.setItem("jwt", response.data.token);
        setUsername(postInput.username);
        setLoading(false);
        navigate("/signin")
      } catch (error: any) {
        setServerError(true);
        setLoading(false);
        if(error.response.status === 409){
            setErrorMessage("Oops🥺 Duplicate Username!")
        }
      }
    }

    async function handleSignin():Promise<void> {
      setLoading(true);
      setInputsError(false);
      setServerError(false);
      if (postInput.username.length < 1 || postInput.password.length < 1) {
        setTimeout(() => {
          setServerError(true);
          setErrorMessage("Invalid Inputs")
          setLoading(false);
        }, 800);
        return;
      }
      try {
        const response = await axios.post(
          `${BACKEND_URL}/user/signin`,
          postInput
        );
        console.log(response.data.token);
        localStorage.setItem("jwt", response.data.token);
        setUsername(postInput.username);
        setVerified(true);
        setUserId(response.data.userId);
        setLoading(false);
        navigate("/")
      } catch (error: any) {
        setServerError(true);
        setLoading(false);
        if(error.response.status === 403){
            setErrorMessage("Wrong Credentials!")
        }
      }
    }

  return (
    <div className={type === "signup" ? "lg:h-screen py-10  flex items-center justify-center" : "h-screen py-10  flex items-center justify-center" }>
        <div className="lg:w-[50%] lg:p-0 w-[80%] p-5">
            <div className="font-bold lg:text-4xl text-3xl text-center">{type=="signup"?"Create an account":"Welcome back 👻"}</div>

            <div className="font-normal text-sm text-center text-slate-400 mt-[5px] mb-3" >
                {
                    type=="signup"? <div>Already have an account ? <Link to="/signin" className="underline">Login</Link></div>
                    : <div>Don't have an account ? <Link to="/signup" className="underline">Signup</Link></div>
                } 
            </div>

            {type=="signup" && <InputElement placeholder="John Doe" label="Name" onChange = {(e)=>setPostInput({...postInput, name: e.target.value})} />}

            <InputElement placeholder="john100xdev" label="Username" onChange = {(e)=>setPostInput({...postInput, username: e.target.value})}/>
            <InputElement placeholder="X X X X X X" label="Password" type="password" onChange = {(e)=>setPostInput({...postInput, password: e.target.value})}/>

            
            
            <div className="mt-4">
                <Button buttonText={type=="signup"?"Sign up":"Log in"} onClick = {type=="signup"?handleSignup:handleSignin} loading = {loading}/>
            </div>
            
            {inputsError && type=="signup" && <div className="mt-5"><InputsError/></div>}
            {serverError && <div className="mt-5"><ServerError errorMessage = {errorMessage}/></div>}
            
            {/* Demo Credentials Card for Signin */}
        {type === "signin" && (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50 text-center shadow-md">
            <p className="font-semibold text-gray-700">Demo Credentials</p>
            <p className="text-sm text-gray-600">Username: <span className="font-mono font-medium">hellodemo</span></p>
            <p className="text-sm text-gray-600">Password: <span className="font-mono font-medium">@20March2002</span></p>
          </div>
        )}

        </div>
    </div>
  )
}

export default Auth







type InputType = {
    label:string,
    type?: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function InputElement({label, type, placeholder, onChange}: InputType) {
    
    return (
    <div className="flex flex-col mt-3  ">
        <div className="font-semibold mb-1">{label}</div>
        <input type={type || "text"} placeholder={placeholder} onChange={onChange} className="border border-gray-300 rounded-md py-1 px-2 outline-gray-700 shadow-sm"/>
    </div>
  )
}








interface ButtonType {
    buttonText: string,
    loading: boolean
    onClick: (e:any)=> void;
}

function Button({buttonText, loading, onClick}:ButtonType) {
 
  if(loading) {
     return (
    <div>
        <button onClick={onClick} disabled className="py-2 px-10 w-full flex justify-center bg-gray-200 border-black rounded-md text-gray-700 border-2 space-x-2 animate-pulse" ><span>{buttonText} </span><ButtonLoader/></button>
    </div>
     )
  }
  
  return (
    <div>
        <button onClick={onClick} className="py-2 px-10 w-full bg-[#1c1c1c] hover:bg-black text-white rounded-md" >{buttonText}</button>
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