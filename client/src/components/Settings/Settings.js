import React from 'react';
import { Container } from '../../globalStyles';
import { MainWrapper, Img } from '../LandingPage/LandingPageElements';
import { Slider, Row, Btn, Lbl, DataList, Option, Checkbox } from './SettingsElements';
import logo from '../../images/Logo.svg';


const Settings = () => {

    let PLAYLIST_URL = ""

    function playlistnow() {
        fetch("http://localhost:5000/playlistnow", { method: "POST", credentials: "include", redirect: "follow", mode: "cors" })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Response not OK')
                }
                PLAYLIST_URL = res
                window.location.replace(res)
            })
            .catch((error) => {
                console.error("Problem with fetching ... ");
            });
    }

    return (
        <>
            <Container>
                <Img src={logo} alt='logo-follify' />
                <MainWrapper>
                    <h2>Start exploring new music!</h2>
                </MainWrapper>
                <Btn primary onClick={playlistnow}>Create playlist now!</Btn>
                <Lbl htmlFor="slider">Create every x days:</Lbl>
                <Slider type="range" id="slider" name="slider" min="1" max="30" step="1" list='tickmarks'></Slider>
                <DataList id="tickmarks">
                    <Option value="1" label='1'></Option>
                    <Option value="7" label='7'></Option>
                    <Option value="14" label='14'></Option>
                    <Option value="21" label='21'></Option>
                    <Option value="30" label='30'></Option>
                </DataList>
                <Row>
                    <Btn primary>Unsubscribe</Btn>
                    <Btn primary>Restore defaults</Btn>
                    <Btn primary>Save configuration</Btn>
                </Row>
                <Lbl htmlFor="sub">Subscribed</Lbl>
                <Checkbox id="sub" type="checkbox" readOnly="{true}" checked="{true}" ></Checkbox>
            </Container>
        </>
    );
}

export default Settings;