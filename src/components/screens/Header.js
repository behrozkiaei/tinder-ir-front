import React from 'react'
import './css/Header.css'
import PersonIcon from '@material-ui/icons/Person'
import { IconButton } from '@material-ui/core'
import ForumIcon from '@material-ui/icons/Forum'
import { Link, useHistory } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


function Header({ backButton }) {

    const history = useHistory()

    return (
        <div className='header'>
            {backButton ? (
                <IconButton onClick={() => history.replace(backButton)}>
                    <ArrowBackIosIcon fontSize='large' className='header__icon' />
                </IconButton>
            ) : (
                <IconButton>
                    <PersonIcon />
                </IconButton>
            )}

            <Link to='/'>
                <img
                    className='header__logo'
                    src='/tinder.png'
                    alt='tinderLogo'
                />
            </Link>

            <Link to='/chat'>
                <IconButton>
                    <ForumIcon />
                </IconButton>
            </Link>
        </div>
    )
}

export default Header