import React, {
    useEffect,
    useState,
    useRef,
    useMemo
} from 'react'
import TinderCard from 'react-tinder-card'
import axios from "axios"
import './css/TinderCards.css'
import { useSelector, useDispatch } from "react-redux";
function TinderCards({ person }) {

    const $cards = useSelector(state => state.Cards)
    const [people, setPeople] = useState(person)
    const dispatch = useDispatch();
    const swiperef = useRef();
    useEffect(() => {
        setPeople($cards.cards || [])
    }, [$cards])

    const swiped = (direction, user_to) => {


        axios.post("/api/tinder/userLikedOrDisliked", {
            user_id_to: user_to,
            behavior: (direction === "right") ? "LIKE" : "DISLIKE"
        }).then(res => {
            if (res.data.data) {

                axios.get("/api/chat/getUserConversation").then(res => {

                    dispatch({
                        type: "SET_CONVERSATIONS",
                        payload: res.data?.data
                    })

                })
                //check messages list again 

                axios.get("/api/chat/getUserConversation").then(res => {

                    dispatch({
                        type: "SET_CONVERSATIONS",
                        payload: res.data?.data
                    })

                })

                //check conversation list again 
                axios.post("/api/chat/getAllConvMess").then(res => {

                    //shoud check is ther eany new messages
                    // **

                    //if there is new messages add it in to the store
                    dispatch({
                        type: "SET_MESSAGES",
                        payload: res.data?.data
                    })

                })

            }
        })


    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const swipe = (dir) => {
        // swiperef[0].current.swipe(dir) // Swipe the card!
    }
    useEffect(() => {
        setTimeout(() => {
            swipe("left")
        }, 5000)
    })
    return (<>
        <div className='tinderCards' >
            <div className='tinderCards__cardContainer' > {
                people && people.map((person, index) => (<TinderCard className='tinderCards__swipe' ref={swiperef[index]}
                    key={
                        person._id
                    }

                    preventSwipe={
                        ['up', 'down']
                    }
                    onSwipe={
                        (dir) => swiped(dir, person._id)
                    }
                    onCardLeftScreen={
                        () => outOfFrame(person._id)
                    } >
                    < div className='tinderCards__card'
                        style={
                            {
                                backgroundImage: `url(${person.avatar})`
                            }
                        } >
                        <h3 > {
                            person.username
                        } </h3> </div> </TinderCard>
                ))
            } </div> </div> </>
    )
}

export default TinderCards