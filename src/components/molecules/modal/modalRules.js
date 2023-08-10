import { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import Rules from "../../../imgs/rules.png"
import { MdClose } from "react-icons/md";

function ModalRules(props) {


    const ModalBg = styled.div`
        background-color: #A6FFF8;
        color: #fff;
        width: 100%;
        height: 100%;
        z-index: 20;
        position: absolute;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
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
            color: #111;
            padding: 20px 5%;
            
            & > h2 {
                margin-bottom: 10px;
            }

            & > ol {
                margin-left: 0;
                padding-left: 20px;
                list-style-position: outside;
                & > li {
                    margin: 10px 0;
                }

            }

            & > ul {
                margin-left: 0;
                padding-left: 20px;
                & > li {
                    margin: 10px 0;
                }
            }

            & > .img-container {
                width: 100%;
                padding: 0;

                & > img {
                    width: 90%;
                    margin-top: 20px;
                }
            }

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
            <ModalBg>
                <div className='close-btn'>
                    <div className='title'>
                        
                        Game Rules
                        
                    </div>
                    <CloseBtn onClick={props.setVisibility}>
                        <MdClose />
                    </CloseBtn>
                </div>
                <div className='content'>
                    
                    <h2>Play</h2>
                    <ol>
                        <li>
                            Called numbers will show in the <i><b>Calls</b></i> module. <br />
                            Only the Designated Caller (player who started the game) can see the <i><b>Call It</b></i> button to make calls.
                        </li>
                        <li>
                            If any of your cards contain the called number. Mark it by clicking on the number. 
                        </li>
                        <li>
                            Follow and mark along as the caller calls out new numbers.
                        </li>
                        <li>
                            If any of your cards have the one of winning patterns (shown below). Click the <b>Call Bingo</b> button.
                        </li>
                        <li>
                            First player to <b>Call Bingo</b> WINS the game.
                        </li>
                    </ol>


                    <br />
                    <h2>Winning Patterns</h2>
                    A player with any complete rows or columns or diagonals can <b>Call Bingo!</b>
                    <div className='img-container'>
                        <img src={Rules} />
                    </div>
                    
                    <br />
                    <h2>Roles</h2>
                    <ul>
                        <li>
                            <b>The Caller</b><br />
                            The person to start the game is the desginated caller or the game admin. 
                            <ul>
                                <li>
                                    The caller can invite players to the game by sharing the game url
                                </li>
                                <li>
                                    Only the caller can see the <i><b>Call It</b></i> button
                                </li>
                                <li>
                                    Clicking the <i><b>Call It</b></i> button will display the number to all players. The caller can choose to announce this number to players as well.
                                    <br /><br />
                                </li>
                            </ul>
                        </li>

                        <li>
                            <b>The Players</b><br /> 
                            <ul>
                                <li>
                                    At the start, every player (including the caller) gets a bingo card
                                </li>
                                <li>
                                    A player can have a maximum of 3 cards
                                </li>
                            </ul>
                        </li>
  
                        
                    </ul>

                    <br />
            
                </div>
            </ModalBg>
        )

    } else {
        return null
    }

        
}

export default ModalRules