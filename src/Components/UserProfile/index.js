import "./index.css";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import LogIn from "../LogIn";
import {Link, useNavigate} from "react-router-dom";
import {FaBaby, FaThumbsUp} from "react-icons/fa";
import {PostCards} from "../Post-cards";
import {profile, signOut} from "./client";
import {setUser} from "../../Reducers/userReducer";

export default function UserProfile(){
    const [user, SetUser] = useState(null);
    const [error, SetError] = useState('');
    const navigate = useNavigate();
    const fetchProfile = async ()=>{
        try{
            const current = await profile();
            if(current){SetUser(current)}
        } catch(error){
            SetError(error.message + " :Failed to fetch account information");
        }

    }
    const logOut = async ()=>{
        await signOut();
        navigate("/home");
    }

    useEffect(()=>{
        fetchProfile();
    }, [user]);


    return (
            <div>
                {user?(<div className="et-main-wrapper row ">
                    <div className="col-sm-auto  d-flex justify-content-center w-100">
                        <div className="d-block">
                            {/* Profile Picture */}

                            <img src={"#"} alt="" className="form-control et-profile-picture mb-4"/>

                            {/* Username */}
                            <div className="justify-content-center d-flex mb-2">
                                <strong className="h5">{user.nickname}</strong>
                            </div>

                            <div className="d-flex justify-content-around">
                                {/* Direct to show the list of the followers */}
                                <p>Posts <strong>{user.posts.length}</strong></p>
                                <Link to="" className="et-user-follow">
                                    Followers <strong> {user.followersCount}</strong>
                                </Link>
                                {/* Direct to show the list of the following users */}
                                <Link to="" className="et-user-follow">
                                    Following <strong> {user.followingCount}</strong>
                                </Link>
                            </div>


                            <p className="mt-3">
                                {user.personalBio}
                            </p>

                            <div className="d-block float-end mt-5 w-100">
                                {/* Show Edit Profile button if logged in*/}
                                {/* Currently shows if false for testing */}
                                {
                                    <div className={"d-flex justify-content-between"}>
                                        <button className={"btn btn-danger"}
                                        onClick={logOut}>
                                            Log Out
                                        </button>
                                        <Link to="/profile-setting"
                                              className="btn btn-outline-dark et-edit-profile-btn">
                                            Edit Profile
                                        </Link>
                                    </div>

                                }
                            </div>


                        </div>
                    </div>
                    <div className="col-lg-9 mt-3 d-flex justify-content-center w-100">
                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            {/* Should be a map function here to map out every post
                        that belongs to the user*/}

                            {user.posts.map((post)=>PostCards(post))};



                        </div>

                    </div>


                </div>)
                     :
                 (<div>
                     {error !== '' && <div className={"alert alert-danger mt-2"} role={"alert"}>
                         {error}
                     </div>}
                     <p className={"mt-2 h2"}>You are not logged in</p>
                 </div>)}
            </div>


    )
};