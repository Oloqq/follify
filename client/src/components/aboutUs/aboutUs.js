import {Title, Subtitle, MainWrapper, Person, PhotoContainer, Photo, Name, Desc, HeaderContainer, Par } from './AboutUsElements';
import person from '../../images/person.png';



function AboutUs() {

    return (
        <>
            <HeaderContainer>
                <Title>About Us</Title>
                <Subtitle>Here is something about the creators!</Subtitle>
            </HeaderContainer>
            <MainWrapper>
                <Person>
                    <Name>Olgierd</Name>
                    <PhotoContainer>
                        <Photo src={person} alt='person'/>
                    </PhotoContainer>
                    <Desc>
                        <Par>Back-end</Par>
                        <Par>&</Par>
                        <Par>Menagement</Par>
                    </Desc>
                </Person>
                <Person>
                    <Name>Kuba</Name>
                    <PhotoContainer>
                        <Photo src={person} alt='person'/>
                    </PhotoContainer>
                    <Desc>
                        <Par>Testing</Par>
                        <Par>&</Par>
                        <Par>Workflow</Par>
                    </Desc>
                </Person>
                <Person>
                    <Name>Jan</Name>
                    <PhotoContainer>
                        <Photo src={person} alt='person'/>
                    </PhotoContainer>
                    <Desc>
                        <Par>Front-end</Par>
                        <Par>&</Par>
                        <Par>Workflow</Par>
                    </Desc>
                </Person>
                <Person>
                <Name>Marcin</Name>
                <PhotoContainer>
                        <Photo src={person} alt='person'/>
                    </PhotoContainer>
                    <Desc>
                        <Par>Front-end</Par>
                        <Par>&</Par>
                        <Par>Design</Par>
                    </Desc>
                </Person>
            </MainWrapper>
        </>
    )
}

export default AboutUs;