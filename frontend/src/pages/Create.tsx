import  { useEffect, useState } from 'react'
import Write from './Write'

function Create() {
    const [mounted, setMounted] = useState(false);
    
    useEffect(()=>{
        setMounted(true);
    })
    if(mounted){
  return (
    <Write/>
  )
}
}

export default Create