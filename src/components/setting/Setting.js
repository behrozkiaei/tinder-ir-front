import "./Setting.scss"
import { useDispatch } from "react-redux"
import Header from "../screens/Header";
import { useHistory } from "react-router-dom"
function Setting() {

    const history = useHistory()
    const dispatch = useDispatch();


    const logOut = () => {

        dispatch({
            type: "LOGOUT"
        })
        history.push("/login")
    }
    return (
        <>
            <Header />
            <div className="main">
                <button className="customBtn" onClick={logOut}>Exit</button>
            </div>
        </>
    )
}

export default Setting
