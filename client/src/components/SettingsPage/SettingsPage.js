import React from 'react';
import { Img, MainWrapper, RightSideWrapper, LeftSideWrapper, Slider, Input, Checkbox, Row, CheckboxLabel, Date, Label, Form, Btn, H2, TextArea, Dates, DataList, Option, FormContainer, DateWrapper, RightH2, FormRight, ButtonWrapper } from './SettingsPageElements';
import logo from '../../images/Logo.svg';


function SettingsPage() {
    
    function playlistnow() {

        var playlistTitle = document.getElementById("title").value;
        var playlistDescription = document.getElementById("description").value;
        var startDate = document.getElementById("sdate").value;
        var endDate = document.getElementById("edate").value;
        var priv = document.getElementById("private").value;
        var PLAYLIST_URL = ""

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
                                <Label htmlFor="name">Name:</Label>
                                <Input id="name"></Input>
                                <CheckboxLabel htmlFor="priv" >Private:</CheckboxLabel>
                                <Checkbox type="checkbox" id="priv"></Checkbox>
                                <Label htmlFor="desc">Description:</Label>
                                <TextArea id="desc"></TextArea>
                            </Row>
                            <Dates>
                                <DateWrapper>
                                    <Label htmlFor="sdate">Start date:</Label>
                                    <Date type="date" id="sdate"></Date>
                                </DateWrapper>
                                <DateWrapper>
                                    <Label htmlFor="edate">End date:</Label>
                                    <Date type="date" id="edate"></Date>
                                </DateWrapper>
                            </Dates>
                            <Btn primary>Create playlist now!</Btn>
                        </Form> 
                    </LeftSideWrapper>
                    <RightSideWrapper>
                        <FormRight>
                            <RightH2>Create playlist automaticaly!</RightH2>
                            <Label right htmlFor="slider">Create every x days:</Label>
                            <Slider type="range" id="slider" name="slider" min="1" max="30" step="1" list='tickmarks'></Slider>
                            <DataList id="tickmarks">
                                <Option value="1" label='1'></Option>
                                <Option value="7" label='7'></Option>
                                <Option value="14" label='14'></Option>
                                <Option value="21" label='21'></Option>
                                <Option value="30" label='30'></Option>
                            </DataList>
                            <CheckboxLabel right htmlFor="sub">Subscribed:</CheckboxLabel>
                            <Checkbox right defaultChecked type="checkbox" id="sub"></Checkbox>
                            <Btn onClick={playlistnow}>Create playlist now!</Btn>
                        </FormRight>
                    </RightSideWrapper>
                </MainWrapper>
                    <ButtonWrapper>
                        <Btn primary onClick={defaultconfig}>Restore defaults</Btn>
                        <Btn primary>Unsubscribe</Btn>
                        <Btn primary onClick={saveConfig}>Save configuration</Btn>
                    </ButtonWrapper>
            </FormContainer>
        </>
    );
}

export default SettingsPage;