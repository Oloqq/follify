import React from 'react';
import { Img } from '../LandingPage/LandingPageElements';
import { MainWrapper, RightSideWrapper, LeftSideWrapper, MiddleWrapper, Slider, Input, Checkbox, Row, CheckboxLabel, Date, Label, Form, Btn, H2, TextArea, Dates, DataList, Option, FormContainer } from './SettingsElements';
import logo from '../../images/Logo.svg';

var playlistTitle = document.getElementById("title").value;
var playlistDescription = document.getElementById("description").value;
var startDate = document.getElementById("sdate").value;
var endDate = document.getElementById("edate").value;
var priv = document.getElementById("private").value;


const Settings = () => {

    var PLAYLIST_URL = ""

    function playlistnow() {
        fetch("http://localhost:5000/playlistnow", { method: "POST", credentials: "include", redirect: "follow", mode: "cors", headers: {
            "name": playlistTitle,
            "description": playlistDescription,
            "public": priv,
            "startDate": startDate,
            "endDate": endDate
        } })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Response not OK')
                }
                PLAYLIST_URL = res
                window.location.replace("/")
            })
    }

    function defaultconfig() {
        fetch("http://localhost:5000/setup", {method: "GET", credentials: "include", mode: "cors", redirect: "follow"}).then((res) => {
            if (!res.ok) {
                throw new Error("Bad response")
            }
        })
    }

    function saveConfig() {
        fetch("http://localhost:5000/setup", {method: "POST", credentials: "include", mode: "cors"})
    }

    function getConfig() {
        fetch("http://localhost:5000/setup", {method: "GET", credentials: "include", mode: "cors"})
    }

    return (
        <>
            {/* NEW LAYOUT */}
            <FormContainer>
                <Img src={logo} alt='logo-follify' />
                <MainWrapper>  
                    <LeftSideWrapper>
                        <Form id="playlist-form">
                            <H2>Create playlist by yourself!</H2>
                            <Row>
                                <Label for="name">Name:</Label>
                                <Input id="name"></Input>
                                <CheckboxLabel for="priv" class="norm">Private:</CheckboxLabel>
                                <Checkbox type="checkbox" id="priv"></Checkbox>
                                <Label for="desc">Description:</Label>
                                <TextArea id="desc"></TextArea>
                            </Row>
                            <Dates>
                                <div>
                                    <Label for="sdate">Start date:</Label>
                                    <Date type="date" id="sdate"></Date>
                                </div>
                                <div>
                                    <Label for="edate">End date:</Label>
                                    <Date type="date" id="edate"></Date>
                                </div>
                            </Dates>
                            <Btn primary>Create playlist now!</Btn>
                        </Form> 
                    </LeftSideWrapper>
                    <MiddleWrapper>
                        <H2>OR</H2>
                    </MiddleWrapper>
                    <RightSideWrapper>
                        <Form>
                            <H2>Create playlist automaticaly!</H2>
                            <Label for="slider">Create every x days:</Label>
                            <Slider type="range" id="slider" name="slider" min="1" max="30" step="1" list='tickmarks'></Slider>
                            <DataList id="tickmarks">
                                <Option value="1" label='1'></Option>
                                <Option value="7" label='7'></Option>
                                <Option value="14" label='14'></Option>
                                <Option value="21" label='21'></Option>
                                <Option value="30" label='30'></Option>
                            </DataList>
                            <CheckboxLabel for="sub">Subscribed:</CheckboxLabel>
                            <Checkbox checked type="checkbox" id="sub"></Checkbox>
                            <Btn primary>Create playlist now!</Btn>
                        </Form>
                    </RightSideWrapper>
                </MainWrapper>
                    <div>
                        <Btn primary onClick={defaultconfig}>Restore defaults</Btn>
                        <Btn primary>Unsubscribe</Btn>
                        <Btn primary onClick={saveConfig}>Save configuration</Btn>
                    </div>
            </FormContainer>
        </>
    );
}

export default Settings;