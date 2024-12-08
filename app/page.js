"use client"
import { AuthContextProvider, useUserAuth } from "./_utils/auth-context";
import CardsPage from "./cards/page";
import HomePage from "./components/homepage";

export default function Page() {
  return (
    <AuthContextProvider>
      <HomePage />
      <AuthenticatedContent /> 
    </AuthContextProvider>
  );
}

function AuthenticatedContent() {
  const { user } = useUserAuth();
  
  if (user) {
    return <CardsPage />;
  }
  
  return null;
}
