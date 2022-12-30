import styled from "styled-components";

export const Href = styled.a`
background: ${({ primary }) => (primary ? '#1ED760' : '#fff')};
padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
outline: none;
border: none;
cursor: pointer;
color: ${({ primary }) => (primary ? '#fff' : '#1ED760')};
border-radius: 4px;
white-space: nowrap;
text-decoration: none;

&:hover {
    transition: all 0.3s ease-out;
    color: #1ED760;
    background: ${({ primary }) => (primary ? '#fff' : '#1ED760')};
}

@media screen and (max-width: 960px) {
    width: 100%;
}
`

export const Par = styled.p`
    color: #fff;
`