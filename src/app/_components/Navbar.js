import Link from "next/link";
import { IoHomeOutline, IoCreateOutline } from "react-icons/io5";
import "../globals.css"
export default function Header() {
  return (
    <header className="  text-white flex justify-center items-center bg-slate-900">
      <nav className="  flex flex-row h-full gap-8">
        <Link
          href="/"
          className="text-xl  font-extralight flex flex-row items-center gap-3 p-3 duration-500 border-b-4  border-transparent hover:border-b-indigo-600 hover:text-indigo-400"
        >
          <IoHomeOutline />
          HOME
        </Link>
        <Link
          href="/create"
          className="text-xl font-extralight flex flex-row items-center gap-3 p-3 duration-500 border-b-4  border-transparent hover:border-b-indigo-600 hover:text-indigo-400"
        >
          <IoCreateOutline />
          CREATE POST
        </Link>
      </nav>
    </header>
  );
}
