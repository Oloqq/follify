import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        background-color: #3C2F3D;
    }
`

export const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    height: 80vh;
    margin-right: auto;
    margin-left: auto;
    padding-right: 50px;
    padding-left: 50px;
    background: #3C2F3D;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`

export const Button = styled.button`
    background: ${({ primary }) => (primary ? '#1ED760' : '#fff')};
    padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    color: ${({ primary }) => (primary ? '#fff' : '#1ED760')};
    border-radius: 4px;
    white-space: nowrap;

    &:hover {
        transition: all 0.3s ease-out;
        color: #1ED760;
        background: ${({ primary }) => (primary ? '#fff' : '#1ED760')};
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`

export default GlobalStyle;