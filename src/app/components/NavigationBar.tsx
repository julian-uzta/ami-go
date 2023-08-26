import Link from "next/link";

export const NavigationBar = () => {
  return (
    <div className="navbar bg-base-100 p-0">
      <Link className="btn btn-ghost normal-case text-xl px-6" href="/">
        <div>
          <img height="25px" width="115px" src="logo_ami-go.png"></img>
        </div>
      </Link>
    </div>
  )
};