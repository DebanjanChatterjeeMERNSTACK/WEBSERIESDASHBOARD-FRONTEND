import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import "./comment.css";
import { MdDelete } from 'react-icons/md';
import logo from "../logo/emoji.jpeg"

const Comment = () => {
    const [comment,setcomment]=useState([])

    useEffect(()=>{
     fetch("http://localhost:9000/commentget")
     .then(res=>res.json())
     .then(json=>setcomment(json))
    },[])

  const handleclick=(id)=>{

    fetch("http://localhost:9000/commentdelete", {
        method: "post",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            _id: id
        })
    })
        .then(err => err.json())
        .then(json => alert(json.mess))
     


  }





    return (
        <>
            <div className="gridfill">
                <div>
                    <Header />
                </div>
                <div className="gridnav">
                  { comment.length===0 ? 
                  <div className="emoji">
                    <img src={logo} className="emojiimg"/>
                  </div>
                  :
                  comment && comment.map((e,i)=>{
                     <div className="comment" key={i}>
                        <p>{e.comment}</p>
                        <MdDelete className="delete"  onClick={()=>handleclick(e._id)}/>
                     </div>

                  })
                  }
                </div>
            </div>



        </>
    )
}
export default Comment