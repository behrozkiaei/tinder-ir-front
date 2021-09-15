import React from 'react'

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector,useDispatch } from "react-redux"

function Message() {

    const socket = useRef();
    const user = useSelector(Store => Store.Auth.user)
    // const messages  = useSelector(State=>State.Chat.messages)
    const [messages , setMessages] = useState([])
    const [tempMessage , setTempMessage] = useState(null)
    const [conversation_id,setConvId] = useState("61409e95cd800e1a24378e2b")
    const [user_to,setUser_to] = useState((["613f371a1324533f3851a8b7" , "613f2013c3b7b30ed074913d"].filter(d => d!=user?.user._id )))
    const dispatch  = useDispatch();
    useEffect(() => {
        console.log("user_to" , user_to)
        const getCon = async ()=>{

           await axios.post("/api/chat/getAllConvMess" ,{
                conversation_id : conversation_id
            }).then(res=>{
                
                dispatch({
                    type :  "SET_MESSAGES",
                    payload  : res.data.data,
                })
                setMessages(res.data.data);
            })
        }
        getCon();
    },[])

    useEffect(() => {
       
        socket.current = io("ws://192.168.12.39:5000");
     
        socket.current.emit("userOnline",user?.user?._id);

        socket.current.on("global", data=>{
            console.log("client recived" ,data)
        })
        socket.current.on("sendMessage", (data)=>{
            console.log("socket from "  + data)
            axios.post("/api/chat/getAllConvMess" ,{
                conversation_id : conversation_id
            }).then(res=>{
                console.log(res.data.data)
                dispatch({
                    type :  "SET_MESSAGES",
                    payload  : res.data.data,
                })
                setMessages(res.data.data);
            })
        })

    }, []);
    const submitForm =(e)=>{
        e.preventDefault();
        
        axios.post("/api/chat/sendMessage" , {
            conversation_id: conversation_id,
            user_to: user_to[0],
            message: tempMessage,
            status: "UNREAD"
        }).then((res)=>{

             axios.post("/api/chat/getAllConvMess" ,{
                conversation_id : conversation_id
            }).then(res=>{
               
                dispatch({
                    type :  "SET_MESSAGES",
                    payload  : res.data.data,
                })
                socket.current.emit("sendMessage", user_to[0], tempMessage)
                setMessages(res.data.data);
                setTempMessage(null)
            })


        })
    }
    useEffect(()=>{
       
    },[messages])
    return (
        <>
        <div>
            { messages.map((d,i)=>(
                <div key ={i}>
                    <p >{d.message}</p>
                </div>
             ))}
        </div>
        <div >
            <form onSubmit={(e)=>submitForm(e)}>
                <input value={tempMessage || ""} onChange={(e) =>{setTempMessage(e.target.value)}} />
                <input type="submit" value="Submit" />
            </form>
        </div>
        </>
    )
}

export default Message
