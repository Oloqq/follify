import React from 'react';
import logo from '../../images/Logo.svg';
import { Container } from '../../globalStyles';
import { Img, MainWrapper, Href } from './LandingPageElements';


function LandingPage() {

    function login() {
        fetch(process.env.REACT_APP_PATH + "/login", { 
            method: "GET", 
            credentials: "include", 
            mode: "cors" })
        .then(res => res.json())
        .then(data => {
            window.location.href = data.redirectUrl;
        })
    }
    
    return (
        <>
            <Container>
                <Img src={logo} alt='logo-follify' />
                <MainWrapper>
                    <h2>Connect and stay up to date with your favourite music!</h2>
                </MainWrapper>
                <Href primary onClick={login}>CONNECT</Href>
            </Container>
        </>
    );
}

export default LandingPage;