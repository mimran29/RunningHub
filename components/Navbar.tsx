import React from 'react';
import Link from "next/link";
import Image from 'next/image';


const Navbar = () => {
    return (
        <header>
        <nav>
            <Link href="/" className="logo">
                <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
                <p>
                    DevEvents
                </p>
            </Link>
            <ul>
                <Link href="/">Home</Link>
                <Link href="/">Events</Link>
                <Link href="/">Create Events</Link>
            </ul>
        </nav>
        </header>
    );
};

export default Navbar;