import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Nav, NavbarContainer, NavIcon, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavItemBtn, NavBtn } from './navbarElements';
import { Button } from '../../globalStyles';
import { IconContext } from 'react-icons/lib';

const Navbar = () => {

    function login() {
        fetch("http://localhost:5000/login", { method: "GET", credentials: "include", mode: "cors" }).then(res => res.text())
    }

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton)

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to='/' onClick={closeMobileMenu}>
                            Follify
                        </NavLogo>
                        <MobileIcon onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </MobileIcon>
                        <NavMenu onClick={handleClick} click={click}>
                            <NavItem>
                                <NavLinks to='/settings' >
                                    Home
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/' onClick={closeMobileMenu}>
                                    About us
                                </NavLinks>
                            </NavItem>
                            <NavItemBtn>
                                {button ? (
                                    <NavBtn to='/log-in'>
                                        <Button primary onClick={login}>Log In</Button>
                                    </NavBtn>
                                ) : (
                                        <NavBtn to='/log-in'>
                                            <Button fontBig primary onClick={login}>Log In</Button>
                                    </NavBtn>
                                )}
                            </NavItemBtn>
                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;