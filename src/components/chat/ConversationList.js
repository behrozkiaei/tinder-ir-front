import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    useParams
} from "react-router-dom";
import Header from "../screens/Header";
import "./ConversationList.css"
const Conversation = () => {

    const $conversations = useSelector(state => state.Chat.conversations);
    const [conversations, setConversations] = useState(null)

    useEffect(() => {
        console.log($conversations)
        setConversations($conversations)
    }, [$conversations])
    return (
        <>
            <Header />

            <div className="conversations">
                {/* <div className="matchBox">
                    {
                        [0, 3, 5, 8, 9, 1, 2].map((a, i) => (
                            <div className="machedAvatar" key={i}>
                                <img src="https://tinder.s3.ir-thr-at1.arvanstorage.com/person-icon.png"></img>
                            </div>
                        ))
                    }
                </div> */}

                <div className="chatConvContainer">

                    {conversations?.map((c, id) => (
                        <div key={id}>
                            <Link to={`/chat/${c._id}`} className="messageBox">
                                <div className="avatar">
                                    <img src={c.userToInfo?.avatar || "https://tinder.s3.ir-thr-at1.arvanstorage.com/person-icon.png"} alt="avatar" />
                                </div>
                                <div className="convBox">
                                    <h3>{c.userToInfo.username}</h3>
                                </div>
                            </Link>
                        </div>
                    ))
                    }
                </div>

            </div>

        </>
    )
}
export default Conversation;