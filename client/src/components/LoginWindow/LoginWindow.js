import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { Container, Button } from '../../globalStyles';



function LoginWindow() {
    return (
        <>
            <Container>
                <Img src={logo} alt='logo-follify' />
                <MainWrapper>
                    <form>
                        <label for="fname">First name:</label><br>
                        <input type="text" id="fname" name="fname" value="John"><br>
                        <label for="lname">Last name:</label><br>
                        <input type="text" id="lname" name="lname" value="Doe"><br><br>
                        <input type="submit" value="Submit">
                    </form> 
                </MainWrapper>
                <Button primary>Log In</Button>
            </Container>
        </>
    );
}

export default LoginWindow;