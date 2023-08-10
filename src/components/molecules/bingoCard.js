import { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled'
import CardCell from '../atoms/cardcell';
import { useParams, useNavigate } from 'react-router-dom';
import { ReturnCardData, GenerateCard } from '../utilities';
import { DB, Auth }  from "../../firebaseConfig/firebaseConfig.js"
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc, collection, updateDoc, arrayUnion, getDocs, onSnapshot, arrayRemove, writeBatch } from "firebase/firestore"; 
import { useTheme } from '@emotion/react';

function BingoCard(props) {

    const theme = useTheme();

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
    
    

    useEffect(() => {
        setCalledArray(props.calls)
        GetClickedCells()
        console.log("Card Refresh")
    },[props.calls])
    

   

    async function GetClickedCells() {
        
        const cardCellClickRef = doc(DB, "players", playerID, "cardsCellClick", gameid)
        const cellSnap = await getDoc(cardCellClickRef);
        
        if (cellSnap.exists()) {
          const x = cellSnap.data()
          setClickedCellArray(x)
          
        } 
    }

    useEffect(() => {

        if(playerID) {

        const unsub = onSnapshot(doc(DB, "players", playerID, "cardsCellClick", gameid), (doc) => {
          const x = doc.data()
          setClickedCellArray(x)
        
        });

        return () => unsub();
        }

    },[])

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

    // Set Clicked Cells
    async function cellClickDB(x,y) {
        
        const cardCellClickRef = doc(DB, "players", playerID, "cardsCellClick", gameid)

        const newCardCellClick = { 
                [y]: arrayUnion(x)
          }
         
        const cellSnap = await getDoc(cardCellClickRef);
        
        if (cellSnap.exists()) {
            const setCardsSnap = await updateDoc(cardCellClickRef, newCardCellClick);
            GetClickedCells()

        } else {
            
            const setCardsSnap2 = await setDoc(cardCellClickRef, newCardCellClick);
            GetClickedCells()
        }

    }

    function cellClick(item,cardnumber) {

        const isCalled = check(item)
        if(isCalled) {
            cellClickDB(item,cardnumber)
        } else return false

    }


    useEffect(() => {
        console.log(props.newCardAdded)
    },[props.newCardAdded])


    // ONCE NEW CARD IS ADDED GET IT FOR DB
    useEffect(() => {

        if(newCardAdded || props.newCardAdded) {
          async function gettingNewCard() {
            const A = await ReturnCardData(DB, playerID, gameid)
              
              if(A !== null) {
                setCards(A.sessionCards)
              } 
          }
          gettingNewCard();

        } 

      },[newCardAdded, props.newCardAdded])

      // Refresh Cards
      useEffect(()=> {
        setNewCardAdded(false);

      },[cards])

    


   

    // BRAND NEW CARDS FOR EXISTING PLAYER
    async function BrandNewCard() {

        console.log("Creating Brand New Card")
        const cardRef = doc(DB, "players", playerID, "cards", gameid)
        const cardData= GenerateCard()
        const newCard = {
          sessionCards: [cardData]
        }
        const setCardsSnap = await setDoc(cardRef, newCard);
        setNewCardAdded(true)
    }

    async function getCards() {
        const A = await ReturnCardData(DB, playerID, gameid)
        if(A !== null) {
          // PLAYER HAS CARDS
          setCards(A.sessionCards)
        } else {
          // PLAYER DOES NOT HAVE CARDS
          BrandNewCard();
        }
    } // END GETCARDS




    useEffect(() => {
        if(playerID) {
            getCards()
        }
    },[playerID])

    // AUTHENTICATION
    useEffect(() => {
    
        onAuthStateChanged(Auth, (user) => {
          if (user) {
            const uid = user.uid;
            setPlayerID(uid)      
          } 
        });

    },[]);


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
                                    cellClick={cellClick}
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
                                    cellClick={cellClick}
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
                                    cellClick={cellClick}
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
                                cellClick={cellClick}
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
                                cellClick={cellClick}
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

export default BingoCard
