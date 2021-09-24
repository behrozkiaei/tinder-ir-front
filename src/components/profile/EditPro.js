import axios from "axios";
import { useState, useEffect } from "react"
import Header from "../screens/Header";
import "./EditPro.scss"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress } from "@material-ui/core";
import { getUserInfo } from "../../services/user.js"
function EditPro() {
    // const [userName, setstate] = useState(initialState)
    //  const dispatch = useDispatch(function)
    //  useEffect(() => {
    //    return () => {
    //      effect
    //    };
    //  }, [input])

    const Auth = useSelector(state => state.Auth?.user)

    const [username, setUserName] = useState(Auth.user?.username || "")
    const [age, setAge] = useState(Auth.user?.age || "")
    const [gender, setGender] = useState(Auth.user?.gender || "male")

    const dispatch = useDispatch();

    const [loading, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const submitForm = async (e) => {
        e.preventDefault();
        setLoader(true)
        axios.post("/api/tinder/updateUserInfo", {
            username: username,
            gender: gender,
            age: age,
            email: Auth.user.email
        }).then(res => {
            getUserInfo(dispatch)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoader(false)
        })

    }


    return (
        <>
            <Header></Header>
            <div className="editPro">
                <form className="box" onSubmit={submitForm}>

                    <label htmlFor="">Username:</label>
                    <input className="custom" value={username || ""} onChange={(e) => setUserName(e.target.value)} ></input>
                    <label htmlFor="">Sge:</label>
                    <input className="custom" type="mobile" value={age || ""} onChange={(e) => setAge(e.target.value)}></input>
                    <label htmlFor="">Gender:</label>
                    <select className="custom" value={gender || "male"} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                    {/* <input type="submit" className="customBtn" value="Submit" /> */}

                    <button className="customBtn" type="submit" disabled={loading}>
                        {loading ? (
                            <CircularProgress color="secondary" size="20px" />
                        ) : (
                            "Submit"
                        )}
                    </button>
                </form>

            </div>
        </>
    )
}

export default EditPro
