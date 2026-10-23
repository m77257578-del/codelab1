"use client";import {useEffect,useState} from "react";import {onAuthStateChanged,User} from "firebase/auth";import {auth} from "./firebase";
export function useUser(){const[u,setU]=useState<User|null>(null);const[ready,setR]=useState(false);
useEffect(()=>onAuthStateChanged(auth,x=>{setU(x);setR(true)}),[]);return{user:u,ready}}
