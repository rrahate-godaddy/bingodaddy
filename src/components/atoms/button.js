import { useState } from 'react';
import styled from '@emotion/styled'



const Button = (props) => {



    const Btn = styled.div`
    text-align: center; 
    border-radius: 10px;
    font-weight: 400;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    background-color: ${props => (props.secondary ? `#72fff4` : `#111`)};
    background-color: ${props => (props.red&& `#FD341D`)};
    background-color: ${props => (props.blue&& `#1976D2`)};
    color: ${props => (props.secondary ? `#111` : `#fff`)};
    cursor: pointer;
    border: ${props => (props.secondary ? '1px solid #b1c4e5' : `1px solid #111`)};
    border: ${props => (props.red&& '1px solid #FD341D')};
    border: ${props => (props.blue&& '1px solid #1976D2')};

    &:hover {
        border: ${props => (props.secondary ? '1px solid #111' : '1px solid #8995A9')};
        border: ${props => ((props.red || props.blue)&& '1px solid #111')};
        
    }

    & > svg {
        font-size: 1em;
        margin-right: 5px;
    }


    `

    return (
        <Btn secondary={props.secondary} tertiary={props.tertiary} red={props.red} blue={props.blue} onClick={props.onClick}>
            {props.children}
        </Btn>
    )

}

export default Button