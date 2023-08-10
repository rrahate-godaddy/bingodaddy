import { useState, useRef} from 'react';
import Form from '../../atoms/form';
import styled from '@emotion/styled'




const ModalPlayerName = (props) => {

    

    const ModalBg = styled.div`
        background-color: #A6FFF8;
        width: 100%;
        height: 100%;
        z-index: 20;
        position: absolute;
        color: #111;
        left: 0;
        top: 0;
        padding: 5%;

        & > div:nth-child(1) {

            text-align: right;
        }
    
    `
        
    return (
        <ModalBg>
            <Form value={props.value} cancel={props.cancel} join={props.join} />
        </ModalBg>
    )



        
}

export default ModalPlayerName