import React from "react";
import { MdArrowDropDown } from "react-icons/md"
import Hamburger from 'hamburger-react'
import { useState, useEffect } from "react";

interface AppBarProp {
    game?: boolean
}

const AppBar: React.FC<AppBarProp> = ({
    game = false
}) => {
    // 電腦版設定
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    // 手機板設定
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isMenuOpen]);

    return (
        <div>
            <nav className="fixed flex bg-gray-100 px-3 py-2 top-0 z-50 w-screen">
                <div className="flex flex-row items-center justify-start px-5 cursor-pointer flex-shrink-0">
                    <a href="https://www.moneyweekly.com.tw/">
                        <img src="/image/logo-16.png" alt='logo' className="flex h-[23px] md:h-[33px] max-h-full mr-2 my-1"></img>
                    </a>
                </div>
                {!game && (<><div className="font-bold text-[18px] text-neutral-500 lg:flex items-center px-8 hidden md:flex">
                    <nav className="space-x-8">
                        <span className="hover:text-red-700 cursor-pointer">
                            <a href="#01">理財周刊23週年</a>
                        </span>
                        <span className="hover:text-red-700 cursor-pointer">
                            <a href="#02">理周島民PTT</a>
                        </span>
                        <span className="hover:text-red-700 cursor-pointer">
                            <a href="#03">名人幸福知識島</a>
                        </span>
                        <span className="hover:text-red-700 cursor-pointer">
                            <a href="#04">幸福理財遊戲島</a>
                        </span>
                        <span className={`hover:text-red-700 cursor-pointer whitespace-nowrap inline-block relative`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <span className="inline-block flex items-center">幸福共學島 <MdArrowDropDown /></span>
                            {dropdownOpen && (
                                <div className="absolute top-full left-0 bg-white border border-gray-300 shadow-md rounded-md w-56 text-neutral-500 font-medium">
                                    <div className="">
                                        <span className="px-4 py-2 block cursor-pointer hover:bg-gray-100 active:text-white active:bg-[#67B8A9]">
                                            <a href="#05">幸福共學島(華生攻略)</a>
                                        </span>
                                        <span className="px-4 py-2 block cursor-pointer hover:bg-gray-100 active:text-white active:bg-[#67B8A9]">
                                            <a href="#06">幸福共學島(理財指南)</a>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </span>
                    </nav>
                </div>
                    <div className="flex flex-row flex-grow items-center justify-end px-5 md:hidden">
                        <button onClick={() => setMenuOpen(!isMenuOpen)}>
                            <Hamburger toggled={isMenuOpen} />
                        </button>
                    </div></>)}
            </nav>
            {/* Full-screen Menu */}
            {shouldRender && (
                <div
                    className={`fixed inset-0 bg-[#65AB9D] bg-opacity-90 flex items-center justify-center z-40 transition-opacity duration-[1000ms] 
                                    ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
                    }
                    onAnimationEnd={() => !isMenuOpen && setShouldRender(false)}
                >
                    {/* Your menu content here */}
                    <div className="text-white text-2xl font-medium">
                        <ul className="space-y-5 text-center">
                            <li><a href="#01" onClick={toggleMenu}>理財周刊23週年</a></li>
                            <li><a href="#02" onClick={toggleMenu}>理周島民PTT</a></li>
                            <li><a href="#03" onClick={toggleMenu}>名人幸福知識島</a></li>
                            <li><a href="#04" onClick={toggleMenu}>幸福理財遊戲島</a></li>
                            <li><a href="#05" onClick={toggleMenu}>幸福共學島(華生攻略)</a></li>
                            <li><a href="#06" onClick={toggleMenu}>幸福共學島(理財指南)</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AppBar;