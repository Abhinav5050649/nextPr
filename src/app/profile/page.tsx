"use client";
import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = React.useState("nothing");
    const logout = async() => {
        try{
            const response = await axios.get("/api/users/logout");
            toast.success("Logout Successful!")
            router.push("/login");
        }catch(error: any){
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async() => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id)
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <h2 className="p-3 rounded bg-green-500">{data === "nothing" ? "Nothing here" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button onClick={logout} className="bg-green-700 hover:bg-blue-900 mt-4 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button onClick={getUserDetails} className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded">Get User Details</button>
        </div>
    )
}