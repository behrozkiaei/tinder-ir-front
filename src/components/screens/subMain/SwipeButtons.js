
import { IconButton } from '@material-ui/core'
import React from 'react'
import './css/SwipeButtons.css'
import ReplayIcon from '@material-ui/icons/Replay'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FlashOnIcon from '@material-ui/icons/FlashOn'

function SwipeButtons({ triggerCard }) {
    return (
        <div className='swipeButtons'>
            {/* <IconButton className='swipeButtons__repeat'>
                <ReplayIcon fontSize='large' />
            </IconButton> */}
            <IconButton className='swipeButtons__left' onClick={(e => triggerCard("left"))}>
                <CloseIcon />
            </IconButton>
            <IconButton className='swipeButtons__lightning' onClick={(e => triggerCard("right"))}>
                <FlashOnIcon sx={{ fontSize: 60 }} />
            </IconButton>
            <IconButton className='swipeButtons__right' onClick={(e => triggerCard("right"))}>
                <FavoriteIcon />
            </IconButton>
            {/* <IconButton className='swipeButtons__star'>
                <StarIcon fontSize='large' />
            </IconButton> */}
        </div>
    )
}

export default SwipeButtons