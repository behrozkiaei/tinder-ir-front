import Lottie from 'react-lottie';
import "./splashScreen.css"
import {
    useHistory
} from "react-router-dom"
import {
    useRef,
    useEffect,
} from "react";
import {
    io
} from "socket.io-client";

import {
    useSelector,
    useDispatch
} from "react-redux";

import axios from "axios"

import '../../services/firebase.js'
import {
    getMessaging,
    getToken
} from "firebase/messaging";

// import * as animationData from 'https://tinder.s3.ir-thr-at1.arvanstorage.com/tinder.json'
function SplashScreen() {
    const history = useHistory();
    const socket = useRef();

    const Auth = useSelector(state => state.Auth.user);
    const dispatch = useDispatch();

    console.log("herer in splash")


    useEffect(() => {



        // Get registration token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        const messaging = getMessaging();
        getToken(messaging, {
            vapidKey: 'BAfVd_M5hjRY8W1j660xl-BsgK-WzLPngsv9FUNenhBjYh5MXorBu0jrEIZuD2AFTZp7PYW7OBV1X23QTqmFtl0'
        }).then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                console.log(currentToken)
                // ...

                if (Auth.user?.username) {

                    // send Token to database
                    axios.post("/api/tinder/updateUserInfo", {
                        username: Auth.user?.username,
                        fcmToken: currentToken,
                    })
                }
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    }, [])


    useEffect(() => {
        console.log("herer")



        socket.current = io("ws://localhost:5000");

        //take userId and socketId from user
        socket.current.emit("userOnline", Auth?.user._id);


        const userInfo = async () => {

            try {

                const res = await axios.get("/api/tinder/getUserInfo")

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res?.data?.data
                })



                setTimeout(() => {
                    history.push("/main")
                }, 2000)

            } catch (errror) {

            }
        }
        userInfo();

        axios.get("/api/tinder/getCards").then(res => {
            dispatch({
                type: "SET_CARDS",
                payload: res.data?.data
            })
        })
        axios.get("/api/chat/getUserConversation").then(res => {

            dispatch({
                type: "SET_CONVERSATIONS",
                payload: res.data?.data
            })

        })

        //get all messages 
        axios.post("/api/chat/getAllConvMess").then(res => {

            //shoud check is ther eany new messages
            // **

            //if there is new messages add it in to the store
            dispatch({
                type: "SET_MESSAGES",
                payload: res.data?.data
            })

        })

        //is listenning that any user send me  a message
        socket.current.on("getMessage", (data) => {
            console.log("is listennign a user send mesage :" + data)
            dispatch({
                type: "ADD_MESSAGE",
                payload: data,
            });

        });


        //is listenning that any usermatch me and a new conversation start
        socket.current.on("newConversation", (data) => {
            console.log("is listennign a user send mesage :" + data)
            dispatch({
                type: "ADD_CONVERSATION",
                payload: data,
            });

        });

        socket
            .current
            .on("global", data => {
                console.log("client recived a global message", data)
            })

    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: {
            "v": "4.8.0",
            "meta": {
                "g": "LottieFiles AE ",
                "a": "",
                "k": "",
                "d": "",
                "tc": ""
            },
            "fr": 25,
            "ip": 0,
            "op": 50,
            "w": 240,
            "h": 240,
            "nm": "channel-tinder",
            "ddd": 0,
            "assets": [],
            "layers": [{
                "ddd": 0,
                "ind": 1,
                "ty": 4,
                "nm": "flame-white",
                "sr": 1,
                "ks": {
                    "o": {
                        "a": 0,
                        "k": 100,
                        "ix": 11
                    },
                    "r": {
                        "a": 0,
                        "k": 0,
                        "ix": 10
                    },
                    "p": {
                        "a": 0,
                        "k": [118.125, 261.625, 0],
                        "ix": 2
                    },
                    "a": {
                        "a": 0,
                        "k": [-1.875, 70.75, 0],
                        "ix": 1
                    },
                    "s": {
                        "a": 0,
                        "k": [100, 100, 100],
                        "ix": 6
                    }
                },
                "ao": 0,
                "shapes": [{
                    "ty": "gr",
                    "it": [{
                        "ind": 0,
                        "ty": "sh",
                        "ix": 1,
                        "ks": {
                            "a": 0,
                            "k": {
                                "i": [
                                    [15.5, 1.5],
                                    [13.5, -4.75],
                                    [2.25, 0.25],
                                    [0, -32.75],
                                    [-29.25, 0],
                                    [0, 42.75]
                                ],
                                "o": [
                                    [3.5, 43],
                                    [-6.75, -8.75],
                                    [-2.25, -0.25],
                                    [0, 38],
                                    [28.25, 0],
                                    [0, -42.75]
                                ],
                                "v": [
                                    [2.25, -70.5],
                                    [-26.5, -14.25],
                                    [-32.75, -36],
                                    [-61.75, 11.5],
                                    [-3.5, 70.75],
                                    [58, 8.25]
                                ],
                                "c": true
                            },
                            "ix": 2
                        },
                        "nm": "Path 1",
                        "mn": "ADBE Vector Shape - Group",
                        "hd": false
                    }, {
                        "ty": "fl",
                        "c": {
                            "a": 0,
                            "k": [1, 1, 1, 1],
                            "ix": 4
                        },
                        "o": {
                            "a": 0,
                            "k": 100,
                            "ix": 5
                        },
                        "r": 1,
                        "bm": 0,
                        "nm": "Fill 1",
                        "mn": "ADBE Vector Graphic - Fill",
                        "hd": false
                    }, {
                        "ty": "tr",
                        "p": {
                            "a": 0,
                            "k": [0, 0],
                            "ix": 2
                        },
                        "a": {
                            "a": 0,
                            "k": [0, 71],
                            "ix": 1
                        },
                        "s": {
                            "a": 0,
                            "k": [100, 100],
                            "ix": 3
                        },
                        "r": {
                            "a": 0,
                            "k": 0,
                            "ix": 6
                        },
                        "o": {
                            "a": 0,
                            "k": 100,
                            "ix": 7
                        },
                        "sk": {
                            "a": 0,
                            "k": 2,
                            "ix": 4
                        },
                        "sa": {
                            "a": 1,
                            "k": [{
                                "i": {
                                    "x": [0.833],
                                    "y": [0.833]
                                },
                                "o": {
                                    "x": [0.167],
                                    "y": [0.167]
                                },
                                "t": 0,
                                "s": [0]
                            }, {
                                "t": 50,
                                "s": [1080]
                            }],
                            "ix": 5
                        },
                        "nm": "Transform"
                    }],
                    "nm": "Shape 1",
                    "np": 2,
                    "cix": 2,
                    "bm": 0,
                    "ix": 1,
                    "mn": "ADBE Vector Group",
                    "hd": false
                }],
                "ip": 0,
                "op": 100,
                "st": 0,
                "bm": 0
            }, {
                "ddd": 0,
                "ind": 2,
                "ty": 4,
                "nm": "flame-red",
                "sr": 1,
                "ks": {
                    "o": {
                        "a": 0,
                        "k": 50,
                        "ix": 11
                    },
                    "r": {
                        "a": 0,
                        "k": 0,
                        "ix": 10
                    },
                    "p": {
                        "a": 0,
                        "k": [118.125, 261.625, 0],
                        "ix": 2
                    },
                    "a": {
                        "a": 0,
                        "k": [-1.875, 70.75, 0],
                        "ix": 1
                    },
                    "s": {
                        "a": 0,
                        "k": [100, 100, 100],
                        "ix": 6
                    }
                },
                "ao": 0,
                "shapes": [{
                    "ty": "gr",
                    "it": [{
                        "ind": 0,
                        "ty": "sh",
                        "ix": 1,
                        "ks": {
                            "a": 0,
                            "k": {
                                "i": [
                                    [15.5, 1.5],
                                    [13.5, -4.75],
                                    [2.25, 0.25],
                                    [0, -32.75],
                                    [-29.25, 0],
                                    [0, 42.75]
                                ],
                                "o": [
                                    [3.5, 43],
                                    [-6.75, -8.75],
                                    [-2.25, -0.25],
                                    [0, 38],
                                    [28.25, 0],
                                    [0, -42.75]
                                ],
                                "v": [
                                    [2.25, -70.5],
                                    [-26.5, -14.25],
                                    [-32.75, -36],
                                    [-61.75, 11.5],
                                    [-3.5, 70.75],
                                    [58, 8.25]
                                ],
                                "c": true
                            },
                            "ix": 2
                        },
                        "nm": "Path 1",
                        "mn": "ADBE Vector Shape - Group",
                        "hd": false
                    }, {
                        "ty": "fl",
                        "c": {
                            "a": 0,
                            "k": [0.58431372549, 0, 0.156862745098, 1],
                            "ix": 4
                        },
                        "o": {
                            "a": 0,
                            "k": 100,
                            "ix": 5
                        },
                        "r": 1,
                        "bm": 0,
                        "nm": "Fill 1",
                        "mn": "ADBE Vector Graphic - Fill",
                        "hd": false
                    }, {
                        "ty": "tr",
                        "p": {
                            "a": 0,
                            "k": [0, 0],
                            "ix": 2
                        },
                        "a": {
                            "a": 0,
                            "k": [0, 71],
                            "ix": 1
                        },
                        "s": {
                            "a": 0,
                            "k": [106, 100],
                            "ix": 3
                        },
                        "r": {
                            "a": 0,
                            "k": 0,
                            "ix": 6
                        },
                        "o": {
                            "a": 0,
                            "k": 100,
                            "ix": 7
                        },
                        "sk": {
                            "a": 0,
                            "k": 3,
                            "ix": 4
                        },
                        "sa": {
                            "a": 1,
                            "k": [{
                                "i": {
                                    "x": [0.833],
                                    "y": [0.833]
                                },
                                "o": {
                                    "x": [0.167],
                                    "y": [0.167]
                                },
                                "t": -34,
                                "s": [0]
                            }, {
                                "i": {
                                    "x": [0.833],
                                    "y": [0.833]
                                },
                                "o": {
                                    "x": [0.167],
                                    "y": [0.167]
                                },
                                "t": 16,
                                "s": [720]
                            }, {
                                "t": 66,
                                "s": [0]
                            }],
                            "ix": 5
                        },
                        "nm": "Transform"
                    }],
                    "nm": "Shape 1",
                    "np": 2,
                    "cix": 2,
                    "bm": 0,
                    "ix": 1,
                    "mn": "ADBE Vector Group",
                    "hd": false
                }],
                "ip": -34,
                "op": 66,
                "st": -34,
                "bm": 0
            }, {
                "ddd": 0,
                "ind": 3,
                "ty": 4,
                "nm": "flame-orange",
                "sr": 1,
                "ks": {
                    "o": {
                        "a": 0,
                        "k": 50,
                        "ix": 11
                    },
                    "r": {
                        "a": 0,
                        "k": 0,
                        "ix": 10
                    },
                    "p": {
                        "a": 0,
                        "k": [118.125, 261.625, 0],
                        "ix": 2
                    },
                    "a": {
                        "a": 0,
                        "k": [-1.875, 70.75, 0],
                        "ix": 1
                    },
                    "s": {
                        "a": 0,
                        "k": [103, 102, 100],
                        "ix": 6
                    }
                },
                "ao": 0,
                "shapes": [{
                    "ty": "gr",
                    "it": [{
                        "ind": 0,
                        "ty": "sh",
                        "ix": 1,
                        "ks": {
                            "a": 0,
                            "k": {
                                "i": [
                                    [15.5, 1.5],
                                    [13.5, -4.75],
                                    [2.25, 0.25],
                                    [0, -32.75],
                                    [-29.25, 0],
                                    [0, 42.75]
                                ],
                                "o": [
                                    [3.5, 43],
                                    [-6.75, -8.75],
                                    [-2.25, -0.25],
                                    [0, 38],
                                    [28.25, 0],
                                    [0, -42.75]
                                ],
                                "v": [
                                    [2.25, -70.5],
                                    [-26.5, -14.25],
                                    [-32.75, -36],
                                    [-61.75, 11.5],
                                    [-3.5, 70.75],
                                    [58, 8.25]
                                ],
                                "c": true
                            },
                            "ix": 2
                        },
                        "nm": "Path 1",
                        "mn": "ADBE Vector Shape - Group",
                        "hd": false
                    }, {
                        "ty": "fl",
                        "c": {
                            "a": 0,
                            "k": [0.984313785329, 0.596078431373, 0.454901990704, 1],
                            "ix": 4
                        },
                        "o": {
                            "a": 0,
                            "k": 100,
                            "ix": 5
                        },
                        "r": 1,
                        "bm": 0,
                        "nm": "Fill 1",
                        "mn": "ADBE Vector Graphic - Fill",
                        "hd": false
                    }, {
                        "ty": "tr",
                        "p": {
                            "a": 0,
                            "k": [0, 0],
                            "ix": 2
                        },
                        "a": {
                            "a": 0,
                            "k": [0, 71],
                            "ix": 1
                        },
                        "s": {
                            "a": 0,
                            "k": [103, 103],
                            "ix": 3
                        },
                        "r": {
                            "a": 0,
                            "k": 0,
                            "ix": 6
                        },
                        "o": {
                            "a": 0,
                            "k": 100,
                            "ix": 7
                        },
                        "sk": {
                            "a": 0,
                            "k": 2,
                            "ix": 4
                        },
                        "sa": {
                            "a": 1,
                            "k": [{
                                "i": {
                                    "x": [0.833],
                                    "y": [0.833]
                                },
                                "o": {
                                    "x": [0.167],
                                    "y": [0.167]
                                },
                                "t": -14,
                                "s": [0]
                            }, {
                                "i": {
                                    "x": [0.833],
                                    "y": [0.833]
                                },
                                "o": {
                                    "x": [0.167],
                                    "y": [0.167]
                                },
                                "t": 36,
                                "s": [720]
                            }, {
                                "t": 86,
                                "s": [0]
                            }],
                            "ix": 5
                        },
                        "nm": "Transform"
                    }],
                    "nm": "Shape 1",
                    "np": 2,
                    "cix": 2,
                    "bm": 0,
                    "ix": 1,
                    "mn": "ADBE Vector Group",
                    "hd": false
                }],
                "ip": -14,
                "op": 86,
                "st": -14,
                "bm": 0
            }, {
                "ddd": 0,
                "ind": 4,
                "ty": 4,
                "nm": "background",
                "sr": 1,
                "ks": {
                    "o": {
                        "a": 0,
                        "k": 100,
                        "ix": 11
                    },
                    "r": {
                        "a": 0,
                        "k": 0,
                        "ix": 10
                    },
                    "p": {
                        "a": 0,
                        "k": [120, 120, 0],
                        "ix": 2
                    },
                    "a": {
                        "a": 0,
                        "k": [-2.06, -0.56, 0],
                        "ix": 1
                    },
                    "s": {
                        "a": 0,
                        "k": [100, 100, 100],
                        "ix": 6
                    }
                },
                "ao": 0,
                "sy": [{
                    "bm": {
                        "a": 0,
                        "k": 1,
                        "ix": 1
                    },
                    "o": {
                        "a": 0,
                        "k": 100,
                        "ix": 2
                    },
                    "gf": {
                        "a": 0,
                        "ix": 3
                    },
                    "gs": {
                        "a": 0,
                        "k": 100,
                        "ix": 4
                    },
                    "a": {
                        "a": 0,
                        "k": 66,
                        "ix": 5
                    },
                    "gt": {
                        "a": 0,
                        "k": 1,
                        "ix": 6
                    },
                    "re": {
                        "a": 0,
                        "k": 0,
                        "ix": 7
                    },
                    "al": {
                        "a": 0,
                        "k": 1,
                        "ix": 8
                    },
                    "s": {
                        "a": 0,
                        "k": 100,
                        "ix": 9
                    },
                    "of": {
                        "a": 0,
                        "k": [0, 0],
                        "ix": 10
                    },
                    "ty": 8,
                    "nm": "Gradient Overlay"
                }],
                "shapes": [{
                    "ty": "gr",
                    "it": [{
                        "ty": "rc",
                        "d": 1,
                        "s": {
                            "a": 0,
                            "k": [240, 240],
                            "ix": 2
                        },
                        "p": {
                            "a": 0,
                            "k": [0, 0],
                            "ix": 3
                        },
                        "r": {
                            "a": 0,
                            "k": 20,
                            "ix": 4
                        },
                        "nm": "Rectangle Path 1",
                        "mn": "ADBE Vector Shape - Rect",
                        "hd": false
                    }, {
                        "ty": "st",
                        "c": {
                            "a": 0,
                            "k": [1, 1, 1, 1],
                            "ix": 3
                        },
                        "o": {
                            "a": 0,
                            "k": 100,
                            "ix": 4
                        },
                        "w": {
                            "a": 0,
                            "k": 0,
                            "ix": 5
                        },
                        "lc": 1,
                        "lj": 1,
                        "ml": 4,
                        "bm": 0,
                        "nm": "Stroke 1",
                        "mn": "ADBE Vector Graphic - Stroke",
                        "hd": false
                    }, {
                        "ty": "gf",
                        "o": {
                            "a": 0,
                            "k": 100,
                            "ix": 10
                        },
                        "r": 1,
                        "bm": 0,
                        "g": {
                            "p": 9,
                            "k": {
                                "a": 0,
                                "k": [0, 0.925, 0.29, 0.475, 0.125, 0.947, 0.298, 0.453, 0.25, 0.969, 0.306, 0.431, 0.375, 0.978, 0.31, 0.422, 0.499, 0.988, 0.314, 0.412, 0.625, 0.99, 0.329, 0.398, 0.75, 0.992, 0.345, 0.384, 0.875, 0.994, 0.39, 0.355, 1, 0.996, 0.435, 0.325],
                                "ix": 9
                            }
                        },
                        "s": {
                            "a": 0,
                            "k": [-114.368, 112.046],
                            "ix": 5
                        },
                        "e": {
                            "a": 0,
                            "k": [113.834, -114.899],
                            "ix": 6
                        },
                        "t": 1,
                        "nm": "Gradient Fill 1",
                        "mn": "ADBE Vector Graphic - G-Fill",
                        "hd": false
                    }, {
                        "ty": "tr",
                        "p": {
                            "a": 0,
                            "k": [-2.06, -0.56],
                            "ix": 2
                        },
                        "a": {
                            "a": 0,
                            "k": [0, 0],
                            "ix": 1
                        },
                        "s": {
                            "a": 0,
                            "k": [100, 100],
                            "ix": 3
                        },
                        "r": {
                            "a": 0,
                            "k": 0,
                            "ix": 6
                        },
                        "o": {
                            "a": 0,
                            "k": 100,
                            "ix": 7
                        },
                        "sk": {
                            "a": 0,
                            "k": 0,
                            "ix": 4
                        },
                        "sa": {
                            "a": 0,
                            "k": 0,
                            "ix": 5
                        },
                        "nm": "Transform"
                    }],
                    "nm": "Rectangle 1",
                    "np": 3,
                    "cix": 2,
                    "bm": 0,
                    "ix": 1,
                    "mn": "ADBE Vector Group",
                    "hd": false
                }],
                "ip": 0,
                "op": 100,
                "st": 0,
                "bm": 0
            }],
            "markers": []
        },
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (<
        div className="lottieContainer" >
        <
            Lottie options={
                defaultOptions
            }
            height={
                400
            }
            width={
                400
            }
        />

        <
        /div>
        )
}

        export default SplashScreen