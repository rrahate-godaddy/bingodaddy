import { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled'
import CardCell from '../atoms/cardcell';
import { useParams, useNavigate } from 'react-router-dom';
import { ReturnCardData, GenerateCard } from '../utilities';
import { DB, Auth }  from "../../firebaseConfig/firebaseConfig.js"
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc, collection, updateDoc, arrayUnion, getDocs, onSnapshot, arrayRemove, writeBatch } from "firebase/firestore"; 
import { useTheme } from '@emotion/react';

function BingoCardVerify(props) {

    

    const CardContainer = styled.div`
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: center;
        overflow: scroll;
        padding: 0 20px;

        & > div {
            margin: 10px 20px;
            padding: 0 20px 20px 20px;
            background-color: #fff;
            border-radius: 20px;
            -webkit-box-shadow: 0px 18px 22px -1px rgba(0,0,0,0.33); 
            box-shadow: 0px 18px 22px -1px rgba(0,0,0,0.33);
        }
    `
    
    const Card = styled.div`
        display: flex;
        flex-direction: column;
        font-size: 1.5em;
        justify-content: flex-start;

        & > .cardNumber {
            display: flex;
            flex-direction: row;
        }
        
    `
    const CardCol = styled.div`
        padding: 0;
        margin: 0
    `

    const CardTitle = styled.div`

        margin: 0 -20px 10px -20px; 
        padding: 20px;
        background: #1966B3;
        display: flex;
        flex-direction: row;
        border-radius: 20px 20px 0 0;
        
    `

    const [bCalled, setBCalled] = useState(false)
    const [cards, setCards] = useState([])
    const [playerID, setPlayerID] = useState()
    const [newCardAdded, setNewCardAdded] = useState(props.newCardAdded) 
    const [calledArray, setCalledArray] = useState([])
    const [clickedCellArray, setClickedCellArray] = useState([])
    let { gameid } = useParams();
    

    // useEffect(() => {
    //     GetClickedCells()
    //     console.log("Card Refresh")
    // },[props.cardsData])

    // useEffect(() => {
    //     console.log(props.bingoList)
    //     if(Object.keys(props.bingoList).length != 0) {
    //         props.bingoList.forEach(item => 
    //                 getCards(item.playerID, item.playerName) 
    //         )

    //     }
    // },[props.bingoList])

    useEffect(() => {
        getCards(props.pid)
        GetClickedCells(props.pid)
    },[props.pid])

    async function GetClickedCells(a) {
        
        const cardCellClickRef = doc(DB, "players", a , "cardsCellClick", gameid)
        const cellSnap = await getDoc(cardCellClickRef);
        
        if (cellSnap.exists()) {
          const b = cellSnap.data()
          setClickedCellArray(b)
        } 
    } // END Get Clicked Cells

    async function getCards(x) {
        
        const A = await ReturnCardData(DB, x, gameid)
        if(A !== null) {
          // PLAYER HAS CARDS

          setCards(A.sessionCards)
        
        } else {
            console.log("nothing")
        }

    } // END GETCARDS


    const callsRef = doc(DB, "sessions", gameid)

    


    function bingoCalled () {
        props.bingoCalled(true)
    }


    function check(x) {
       
       const A = calledArray
       if((A !== undefined) && (A !== null)) {
            if(x == "FREE") {
                return true
            } else return A.includes(x)
       }
       
       
    }

    function checkClicked(x, ind) {
       const A = clickedCellArray
       if(x == "FREE") return true
       else if((A[ind] !== undefined) && (A[ind] !== null)) {
            if(A[ind].includes(x)) return true
            else return false
       }
    }
    


   




    return(
        
        <CardContainer>
            
        {cards&&
          <>
          
              {cards.map((card, index) => 
              <div>
                {/* <CardTitle>
                    <p>Card {index+1}</p>
                </CardTitle> */}

                <Card key={"Card" + `${index}`}>
                
                    <CardTitle>
                        <CardCell title>B</CardCell>
                        <CardCell title>I</CardCell>
                        <CardCell title>N</CardCell>
                        <CardCell title>G</CardCell>
                        <CardCell title>O</CardCell>
                    </CardTitle>

                    <div className="cardNumber">
                    
                        <CardCol key={"B" + `${index}`}>
                            
                            {card.b.map((item, index2) => 
                                <CardCell 
                                key={"B" + `${index}` + `${index2}`+ `${item}`} 
                                    active={checkClicked(item, index)? true : false}
                                    item={item}
                                    cardnumber={index}
                                    calls={calledArray}
                                >
                                    {item}
                                
                                </CardCell>
                            )}  
                            
                        </CardCol>

                        <CardCol key={"I" + `${index}`}>
                            
                            {card.i.map((item, index2) => 
                                <CardCell 
                                    key={"I" + `${index}` + `${index2}` + `${item}`}
                                    active={checkClicked(item, index)? true : false}
                                    item={item}
                                    cardnumber={index}
                                    
                                    calls={calledArray}
                                >
                                    {item}
                                </CardCell>
                            )}  
                            
                        </CardCol>

                        <CardCol key={"N" + `${index}`}>
                            
                            {card.n.map((item, index2) => 
                                <CardCell 
                                    key={"N" + `${index}` + `${index2}` + `${item}`}
                                    active={checkClicked(item, index)? true : false}
                                    item={item}
                                    cardnumber={index}
                                    calls={calledArray}   
                                >
                                    {item == "FREE" ? "😎" : item }
                                </CardCell>                
                            )}  
                            
                        </CardCol>

                        <CardCol key={"G" + `${index}`}>
                            
                            {card.g.map((item, index2) => 
                                <CardCell 
                                key={"G" + `${index}` + `${index2}` + `${item}`}
                                active={checkClicked(item, index)? true : false}
                                item={item}
                                cardnumber={index}
                                calls={calledArray}
                                >
                                    {item}
                                </CardCell>
                            )}  
                            
                        </CardCol>

                        <CardCol key={"O" + `${index}`}>
                            
                            {card.o.map((item, index2) => 
                                <CardCell 
                                key={"O" + `${index}` + `${index2}` + `${item}`}
                                active={checkClicked(item, index)? true : false}
                                item={item}
                                cardnumber={index}
                                
                                calls={calledArray}
                                >
                                    {item}
                                </CardCell>
                            )}  
                            
                        </CardCol>
                    </div>

                
                </Card>
              </div>
              )}
            
          </>
          }

            
        </CardContainer>
    )
}

export default BingoCardVerify
