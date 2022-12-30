import React from 'react';
import { Container } from '../../globalStyles';
import { MainWrapper, Img } from '../LandingPage/LandingPageElements';
import logo from '../../images/Logo.svg';
import {Par, Href } from './LinkPageElements';

const LinkPage = () => {

    return (
        <>
            <Container>
                <Img src={logo} alt="logo-follify"/>
                    <Par>Here is the link to your newly created playlist!</Par>
                <MainWrapper>
                    <a href="#">Click me!</a>
                    <Href href="/" primary fontBig>Back to main page</Href>
                </MainWrapper>
            </Container>
        </>
    )
}

export default LinkPage;