import Link from "next/link";
import LogoImage from "/public/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <nav className="bg-primary-200 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <div>
          <Link href="/">
            <Image src={LogoImage} alt="Jon Rey Galera"/>
          </Link>
        </div>

      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Contact Me</button>
      </div>

      <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-semibold md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-white">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Services</Link>
          </li>
          <li>
            <Link href="#projects">Projects</Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
}
