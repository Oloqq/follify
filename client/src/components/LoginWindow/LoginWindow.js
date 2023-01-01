import React from 'react';
import logo from '../../images/Logo.svg';
import { Container } from '../../globalStyles';
import { Img, MainWrapper } from '../LandingPage/LandingPageElements';
import { Par, Href } from '../LoginWindow/LoginWindowElements';

const LoginWindow = () => {
    function login() {
        fetch("http://localhost:5000/login", { method: "GET", credentials: "include", mode: "cors" })
        .then(res => res.json())
        .then(data => {
          console.log("body", data.redirectUrl);
          this.history.pushState(null, data.redirectUrl);
        });
    }

    return (
        <>
            <Container>
                <Img src={logo} alt="logo-follify"/>
                    <Par>After clicking the button below, Spotify login page will appear for you to log in!</Par>
                <MainWrapper>
                        <Href primary fontBig onClick={login}>Connect your spotify account!</Href>
                </MainWrapper>
            </Container>
        </>
    );
}

export default LoginWindow;
