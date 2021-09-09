import "./css/Profile.css"
import Header from "./Header"
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person'
import { IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
function Profile() {
    return (
        <>
            <Header />
            <div class="pro-container">
                <div className="clip">

                </div>
                <div class="avatar-box">
                    {/* <img src="./person.png" /> */}
                    <PersonIcon className="noAvatar" style={{ fontSize: 100 }} color="primary" ></PersonIcon>
                    <EditIcon class="edit-avatar"></EditIcon>
                    <p color="secondary">Behroooz</p>
                </div>

                <div className="info">
                    <div className="edit">
                        <IconButton className="icon-box">
                            <SettingsIcon style={{ fontSize: 80, color: "white" }} />
                        </IconButton>
                        <p color="secondary">Edit Profile</p>
                    </div>
                    <div className="upload-image">
                        <IconButton className="icon-box">
                            <PhotoCameraIcon style={{ fontSize: 80, color: "white" }} />
                        </IconButton>
                        <p color="secondary">Upload Image</p>
                    </div>
                    <div className="setting">
                        <IconButton className="icon-box">
                            <EditIcon style={{ fontSize: 80, color: "white" }} />
                        </IconButton>
                        <p color="secondary">Setting</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
