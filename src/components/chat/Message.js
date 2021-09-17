import React from 'react'

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom";
import Header from '../screens/Header';
import "./Message.css"
function Message() {
    let { conversation_id } = useParams();
    const socket = useRef();
    const scrollRef = useRef();
    //red store messages conv and user 
    const user = useSelector(Store => Store.Auth.user)
    const $messages = useSelector(State => State.Chat.message)
    const $conv = useSelector(State => State.Chat.conversations?.filter(d => d._id === conversation_id)[0])
    const dispatch = useDispatch();
    const [messages, setMessage] = useState([])
    const [tempMessage, setTempMessage] = useState(null)
    const [user_to, setUser_to] = useState([])

    useEffect(() => {
        setUser_to($conv?.conversation_between?.filter(d => d !== user?.user._id)[0] || null)
    }, [])
    useEffect(() => {
        setMessage($messages?.filter(d => d.conversation_id === conversation_id) || [])

        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [$messages])

    useEffect(() => {
        console.log("new message added to store from other user")

        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const submitForm = (e) => {
        e.preventDefault();

        axios.post("/api/chat/sendMessage", {
            conversation_id: $conv._id,
            user_to: user_to,
            message: tempMessage,
            status: "UNREAD"
        }).then((res) => {

            console.log(res.data.data)
            //push that message in to the store chat
            dispatch({ type: "ADD_MESSAGE", payload: res.data.data })
            setTempMessage('')
        })
    }

    return (
        <>
            <Header></Header>
            <div className="chatContainder">
                <div className="MessegesContainer" > {

                    messages.map((d, i) => (



                        <div key={i} className={"messageBox " + ((d.user_to && d.user_to !== user.user._id) ? "" : "rtlChat")}>

                            <div className="avatar" >
                                <img src={$conv.userToInfo.avatar || "https://tinder.s3.ir-thr-at1.arvanstorage.com/person-icon.png"} alt="avatar" />
                            </div>
                            <div className="convBox">
                                <p className={((d.user_to && d.user_to !== user.user._id) ? "recieved" : "sent")}>{d.message}</p>
                            </div>
                        </div>

                    ))}
                    <div ref={scrollRef} />
                </div>
                <div className="textInputBox">
                    < form onSubmit={(e) => submitForm(e)} className="chat-form">
                        < input value={tempMessage || ""} className="chat-input"
                            onChange={(e) => { setTempMessage(e.target.value) }} />
                        < input type="submit" className="chat-button" value="Submit" /> </form>
                </div>
            </div>
        </>
    )
}

export default Message