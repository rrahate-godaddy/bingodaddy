import { useState, useEffect } from 'react';
import ModalContent from './modalContent';
import ModalVerify from './modalVerify';
import styled from '@emotion/styled'
import { MdClose } from "react-icons/md";

function Modal(props) {

    // useEffect(()=> {
    //     console.log(props.visible)
    // },[props.visible])

    const ModalBg = styled.div`
        background-color: #A6FFF8;
        color: #fff;
        width: ${props => (props.modalC ? '50%' : '100%')};
        height: 100%;
        z-index: 20;
        position: absolute;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        left: ${props => (props.modalC ? '50%' : '0')};;
        top: 0;
        -webkit-box-shadow: -13px 4px 39px -16px rgba(0,0,0,0.5);
        -moz-box-shadow: -13px 4px 39px -16px rgba(0,0,0,0.5);
        box-shadow: -13px 4px 39px -16px rgba(0,0,0,0.5);
        

        & > .close-btn {
            top: 0px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            
            background-color: #000;
            padding: 20px 5%;

            & > .title {
                font-size: 1.5em;
                font-weight: 600;
            }

        }

        & > .content {
            
            overflow: scroll;
            height: 95%;
            padding: 10px;
            

        }
    
    `

    const CloseBtn = styled.a`
        text-align: right;

        & > svg {
            font-size: 1.4em;
        }
    `

    
    if (props.visible) {
        return (
            <ModalBg modalC={props.modalContent}>
                <div className='close-btn'>
                    <div className='title'>
                        {props.modalContent&& 
                            <>Numbers Called</>
                        }
                    </div>
                    <CloseBtn onClick={props.setVisibility}>
                        <MdClose />
                    </CloseBtn>
                </div>
                <div className='content'>
                {props.modalContent&&
                    <ModalContent modalContent={props.modalContent}  />
                }
                {props.verify&&props.calledList&&
                    <ModalVerify calledList={props.calledList} />
                }
            
                </div>
            </ModalBg>
        )

    } else {
        return null
    }

        
}

export default Modal