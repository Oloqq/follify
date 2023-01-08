import styled from 'styled-components';

export const Slider = styled.input` 
    margin: 0;
    width: 205px;
    accent-color: #1ED760;
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
    color: white;
    padding-bottom: 1rem;
    background-color: #1ED760;
`
 
  
export const LeftSideWrapper = styled.div`
    padding: 20px;
    background-color: #1ED760;
`

export const RightSideWrapper = styled.div`
    align-self: flex-start;
    padding: 20px;
    background-color: white;
`

export const MiddleWrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-direction: column;
    padding: 15px;
`

  
export const Input = styled.input`
    margin-bottom: 1rem;
    border: 2px solid white;
    border-radius: 3px;
    color: white;
    padding: 0.2rem;

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

    &:focus {
        outline: none;
        border: 2px solid #1ED760;
    }
`
  
export const Row = styled.span`
    width: 100%;
`

  
export const Label = styled.label`
    color: white;
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

    &:focus {
        border: 2px solid #1ED760;
        outline: none;
    }
`

export const CheckboxLabel = styled.label`
    display: inline;
    margin: 0.5rem;
    color: white;
    
`

export const Form = styled.form`
    display: flex;
    justify content: flex-end;
    align-items: center;
    flex-direction: column;
    
`

export const Dates = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`



export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
`