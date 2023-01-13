import styled from 'styled-components';
import { Container } from '../../globalStyles';
import { FaMagento } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { WHITE, LIGHT_BLUE, BLUE, DARK_BLUE, FIOLET, PINK } from '../../colors';


export const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    height: 80px;
    top: 0;
    z-index: 999;
    background-color: ${FIOLET};
    font-size: 1.2rem;
`

export const NavbarContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 80px;
`

export const NavLogo = styled(Link)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
`

export const NavIcon = styled(FaMagento)`
    margin: 0.5rem;
`

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 960px) {
        display: block;
        position: absolute;
        top 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 960px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position: absolute;
        top: 80px;
        left: ${({ click }) => (click ? 0 : '-100%')};
        opacity: 1;
        transition: all 0.5s ease;
        background: #3C2F3D;
    }
`

export const NavItem = styled.li`
    height: 80px;
    border-bottom: 2px solid transparent;

    &:hover {
        border-bottom: 2px solid #1ED760;
    }

    @media screen and (max-width: 960px) {
        width: 100%;

        &:hover {
            border: none;
        }
    }
`
export const NavItemSettings = styled.li`
    height: 80px;
    border-bottom: 2px solid transparent;
    display: ${({ hide }) => (hide ? 'none' : 'inline')};

    &:hover {
        border-bottom: 2px solid #1ED760;
    }

    @media screen and (max-width: 960px) {
        width: 100%;

        &:hover {
            border: none;
        }
    }
`

export const NavLinks = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;

    @media screen and (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        width: 100%;
        display: table;

        &:hover {
            color: #1ED760;
            transition: all 0.3s ease;
        }
    }
`

export const NavItemBtn = styled.li`
    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 120px;
    }
`

export const NavBtn = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 8px 16px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
`

export const Button = styled.button`
    display: flex;
    justify-content: center;
    background: ${({ primary }) => (primary ? '#1ED760' : '#fff')};
    padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    color: ${({ primary }) => (primary ? '#fff' : '#1ED760')};
    border-radius: 4px;
    white-space: nowrap;
    text-decoration: none;

    &:hover {
        transition: all 0.3s ease-out;
        background: #fff;
        color: #1ED760;
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`