import React, { useState } from 'react';
import { Img, MainWrapper, RightSideWrapper, LeftSideWrapper, Slider, Input, Checkbox, Row, CheckboxLabel, Date, Label, Form, Btn, H2, TextArea, Dates, DataList, Option, FormContainer, DateWrapper, RightH2, FormRight, ButtonWrapper, Counter } from './SettingsPageElements';
import logo from '../../images/Logo.svg';


function SettingsPage() {

    const url = ""

    const [data, setData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        priv: false,
        slider: 16
    })

    function handle(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData)
    }

    function submit(e) {
        fetch("http://localhost:5000/playlistnow", {method: "POST", credentials: "include", mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: data.title,
            description: data.description,
            public: data.priv,
            startDate: data.startDate,
            endDate: data.endDate
        })}).then(res => {
            console.log(res.data)
        })
    }

    function defaultconfig() {
        fetch("http://localhost:5000/setup", {method: "GET", credentials: "include", mode: "cors"}).then((res) => {
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
                        <Form id="playlist-form" onSubmit={(e) => submit(e)}>
                            <H2>Create playlist by yourself!</H2>
                            <Row>
                                <Label htmlFor="title">Name:</Label>
                                <Input onChange={(e) => handle(e)} id="title" value={data.title}></Input>
                                <CheckboxLabel htmlFor="priv" >Private:</CheckboxLabel>
                                <Checkbox type="checkbox" id="priv" onChange={(e) => handle(e)} value={data.priv}></Checkbox>
                                <Label htmlFor="description">Description:</Label>
                                <TextArea id="description" onChange={(e) => handle(e)} value={data.description}></TextArea>
                            </Row>
                            <Dates>
                                <DateWrapper>
                                    <Label htmlFor="sdate">Start date:</Label>
                                    <Date type="date" id="startDate" onChange={(e) => handle(e)} value={data.startDate}></Date>
                                </DateWrapper>
                                <DateWrapper>
                                    <Label htmlFor="endDate">End date:</Label>
                                    <Date type="date" id="endDate" onChange={(e) => handle(e)} value={data.endDate}></Date>
                                </DateWrapper>
                            </Dates>
                            <Btn primary type='submit'>Create playlist now!</Btn>
                        </Form>
                    </LeftSideWrapper>
                    <RightSideWrapper>
                        <FormRight>
                            <RightH2>Create playlist automaticaly!</RightH2>
                            <Label right htmlFor="slider">Create every <Counter>{data.slider}</Counter> days:</Label>
                            <Slider type="range" id="slider" name="slider" min="1" max="30" step="1" list='tickmarks' onChange={(e) => handle(e)} value={data.count}></Slider>
                            <DataList id="tickmarks">
                                <Option value="1" label='1'></Option>
                                <Option value="7" label='7'></Option>
                                <Option value="14" label='14'></Option>
                                <Option value="21" label='21'></Option>
                                <Option value="30" label='30'></Option>
                            </DataList>
                            <CheckboxLabel right htmlFor="sub">Subscribed:</CheckboxLabel>
                            <Checkbox right defaultChecked type="checkbox" id="sub"></Checkbox>
                            <Btn type='submit'>Save configuration</Btn>
                        </FormRight>
                    </RightSideWrapper>
                </MainWrapper>
                    <ButtonWrapper>
                        <Btn primary onClick={defaultconfig}>Restore defaults</Btn>
                        <Btn primary>Unsubscribe</Btn>
                    </ButtonWrapper>
            </FormContainer>
        </>
    );
}


export default SettingsPage;