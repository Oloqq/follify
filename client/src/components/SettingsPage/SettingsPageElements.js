import styled from 'styled-components';

export const Slider = styled.input` 
    margin: 0;
    width: 205px;
    accent-color: #fff;
`

export const Btn = styled.button`
    background: ${({ primary }) => (primary ? '#1ED760' : '#fff')};
    padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    color: ${({ primary }) => (primary ? '#fff' : '#1ED760')};
    border-radius: 4px;
    white-space: nowrap;
    margin: 10px;

    &:hover {
        transition: all 0.3s ease-out;
        background: #fff;
        background: ${({ primary }) => (primary ? '#4bdf80' : '#f5f5f5')};
        color: ${({ primary }) => (primary ? '#fff' : '#1ED760')};
        -webkit-box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
        -moz-box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
        box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`

export const DataList = styled.datalist`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 200px;
    color: #fff;
    background-color: #1ED760;
`

export const Option = styled.option`
    padding: 0;
    background-color: #1ED760;
`

export const Checkbox = styled.input`

    margin-bottom: 20px;
    margin-top: 5px;
    accent-color: ${({ right }) => (right ? '#fff' : '#1ED760')};

    &:checkbox:focus {
        outline: none !important;
    }
`

export const Title = styled.div`
    color: #eee;
    font-size: 25px;
    font-weight: 600;
    margin-top 30px;
`

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    // flex-wrap: wrap;

    background-color: #1ED760;

    margin: 20px;

    border-radius: 10px;

    -webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
    -moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
    box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);

    @media screen and (max-width: 960px) {
        flex-direction: column;
        margin: 0;
    }
`
  
export const H2 = styled.h2`
    padding-bottom: 1rem;
    color: #3C2F3D;
    background-color: white;
    text-shadow: 4px 4px 10px rgba(181, 185, 191, 1);
`

export const RightH2 = styled.h2`
    color: white;
    padding-bottom: 1rem;
    background-color: #1ED760;
` 
  
export const LeftSideWrapper = styled.div`
    padding: 20px;
    background-color: white;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: white;
    border-top-right-radius: 10px;
    // border-bottom-right-radius: 5px;

    @media screen and (max-width: 960px) {
        border-bottom-left-radius: 0;
    }
    
`

export const RightSideWrapper = styled.div`
    align-self: flex-start;
    flex: 1;
    padding: 20px;
    background-color: #1ED760;
    border-top-right-radius: 10px;

    @media screen and (max-width: 960px) {
        padding: 20px 0;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 0;
    }
`
  
export const Input = styled.input`
    margin-bottom: 1rem;
    border: 2px solid #1ED760;
    border-radius: 3px;
    color: white;
    padding: 0.2rem;
    background-color: #1ED760;

    &:focus {
        outline: none;
        -webkit-box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
        -moz-box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
        box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
    }
`
  
export const TextArea = styled.textarea`
    resize: none;
    max: 100;
    margin-bottom: 1rem;
    border: 2px solid #1ED760;
    border-radius: 3px;
    color: white;
    background-color: #1ED760;

    &:focus {
        outline: none;
        border: 2px solid #1ED760;
        -webkit-box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
        -moz-box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
        box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
    }
`
  
export const Row = styled.span`
    width: 100%;
    background-color: white;
`
  
export const Label = styled.label`
    color: ${({ right }) => (right ? '#fff' : '#3C2F3D')};
    background-color: ${({ right }) => (right ? '#1ED760' : '#fff')};
    display: block;
    padding-bottom: 0.2rem;
    font-weight: 200;
    text-shadow: 2px 2px 10px rgba(181, 185, 191, 1);
`

export const Date = styled.input`
    color: white;
    color-scheme: dark;
    vertical-align: middle;
    margin-bottom: 1rem;
    border-radius: 3px;
    border: 2px solid white;
    padding: 0.2rem;
    background-color: #1ED760;

    &:focus {
        border: 2px solid #1ED760;
        outline: none;
        -webkit-box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
        -moz-box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
        box-shadow: 5px 2px 10px -2px rgba(167, 167, 175, 1);
    }
`

export const CheckboxLabel = styled.label`
    display: inline;
    margin: 0.5rem;
    color: ${({ right }) => (right ? '#fff' : '#3C2F3D')};
    background-color: ${({ right }) => (right ? '#1ED760' : '#fff')};
`

export const Form = styled.form`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-color: white;
    
`
export const FormRight = styled.form`
    display: flex;
    justify content: flex-end;
    align-items: center;
    flex-direction: column;
    padding: 0 10px;
    background-color: #1ED760;
`

export const Dates = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: white;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    hegith: 100%;
`

export const DateWrapper = styled.div`
    background-color: white;
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

export const Counter = styled.span`
    font-size: 20px;
    background-color: #1ED760;
`