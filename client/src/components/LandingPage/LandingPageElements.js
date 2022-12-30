import styled from 'styled-components';

export const MainWrapper = styled.div`
    background: #3C2F3D;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    color: #fff;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`

export const Img = styled.img`
    width: 300px;
    height: auto;
    padding: 40px;
    border: 0;
    max-width: 100%;
    vertical-align: top;
    display: inline-block;
    max-height: 500px;
`;

export const Href = styled.a`
    display: flex;
    justify-content: center;
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
        background: #fff;
        color: #1ED760;
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`
