import React from 'react'
import './css/Header.css'
import PersonIcon from '@material-ui/icons/Person'
import { IconButton } from '@material-ui/core'
import ForumIcon from '@material-ui/icons/Forum'
import { Link, useHistory } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
function Header({ backButton }) {

    const $messages = useSelector(state => state.Chat?.message)
    const [newMessage, setNewMessage] = useState(null)
    console.log($messages)
    const user = useSelector(Store => Store.Auth?.user)
    useEffect(() => {
        console.log($messages)
        setNewMessage(false)
        $messages?.some((d) => {
            console.log(d)
            if (d.status === "UNREAD" && d.user_to === user.user._id) {
                setNewMessage(true)
                // console.log("you have new message")

                return true;
            }
            return false
        }
        )
    }, [$messages])
    const history = useHistory()

    return (
        <div className='header'>
            {backButton ? (
                <IconButton onClick={() => history.replace(backButton)}>
                    <ArrowBackIosIcon fontSize='large' className='header__icon' />
                </IconButton>
            ) : (
                <Link to='/profile'>
                    <IconButton>
                        <PersonIcon />
                    </IconButton>
                </Link>
            )}

            <Link to='/main'>
                <img
                    className='header__logo'
                    src='/tinder.png'
                    alt='tinderLogo'
                />
            </Link>

            <Link to='/conversations' className="head-message">
                {newMessage &&

                    <span className="newMessage">&#8226;</span>
                }
                <IconButton>
                    <ForumIcon fontSize='large' />
                </IconButton>
            </Link>
        </div>
    )
}

export default Header