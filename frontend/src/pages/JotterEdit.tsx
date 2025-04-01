import  { useEffect, useState } from 'react'
import Edit from './Edit';

function JotterEdit() {
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true);
    }, [])

    if(mounted){
    return (
        <Edit/>
    )
    }
}

export default JotterEdit