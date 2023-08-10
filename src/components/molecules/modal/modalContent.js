import { useState, useEffect } from 'react';
import styled from '@emotion/styled'

function ModalContent(props) {


    const CallsContainer = styled.div`
        display: flex;
        flex-direction: row;
        width: 100%;
        align-self: center;
        flex-wrap: wrap;
        justify-content: flex-start;
        
    `

    const CallsRow = styled.div`
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `
    const CallsCell = styled.div`
        text-align: center; 
        width: 50px;
        height: 30px;
        padding: 25px;
        font-size: 1.5em;
        display: flex;
        border-radius: 10px;
        margin: 10px;
        align-items: center;
        justify-content: center;
        background-color: ${props => (props.called ? '#FED317' : props.title ? '#000' : '#fff')};
        color: ${props => (props.title ? '#fff' : '#001e1d')};
        border: ${props => (props.title ? '1px solid #000' : props.called ? `1px solid #FED317` : `1px solid #61EDEA`)};
        border-radius: 10px;
        
        
    `

    var ArraySeventyFive = Array.from({length: 75}, (_, i) => i + 1)
    
    useEffect(() => {
        console.log(props.modalContent)
    },[props.modalContent])

    
    return (

        <CallsContainer>
            {/* <CallsRow>
                <CallsCell title>B</CallsCell>
                    {ArraySeventyFive.slice(0,15).map((item, index) => 
                        
                            <CallsCell key={"calls" + `${index}` + `${item}`} called={props.modalContent.includes(item)? true : false}>
                                {item}
                            </CallsCell>
                            

                        )
                    } 
            </CallsRow>
            <CallsRow>
            <CallsCell title>I</CallsCell>
                    {ArraySeventyFive.slice(15,30).map((item, index) => 
                        
                            <CallsCell key={"calls" + `${index}` + `${item}`} called={props.modalContent.includes(item)? true : false}>
                                {item}
                            </CallsCell>
                            

                        )
                    } 
            </CallsRow>
            <CallsRow>
            <CallsCell title>N</CallsCell>
                    {ArraySeventyFive.slice(30,45).map((item, index) => 
                        
                            <CallsCell key={"calls" + `${index}` + `${item}`} called={props.modalContent.includes(item)? true : false}>
                                {item}
                            </CallsCell>
                            

                        )
                    } 
            </CallsRow>
            <CallsRow>
            <CallsCell title>G</CallsCell>
                    {ArraySeventyFive.slice(45,60).map((item, index) => 
                        
                            <CallsCell key={"calls" + `${index}` + `${item}`} called={props.modalContent.includes(item)? true : false}>
                                {item}
                            </CallsCell>
                            

                        )
                    } 
            </CallsRow>
            <CallsRow>
            <CallsCell title>O</CallsCell>
                    {ArraySeventyFive.slice(60,75).map((item, index) => 
                        
                            <CallsCell key={"calls" + `${index}` + `${item}`} called={props.modalContent.includes(item)? true : false}>
                                {item}
                            </CallsCell>
                            

                        )
                    } 
            </CallsRow> */}


                {ArraySeventyFive.slice(0,75).map((item, index) => 
                        
                        <CallsCell key={"calls" + `${index}` + `${item}`} called={props.modalContent.includes(item)? true : false}>
                            {item}
                        </CallsCell>
                        

                    )
                }
            
        </CallsContainer>
    )

        
}

export default ModalContent