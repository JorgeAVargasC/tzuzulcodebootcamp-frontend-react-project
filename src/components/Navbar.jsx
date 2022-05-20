import React, { useState } from 'react'
import { Spin as Hamburger } from 'hamburger-react'
import NavLinks from './NavLinks';

export default function Navbar() {

    const [isOpen, setOpen] = useState(false)

    return (
        <div className='navbar'>
            
            <div className='navbar-content'>
                <a href='#home'>
                    <img className="logo" alt="" />
                </a>

                {/* Mobile Navigation */}
                <nav className={isOpen ? 'navlinks-mobile open' : 'navlinks-mobile close'} onClick={() => setOpen(false)}>
                    <NavLinks/>
                </nav>

                <Hamburger
                    rounded
                    toggled={isOpen}
                    toggle={setOpen}
                    direction='left'
                    duration={0.4}
                />

                {/* Desktop Navigation */}
                <nav className='navlinks'>
                    <NavLinks/>
                </nav>
                
            </div>
        </div>
    )
}