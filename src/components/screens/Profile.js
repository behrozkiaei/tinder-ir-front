import "./css/Profile.css"
import Header from "./Header"
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person'
import { IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useState, useEffect } from "react";
import axios from "axios"
function Profile() {


    const [avatarLoading, setAvatarLoader] = useState(null)
    const [avatarError, setAvatarError] = useState(null)

    const [avatar, setAvatar] = useState(null)
    const [images, setImages] = useState([])


    useEffect(() => {
    }, [avatar, images])
    const handleFileInput = async (fileUploaded, type = "avatar") => {
        setAvatarLoader(true)
        console.log(fileUploaded)

        if (fileUploaded.size > 2024000) {
            setAvatarError("File size cannot exceed more than 1MB");
            setAvatarLoader(false)
            return false;
        }


        const formData = new FormData();
        formData.append("file", fileUploaded);
        formData.append("type", type);
        axios.post("/api/upload", formData).then((res) => {
            console.log(res?.data?.fileUrl || null)



            if (type === "avatar" && res?.data?.fileUrl)
                setAvatar(res.data.fileUrl || null)

            if (type === "image" && res?.data)
                setImages(pre => [...pre, res.data.image])


        }).catch(e => {
            setAvatarError(e.response?.data?.error || "Network Erro");
            setTimeout(() => {
                setAvatarError("");
            }, 5000);

        }).finally(() => {
            setAvatarLoader(false)
        });

    }

    const imageList = images.map((d) => <div className="box" >
        <img src={d}></img>
    </div>);
    return (
        <>
            <Header />
            <div className="pro-container">
                <div className="clip">

                </div>
                {
                    images.length > 0 &&
                    <div className="image-slider" >
                        {imageList}
                    </div>
                }


                <div className="avatar-box">
                    {avatar &&
                        <img src={avatar} />
                    }
                    {!avatar &&
                        <label htmlFor="avatarUplade">
                            <PersonIcon className="noAvatar" style={{ fontSize: 100 }} color="primary" ></PersonIcon>
                            <EditIcon className="edit-avatar" color="secondary"></EditIcon>
                        </label>

                    }
                    <p color="secondary">Behroooz</p>
                    <form>
                        <input type="file" className="upload-avatar" id="avatarUplade" onChange={(e) => handleFileInput(e.target.files[0], "avatar")} />
                    </form>
                </div>

                <div className="info">
                    <div className="edit">
                        <IconButton className="icon-box">
                            <SettingsIcon style={{ fontSize: 80, color: "white" }} />
                        </IconButton>
                        <p color="secondary">Edit Profile</p>
                    </div>
                    <div className="upload-image">
                        <IconButton className="icon-box" htmlFor="imageUpload">
                            <label htmlFor="imageUpload" className="uplaodBoxHidden">
                            </label>
                            <PhotoCameraIcon style={{ fontSize: 80, color: "white" }} />
                        </IconButton>
                        <p color="secondary">Upload Image</p>
                        <form>
                            <input type="file" className="upload-avatar" id="imageUpload" onChange={(e) => handleFileInput(e.target.files[0], "image")} />
                        </form>
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
