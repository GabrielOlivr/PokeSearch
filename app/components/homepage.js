"use client";

import { GoSearch } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import { IoPerson, IoMenu, IoStar, IoBasketballSharp, IoMoonOutline  } from "react-icons/io5";
import { IoLogoDribbble } from "react-icons/io";
import { FaFootballBall } from "react-icons/fa";
import { GiHockey, GiSoccerBall } from "react-icons/gi";
import { useUserAuth } from "../_utils/auth-context";
import { useState, useEffect } from "react";

const LogoutModal = ({ showModal, setShowModal, onConfirmLogout }) => {
   const handleClose = () => {
      setShowModal(false); // Close the modal when the close button is clicked
   };

   const handleClickOutside = (e) => {
      if (e.target === e.currentTarget) {
         setShowModal(false); // Close the modal if clicked outside
      }
   };

   return (
      <div 
         className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${!showModal && 'hidden'}`} 
         onClick={handleClickOutside}
      >
         <div className="bg-slate-800 p-6 rounded-md text-white relative">
            {/* Close button */}
            <button 
               onClick={handleClose} 
               className="absolute top-2 right-2 text-white text-xl font-bold hover:text-slate-950"
            >
               &times;
            </button>

            <h2 className="flex items-center text-xl font-mono font-bold">Logout</h2>
            <p className="text-sm font-mono mt-2">Are you sure you want to logout?</p>
            <div className="flex flex-col gap-2 mt-4">
               <button 
                  onClick={onConfirmLogout} 
                  className="bg-slate-600 text-white px-8 py-3 font-mono rounded-md hover:bg-slate-950 w-full"
               >
                  YES
               </button>
               <button 
                  onClick={handleClose} 
                  className="bg-slate-600 text-white px-8 py-3 font-mono rounded-md hover:bg-slate-950 w-full"
               >
                  NO
               </button>
            </div>
         </div>
      </div>
   );
};

export default function HomePage() {
   const { gitHubSignIn, user, firebaseSignOut } = useUserAuth();
   const [userName, setUserName] = useState('');
   const [menuOpen, setMenuOpen] = useState(false);
   const [logoutMenuOpen, setLogoutMenuOpen] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      if (user) {
         setUserName(user.displayName || user.email);
      }
   }, [user]);

   const toggleMenu = () => {
      setMenuOpen(!menuOpen);
      setLogoutMenuOpen(false); // Ensure the logout menu closes when the IoMenu is opened
   };

   const toggleLogoutMenu = () => {
      setLogoutMenuOpen(!logoutMenuOpen);
      setMenuOpen(false); // Ensure the IoMenu closes when the logout menu is opened
   };

   const handleLogout = () => {
      setShowModal(true); 
   };

   const confirmLogout = () => {
      firebaseSignOut(); 
      setShowModal(false);  
   };

   const toggleDarkMode = () => {
      setDarkMode(!darkMode);
   };

   return (
      <main className={`${darkMode ? 'bg-slate-950' : 'bg-white'} min-h-screen`}>
         <div className="bg-slate-900">
            <header className="flex items-center justify-between p-4">
               <div className="flex items-center space-x-1">
                  <div> {/* Play around with logo here: color, etc. */}
                     <span><IoLogoDribbble size={"2.5em"}/></span>
                  </div>
                  <h1 className="font-mono text-xl font-bold">SportSphere</h1>
               </div>
               <div className="flex items-center space-x-4">
                  <button className="flex items-center p-2 bg-slate-800 rounded-md hover:bg-slate-950"><GoSearch size={"1.5em"} /></button>
                  {user ? (
                     <div className="relative">
                        {/* Button to toggle the logout menu */}
                        <button
                           onClick={toggleLogoutMenu}
                           className="flex items-center p-2 bg-slate-800 rounded-md hover:bg-slate-950 font-mono gap-2"
                        >
                           <IoPerson size={"1.5em"} />
                           {user.displayName || user.email}
                        </button>
                        {logoutMenuOpen && (
                           <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg">
                              <button
                                 onClick={handleLogout} 
                                 className="flex items-center w-full text-left p-2 hover:bg-slate-950 text-red-600"
                              >
                                 <MdOutlineLogout size={"1.5em"} className="mr-2" />
                                 Logout
                              </button>
                           </div>
                        )}
                     </div>
                  ) : (
                     <button
                        onClick={gitHubSignIn}
                        className="flex items-center p-2 bg-slate-800 rounded-md hover:bg-slate-950 font-mono"
                     >
                        <IoPerson size={"1.5em"} /> LOGIN
                     </button>
                  )}
                  {/* IoMenu dropdown */}
                  <div className="relative">
                     <button
                        onClick={toggleMenu}
                        className="flex items-center p-2 bg-slate-800 rounded-md hover:bg-slate-950 font-mono"
                     >
                        <IoMenu size={"1.5em"} />
                     </button>
                     {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg">
                           {/* Dark Mode Toggle */}
                           <div className="flex items-center justify-between p-2">
                              <span className="text-white text-sm font-mono flex items-center gap-2"><IoMoonOutline size={"1.3em"}/>Dark Mode</span>
                              <button
                                 onClick={toggleDarkMode}
                                 className={`w-10 h-5 flex items-center justify-center rounded-full ${darkMode ? 'bg-green-600' : 'bg-gray-400'}`}
                              >
                                 <div className={`w-3 h-3 bg-white rounded-full transform ${darkMode ? 'translate-x-3' : 'translate-x-0'}`}></div>
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </header>
            <div className="flex items-center space-x-4 p-4">
               <button className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><IoStar size={"1.3em"} />FAVORITES</button>
               <button className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><FaFootballBall size={"1.1em"} />FOOTBALL</button>
               <button className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><GiHockey size={"1.1em"} />HOCKEY</button>
               <button className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><GiSoccerBall size={"1.1em"} />SOCCER</button>
               <button className="flex items-center p-2 font-mono gap-2 text-gray-400 hover:text-white"><IoBasketballSharp size={"1.1em"} />BASKETBALL</button>
            </div>
         </div>
         <LogoutModal 
            showModal={showModal} 
            setShowModal={setShowModal} 
            onConfirmLogout={confirmLogout} 
         />
      </main>
   );
}
