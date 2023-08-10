import { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import { ReturnCardData } from '../../utilities';
import { useParams } from 'react-router-dom';
import { DB } from '../../../firebaseConfig/firebaseConfig.js'
import { doc, getDoc } from "firebase/firestore"; 
import BingoCardVerify from '../bingoCardVerify.js';



function ModalVerify(props) {

    const H3 = styled.h3`
        text-align: left;
        font-size: 2em;
        margin-bottom: 0;
        margin: 40px 0px 0px 40px;
        color: #111;
    `

    const[playerCards, setPlayerCards] = useState([])
    const[calledArray, setCalledArray] = useState([])
    let { gameid } = useParams();
    const callsRef = doc(DB, "sessions", gameid)

    // async function GetCalls() {
            
    //     const callsSnap = await getDoc(callsRef);
        
    //     if (callsSnap.exists()) {
    //       const x = callsSnap.data()
    //       setCalledArray(x.calls)
          
    //     } 
    // }
      
    
    
    // async function getCards(x, y) {
        
    //     const A = await ReturnCardData(DB, x, gameid)
        
    //     if(A !== null) {
    //       // PLAYER HAS CARDS
          
    //       setPlayerCards((playerCards) => [...playerCards, 
    //         {   name: y,
    //             id: x,
    //             cards: A.sessionCards
    //         }
        
    //     ])
        
    //     } else {
    //         console.log("nothing")
    //     }

    // } // END GETCARDS

    // useEffect(() => {
       
    //     if(Object.keys(props.calledList).length != 0) {
    //         props.calledList.forEach(item => 
    //                 getCards(item.playerID, item.playerName) 
    //         )

    //         GetCalls();
    //     }
       
    // },[props.calledList])
    

    // useEffect(() => {
    //     console.log(playerCards)
    //     console.log(props.calledList)
    // },[playerCards])

    useEffect(() => {
        console.log(props.calledList)

    },[])
    
    return (

        <>
            {(Object.keys(props.calledList).length !== 0)&&
                props.calledList.map((item, index) => 
                    <div>
                        <H3>{item.playerName}</H3>
                        <BingoCardVerify pid={item.playerID}  />
                    </div>

                )
            
            }
        </>
       
    )

        
}

export default ModalVerify