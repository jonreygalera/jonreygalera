'use client';
import Link from "next/link";
import LogoImage from "/public/logo.png";
import Image from "next/image";
import ButtonAnim from "./button-anim";
import Button from "./button";

export default function NavBar() {

  const handleOnClickSectionItem = (section: string) => {
    const sectionItem = document.getElementById(section);
      if (sectionItem) {
        sectionItem.scrollIntoView({ behavior: 'smooth' });
      }
  }

  return (
    <nav className="bg-primary-200 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src={LogoImage} 
              alt="Jon Rey Galera"
              className="sm:h-8 w-auto md:h-10"
              priority
            />
          </Link>
        </div>

      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer">Get started</button> */}
          <ButtonAnim  onClick={() => handleOnClickSectionItem('section-contact')}/>
          <button 
            data-collapse-toggle="navbar-sticky" 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
            aria-controls="navbar-sticky" 
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
          <li>
            <Button link={true} onClick={() => handleOnClickSectionItem('section-hero')}>Home</Button>
          </li>
          <li>
            <Button link={true} onClick={() => handleOnClickSectionItem('section-about')}>About</Button>
          </li>
          {/* <li>
            <Button link={true} onClick={() => handleOnClickSectionItem('section-contact')} >Services</Button>
          </li> */}
          <li>
            <Button link={true} onClick={() => handleOnClickSectionItem('section-ideas')}>Ideas</Button>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
}
