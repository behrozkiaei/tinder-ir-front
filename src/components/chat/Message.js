import React from 'react'

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux"

function Message() {

    const socket = useRef();
    const user = useSelector(Store => Store.Auth.user)
    useEffect(() => {
        console.log(user)
        socket.current = io("ws://localhost:5000");
        console.log(user._id)
        socket.current.emit("userOnline", user._id);

        socket.current.emit("sendMessage", "613f371a1324533f3851a8b7", "hiiii fron sender ")

    }, []);
    return (
        <div>
            helllooooooooooo
        </div>
    )
}

export default Message
