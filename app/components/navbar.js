"use client"

import { IoPerson, IoStar, IoBasketballSharp  } from "react-icons/io5";
import { IoLogoDribbble } from "react-icons/io";
import { FaFootballBall } from "react-icons/fa";
import { GiHockey, GiSoccerBall } from "react-icons/gi";
import Link from "next/link"
import { useUserAuth } from "../_utils/auth-context";
import { useState, useEffect } from "react";

export default function NavBar(){

    const {gitHubSignIn, user, firebaseSignOut} = useUserAuth();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (user) {
            setUserName(user.displayName || user.email);
        }
    })

    async function HandleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error)
        }
    } 

    async function HandleLogOut() {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <main className="bg-white min-h-screen">
            <div className="bg-slate-900">
                <header className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-1">
                        <div>
                            <span>{/*Logo*/}<IoLogoDribbble size={"2.5em"}/></span>
                        </div>
                        <h1 className="font-mono text-2xl font-bold">SportSphere</h1>
                    </div>
                    {user ? (
                        <div>
                            <button onClick={HandleLogOut} 
                                className="flex items-center p-2 bg-slate-800 rounded-md hover:bg-slate-950 font-mono gap-2">
                                <IoPerson size={"1.5em"}/>
                                {userName}
                            </button> {/*Form */}
                        </div>
                    ): (
                        <button
                            onClick={HandleSignIn}
                            className="flex items-center p-2 bg-slate-800 rounded-md hover:bg-slate-950 font-mono">
                            <IoPerson size={"1.5em"} /> Login
                        </button>
                    )}
                </header>
                <div>
                    <ul className="flex items-center space-x-4 p-4">
                        <li><Link href="./Favourites/" className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><IoStar size={"1.3em"}/>FAVOURITES</Link></li>
                        <li><Link href="./Football/" className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><FaFootballBall size={"1.3em"}/>FOOTBALL</Link></li>
                        <li><Link href="./Hockey/" className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><GiHockey size={"1.3em"}/>HOCKEY</Link></li>
                        <li><Link href="./Soccer/" className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><GiSoccerBall size={"1.3em"}/>SOCCER</Link></li>
                        <li><Link href="./Basketball/" className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><IoBasketballSharp size={"1.3em"}/>BASKETBALL</Link></li>
                    </ul>
                </div>
            </div>
        </main>
    )


}