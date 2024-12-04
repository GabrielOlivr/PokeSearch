"use client"
import { AuthContextProvider } from "./_utils/auth-context";
import NavBar from "./components/navbar";


export default function Page(){



  return(
   <AuthContextProvider>
     <NavBar/>
  </AuthContextProvider>

  
  )
}
