import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { MdClose } from "react-icons/md";
import { useEffect } from 'react';

function Growl(props) {

    const GrowlBg = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        z-index: 20;
        color: #fff;
        background-color: #111;

    `

    const show = keyframes`
        0% {
            top: -100px;
        }
       
        100% {
            top: 0;
        }
    `

    const hide = keyframes`
       10% {
            top: 0;
        }

        80% {
            top: 0;
        }
       
        100% {
            top: -100px;
        }
    `

    const GrowlCont = styled.div`
        
        position: absolute;
        background-color: #fff;
        width: 50%;
        padding: 10px 30px;
        color: #fff;
        background-color: #111;
        border: 1px solid #111;
        border-top-width: 0px;
        border-radius: 0 0 10px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        animation: ${show} 1s ease 1, ${hide} 3s ease 1;

        & > div {
            cursor: pointer;
        }
    
    `
    
 

    if (props.visible) {
        return (
            <GrowlBg>
                <GrowlCont>
                    {props.content}
                    <div onClick={props.closeGrowl}><MdClose /></div>    
                </GrowlCont>
                
            </GrowlBg>
        )
    } else {
        return null
    }
}

export default Growl