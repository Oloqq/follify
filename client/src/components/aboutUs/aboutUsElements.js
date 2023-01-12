import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Title = styled.h1`
    color: white;
    font-size: 50px;
    font-weight: 500;
    padding: 1rem 0;
    margin-top: 3rem;
`

export const Subtitle = styled.h4`
    color: white;
    font-size: 21px;
    font-weight: 200;
    padding: 1rem 0;
    margin-bottom: 3rem;
`

export const MainWrapper = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 2rem;
`

export const Person = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: white;
    border-radius: 20px;

    -webkit-box-shadow: 0px 8px 13px -1px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 8px 13px -1px rgba(66, 68, 90, 1);
    box-shadow: 0px 8px 13px -1px rgba(66, 68, 90, 1);

`

export const Name = styled.h4`
    font-size: 23px;
    font-weitght: 300;
    color: #3C2F3D;
    padding: 1rem 0 0.5rem 0;

    background-color: white;
`

export const PhotoContainer = styled.div`
    background-color: white;
    padding: 1rem;
`

export const Photo = styled.img`
    border-radius: 50%;
    width: 200px;
    height: auto;
`

export const Desc = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    padding: 1rem 0;
`

export const Par = styled.p`
    color: #3C2F3D;
    background-color: white;
    padding: 0.1rem;
`
