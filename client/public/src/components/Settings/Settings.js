import React from 'react';
import { Container, Button } from '../../globalStyles';
import { MainWrapper } from '../LandingPage/LandingPageElements';

function playlistnow() {
    fetch("http://localhost:5000/playlistnow", { method: "POST", credentials: "include", mode: "cors" })
        .then(res => res.text())
}

function Settings() {
    return (
        <>
            <Container>
                <MainWrapper>
                    <h2>Start exploring new music!</h2>
                </MainWrapper>
                <Button primary onClick={playlistnow}>Create playlist now!</Button>
            </Container>
        </>
    );
}

export default Settings;