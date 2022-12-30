import styled from 'styled-components';

export const Slider = styled.input` 
    margin: 0;
    width: 205px;
    accent-color: #1ED760;

`
export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 12px;
    margin: 20px;
`

export const Btn = styled.button`
background: ${({ primary }) => (primary ? '#1ED760' : '#fff')};
padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
outline: none;
border: none;
cursor: pointer;
color: #fff;
border-radius: 4px;
white-space: nowrap;
margin: 10px;

&:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background: ${({ primary }) => (primary ? '#fff' : '#1ED760')};
    color: ${({ primary }) => (primary ? '#1ED760' : '#fff')};
}

@media screen and (max-width: 960px) {
    width: 100%;
}
`

export const Lbl = styled.label`
    color: #fff;
    margin-top: 20px;
`

export const DataList = styled.datalist`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 200px;
    color: #fff;
`

export const Option = styled.option`
    padding: 0;
`

export const Checkbox = styled.input`
    margin-bottom: 20px;
    margin-top: 5px;
    accent-color: #1ED760;
`