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
import SwipeButtons from './SwipeButtons';
function TinderCards({ person }) {

    const $cards = useSelector(state => state.Cards)
    const [people, setPeople] = useState(person)
    const dispatch = useDispatch();
    const alreadyRemoved = []
    const childRefs = useMemo(() => Array(people?.length).fill(10).map(i => React.createRef()), [])
    const swipe = (dir) => {
        const cardsLeft = people.filter(person => !alreadyRemoved.includes(person._id))
        if (cardsLeft.length) {
            const toBeRemoved = people[people.length - 1]._id // Find the card object to be removed
            const index = people.map(person => person._id).indexOf(toBeRemoved) // Find the index of which to make the reference to
            // const user_to = people.map(person => person._id) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index]?.current?.swipe(dir) // Swipe the card!
        }
    }
    useEffect(() => {
        // console.log(["sdf"].length ? 'true' : "false")
        setPeople($cards.cards || [])
        console.log($cards.cards)
    }, [$cards])

    const swiped = (direction, user_to) => {

        alreadyRemoved.push(user_to)
        sendBehave(direction, user_to)

    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }




    const sendBehave = async (direction, user_to) => {
        axios.post("/api/tinder/userLikedOrDisliked", {
            user_id_to: user_to,
            behavior: (direction === "right") ? "LIKE" : "DISLIKE"
        }).then(res => {





            //remove the card from list
            dispatch({
                type: "REMOVE_CARD",
                payload: user_to,
            })
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

    return (<>
        <div className='tinderCards' >
            <div className='tinderCards__cardContainer'>
                {
                    (people?.length === 0) &&
                    <p>No One found yet!</p>
                }
                {
                    (people) && people.map((person, index) => (<TinderCard className='tinderCards__swipe' ref={childRefs[index]}
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
                } </div>
            <SwipeButtons triggerCard={(dir) => swipe(dir)} />
        </div>


    </>
    )
}

export default TinderCards