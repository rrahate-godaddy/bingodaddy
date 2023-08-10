import { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import '../../App.css';
import Modal from './modal/modal.js';

function PlayerList (props) {

    const Pill = styled.div`
        padding: 2px 10px;
        display: inline-block;
        background-color: #002e2c;
        font-size: 0.9em;
        text-align: center;
        border-radius: 5px;
        color: #eee;
    `


    return(
        <div className='right-rail-container'>
            <h3 className="cont-h2">Players <div className='pill'>{props.playerList.length}</div></h3>
                
            {(props.playerList.length !== 0)&&
                props.playerList.map((item, index) => 
                                        
                    <div key={"players" + `${index}` + `${item}`}>{item.playerName}</div>

                )
            
            }
        </div>
    )

}

export default PlayerList