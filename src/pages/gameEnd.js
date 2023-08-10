import { useState, useEffect } from 'react';
import { DB }  from "../firebaseConfig/firebaseConfig.js"
import styled from '@emotion/styled'
import Button from '../components/atoms/button';
import { ReturnPlayerDB } from '../components/utilities.js';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { doc, updateDoc, deleteDoc, onSnapshot} from "firebase/firestore"; 
import HomeImg from "../imgs/home.jpg"
import Logo from "../imgs/logo.png"

const BG = styled.div`
    background-color: #A6FFF8;
    color: #111;
    width: 100%;
    height: 100%;
    overflow: scroll;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    & > .logo {
      width: 20px;
    }
  
`

const IMG = styled.div`
    width: 50%;
    height: 100vh;
    overflow: hidden;
    
    & > img {
      width: 100%;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    
    
     & > div {
        margin-right: 20px;
     }
`
const Content = styled.div`
    width: 50%;
    font-size: 1.2em;
    padding: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    

    & > h1 {
        font-weight: 400;
        line-height: 80px;
        margin: 40px 0;
        font-size: 4em;
    }
`

function GameEnd() {
    
    let { gameid } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [admin, setAdmin] = useState(false)
    const [gameEnd, setGameEnd] = useState(true)

    useEffect(() => {
        console.log(gameid)
        const x = location.state.playerID
        const y = location.state.admin

        console.log(y)
        if(x == y) {
            setAdmin(true)
        }
        
    },[])

    useEffect(() => {

        const unsub = onSnapshot(doc(DB, "sessions", gameid), (doc) => {
          const x = doc.data()
          setGameEnd(x.sessionEnd)
          
        });

        return () => unsub();

    },[])

    async function restart() {

       // For Every Player who decides to join back clear the cards
       
       const A = await ReturnPlayerDB(DB, location.state.playerID)

       if (A != null) {
        
        // Admin in Player DB

            const sessionDocData= {
            sessionID: gameid,
            admin: location.state.admin,
            sessionEnd: false, 
            players: [
                {
                playerName: A.playerName,
                playerID: A.playerID,
                }
            ],
            calls:[],
            bingo:[],
            calledNumber: 0

            } 
            
            const sessionRef = doc(DB, "sessions", gameid) 

            const playerRefCard = doc(DB, "players", A.playerID, "cards", gameid)
            const playerRefCardClick = doc(DB, "players", A.playerID, "cardsCellClick", gameid)

            if(admin) {
                const setGameStop = await updateDoc(sessionRef, sessionDocData); 
            }


            const playerCardClear = await deleteDoc(playerRefCard);
            const playerCardClickClear = await deleteDoc(playerRefCardClick);

            navigate('/'+ gameid)
        }
          
          
          

    }

    


    return (
        <BG>
            <IMG>
              <img src={HomeImg}  />
            </IMG>
            <Content>
                <p><img src={Logo} className="logo" width="60%" /></p>
                {gameEnd&&
                    <h1>Thanks for Playing!</h1>
                }

                {admin ?
                    <ButtonContainer>
                        <Button onClick={restart}>Restart Game</Button>
                        <Button onClick={() => navigate('/')} secondary>BinGoDaddy Home</Button>
                    </ButtonContainer>
                    :
                    
                    <div>
                        {!gameEnd ?
                            
                                <Button onClick={restart}>Re-join Game</Button>
                            
                            :


                            <ButtonContainer>
                                You will be able to re-join once the admin restarts the game     
                            </ButtonContainer>
                        }

                        
                    </div>
                }
            </Content>
            
        </BG>
    )
}

export default GameEnd
