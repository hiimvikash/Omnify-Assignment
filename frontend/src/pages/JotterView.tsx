import { useEffect, useState } from "react"
import Blog from "./Blog";




function JotterView() {
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true);
    }, [])

    if(mounted){
    return (
        <Blog/>
    )
}
}

export default JotterView