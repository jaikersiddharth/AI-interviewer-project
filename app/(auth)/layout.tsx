import React, { ReactNode } from "react";
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from "next/navigation";
async function AuthLayout ({children}:{children:ReactNode}) {
    const authenticated = await isAuthenticated(); 
      if(authenticated) { 
        redirect('/');
      }
    return (
    <div className="auth-layout">{children}</div>
)};

export default AuthLayout;