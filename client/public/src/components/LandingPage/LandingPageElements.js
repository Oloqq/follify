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
