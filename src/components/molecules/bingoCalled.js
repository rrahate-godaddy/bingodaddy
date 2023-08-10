import { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import bgwin from '../../imgs/win-bg.gif'
import Button from '../atoms/button';

function BingoCalled(props) {
    const Banner = styled.div`
        width: 30%;
        height: 30%;
        font-size: 1em;
        justify-content: center;
        background-image: url(${bgwin});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 200%;
        color: #000;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-radius: 10px;
        position: absolute;
        z-index: 10;
        left: 35%;
        top: 30%;
        border: 10px solid #eee;
    `
    
    const Bingo = styled.div`
        color: #000;
        font-weight: 700;
        font-size: 1.5em;
        padding: 5px 10px;
        border-radius: 30px;
        background-color: #fff;;
        display: inline-block;
        
    `

    const Pills = styled.div`
        color: #fff;
        font-weight: 400;
        font-size: 0.7em;
        margin-top: 5px;
        padding: 5px 10px;
        border-radius: 30px;
        background-color: #000;
        display: inline-block;
    `
    const PillsCont = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    `
    

    function review() {
        props.verify();   
    }

    useEffect(() => {
        console.log(props.list)
    },[props.list])


    return(
        <>

        <Banner>
            <Bingo>Bingo!</Bingo><br />
            {/* <Button onClick={review}>Review Winner's Card(s)</Button> */}
            <PillsCont>
            {(props.list.length !== 0)&&
                    
                props.list.map((item, index) => 
                                        
                    <Pills key={"bingo" + `${index}` + `${item}`} onClick={review}>
                        {item.playerName}
                    </Pills>

                )
                
            }
            </PillsCont>
        </Banner>

        </>
        
    )
}

export default BingoCalled
