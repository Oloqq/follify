import styled from 'styled-components';
import { WHITE, LIGHT_BLUE, BLUE, DARK_BLUE, FIOLET, PINK, DARK } from '../../colors';

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    
`

export const Title = styled.h1`
    color: ${DARK_BLUE};
    font-size: 50px;
    font-weight: 500;
    padding: 1rem 0;
    margin-top: 3rem;
`

export const Subtitle = styled.h4`
    color: ${FIOLET};
    flex-basis: auto;
    font-size: 21px;
    font-weight: 200;
    padding: 1rem auto;
    margin-bottom: 3rem;
`

export const MainWrapper = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
`

export const Person = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: ${LIGHT_BLUE};
    border-radius: 20px;

    -webkit-box-shadow: 0px 4px 10px -1px rgba(169, 169, 171, 1);
    -moz-box-shadow: 0px 4px 10px -1px rgba(169, 169, 171, 1);
    box-shadow: 0px 4px 10px -1px rgba(169, 169, 171, 1);

`

export const Name = styled.h4`
    font-size: 23px;
    font-weitght: 300;
    color: ${DARK};
    padding: 1rem 0 0.5rem 0;

    background-color: ${LIGHT_BLUE};
`

export const PhotoContainer = styled.div`
    background-color: ${LIGHT_BLUE};
    padding: 1rem;
`

export const Photo = styled.img`
    border-radius: 50%;
    width: 200px;
    height: auto;
    background-color: ${LIGHT_BLUE};
`

export const Desc = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1rem 0;
    background-color: ${LIGHT_BLUE};
    color: ${DARK_BLUE};
`

export const Par = styled.p`
    color: #3C2F3D;
    background-color: ${LIGHT_BLUE};
    padding: 0.1rem;
`
export const Line = styled.div`
    background-color: ${WHITE};
    width: 60%;
    height: 3px;
`