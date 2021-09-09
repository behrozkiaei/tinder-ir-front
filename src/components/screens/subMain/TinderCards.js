
import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'

import './css/TinderCards.css'

function TinderCards() {
    const [people, setPeople] = useState([])

    useEffect(() => {
        // database
        //     .collection('people')
        //     .onSnapshot((snapshot) =>
        //         setPeople(snapshot.docs.map((doc) => doc.data()))
        //     )

        setPeople(
            [
                {
                    name: "Behroz",
                    id: "122544685",
                    url: "https://pps.whatsapp.net/v/t61.24694-24/233234005_4140014469429649_8407626957343147274_n.jpg?ccb=11-4&oh=6f6568addb90e28db8da7019393480df&oe=613E4D9E"
                }
            ]
        )
    }, [])

    const swiped = (direction, nameToDelete) => {
        console.log('removing:' + nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <>
            <div className='tinderCards'>
                <div className='tinderCards__cardContainer'>
                    {people.map((person) => (
                        <TinderCard
                            className='tinderCards__swipe'
                            key={person.id}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => swiped(dir, person.name)}
                            onCardLeftScreen={() => outOfFrame(person.name)}
                        >
                            <div
                                className='tinderCards__card'
                                style={{ backgroundImage: `url(${person.url})` }}
                            >
                                <h3>{person.name}</h3>
                            </div>
                        </TinderCard>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TinderCards

