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

        if (direction === "right") {
            axios.post("/api/tinder/userLikedOrDisliked", {
                user_id_to: user_to,
                behavior: (direction === "right") ? "LIKE" : "DISLIKE"
            })

        }
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