import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavItemBtn, NavBtn, NavItemSettings, Button} from './navbarElements';
import { IconContext } from 'react-icons/lib';


const Navbar = () => {

    function login() {
        fetch(process.env.REACT_APP_PATH, { 
            method: "GET", 
            credentials: "include", 
            mode: "cors" })
        .then(res => res.json())
        .then(data => {
            window.location.href = data.redirectUrl;
        })
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
                                <NavLinks to='/' >
                                    Home
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/about-us' onClick={closeMobileMenu}>
                                    About us
                                </NavLinks>
                            </NavItem>
                            <NavItemSettings>
                                <NavLinks to='/settings' onClick={closeMobileMenu}>
                                    Settings
                                </NavLinks>
                            </NavItemSettings>
                            <NavItemBtn>
                                {button ? (
                                    <NavBtn>
                                        <Button primary onClick={login}>
                                            Log In
                                        </Button>
                                    </NavBtn>
                                ) : (
                                        <NavBtn>
                                            <Button primary onClick={login}>
                                                Log In
                                            </Button>
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