import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen flex flex-col items-center py-16">
      <SignIn />
    </div>
  )
}