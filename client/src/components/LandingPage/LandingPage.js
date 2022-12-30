import React from 'react';
import logo from '../../images/Logo.svg';
import { Container, Button } from '../../globalStyles';
import { Img, MainWrapper, Href } from './LandingPageElements';
import { Navigate, Navigator } from 'react-router-dom';


function LandingPage() {
    return (
        <>
            <Container>
                <Img src={logo} alt='logo-follify' />
                <MainWrapper>
                    <h2>Connect and stay up to date with your favourite music!</h2>
                </MainWrapper>
                <Href primary target="_self" href="/login">CONNECT</Href>
            </Container>
        </>
    );
}

export default LandingPage;