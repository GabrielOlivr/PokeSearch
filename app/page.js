"use client"

import { AuthContextProvider } from "./_utils/auth-context";
import HomePage from "./components/homepage";

export default function Page(){
  return(
    <AuthContextProvider>
     <HomePage/>  
    </AuthContextProvider>
  )
}
