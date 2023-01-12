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

// ======== NEW LAYOUT ========

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    background-color: #1ED760;

    margin: 20px;

    border-radius: 10px;

    -webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
    -moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
    box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
`
  
export const H2 = styled.h2`
    color: #1ED760;
    padding-bottom: 1rem;
    background-color: white;
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

    -webkit-box-shadow: 8px 11px 15px -15px rgba(87, 87, 105, 1);
    -moz-box-shadow: 8px 11px 15px -15px rgba(87, 87, 105, 1);
    box-shadow: 8px 11px 15px -15px rgba(87, 87, 105, 1);
    
`

export const RightSideWrapper = styled.div`
    align-self: flex-start;
    flex: 1;
    padding: 20px;
    background-color: #1ED760;
    border-top-right-radius: 10px;

    // -webkit-box-shadow: -6px 3px 15px -6px rgba(66, 68, 90, 1);
    // -moz-box-shadow: -6px 3px 15px -6px rgba(66, 68, 90, 1);
    // box-shadow: -6px 3px 15px -6px rgba(66, 68, 90, 1);
`
  
export const Input = styled.input`
    margin-bottom: 1rem;
    border: 2px solid white;
    border-radius: 3px;
    color: white;
    padding: 0.2rem;
    background-color: #1ED760;

    &:focus {
        outline: none;
        border: 2px solid #1ED760;
    }
`
  
export const TextArea = styled.textarea`
    resize: none;
    max: 100;
    margin-bottom: 1rem;
    border: 2px solid white;
    border-radius: 3px;
    color: white;
    background-color: #1ED760;

    &:focus {
        outline: none;
        border: 2px solid #1ED760;
    }
`
  
export const Row = styled.span`
    width: 100%;
    background-color: white;
`
  
export const Label = styled.label`
    color: ${({ right }) => (right ? '#fff' : '#1ED760')};
    background-color: ${({ right }) => (right ? '#1ED760' : '#fff')};
    display: block;
    padding-bottom: 0.2rem;
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
    }
`

export const CheckboxLabel = styled.label`
    display: inline;
    margin: 0.5rem;
    color: ${({ right }) => (right ? '#fff' : '#1ED760')};
    background-color: ${({ right }) => (right ? '#1ED760' : '#fff')};
`

export const Form = styled.form`
    display: flex;
    justify content: flex-end;
    align-items: center;
    flex-direction: column;

    background-color: white;
    
`
export const FormRight = styled.form`
    display: flex;
    justify content: flex-end;
    align-items: center;
    flex-direction: column;

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
    // background-color: white;
    hegith: 100%;
`

export const DateWrapper = styled.div`
    background-color: white;
`

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    // background-color: white;
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
    // background-color: #f5f5f5;
`;