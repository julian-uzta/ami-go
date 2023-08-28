import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


export const NavigationBar = () => {
  return (
    <div className="flex justify-between navbar bg-base-100 p-0">
      <Link className="btn btn-ghost normal-case text-xl mx-2 px-6" href="/">
        <div>
          <img height="25px" width="115px" src="logo_ami-go.png"></img>
        </div>
      </Link>
      <div className="px-6">
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <SignedOut>
          <SignInButton/>
        </SignedOut>
      </div>      
    </div>
  )
};