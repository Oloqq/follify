import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { Container, Button } from '../../globalStyles';
import { Img, MainWrapper } from './LandingPageElements';


function LandingPage() {
    return (
        <>
            <Container>
                <Img src={logo} alt='logo-follify' />
                <MainWrapper>
                    <h2>Connect and stay up to date with your favourite music!</h2>
                </MainWrapper>
                <Button primary>CONNECT</Button>
            </Container>
        </>
    );
}

export default LandingPage;