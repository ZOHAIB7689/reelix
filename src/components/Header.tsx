"use client"

import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link';

export default function Header() {

    const {data:session}=useSession();
    const handleSignOut = async ()=>{
        try {
            await signOut()
        } catch (error) {
            
        }
    }
  return (
    <div>
      <button onClick={handleSignOut}>SignOut</button>
      {session ? (
        <div>Welcome</div>
      ) : (
        <>
          <Link href="register">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
    </div>
  );
}
