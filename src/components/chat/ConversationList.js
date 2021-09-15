import {useState ,useEffect} from "react";

import  {useDispatch,useSelector} from "react-redux";
import {
    Link,
    useParams
  } from "react-router-dom";
const Conversation = ()=>{

    const conversations = useSelector(state=>state.Chat.conversations) ;
    console.log(conversations)
    const User = useSelector(state => state.Auth.user.user);
    return(<div>

            {conversations?.map((c,id)=>(
                <div key={id}>
                    <Link to={`/chat/${c._id}`}>
                    <p >{c.conversation_between.filter(f=> f!= User._id)[0]}</p>
                    </Link>
                </div>
            ))
        } 
        </div> 
    )
}
export default Conversation;