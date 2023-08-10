import { useState, useEffect } from 'react';
import BingoCard from '../components/molecules/bingoCard.js';
import Calls from '../components/molecules/calls.js';
import ModalPlayerName from '../components/molecules/modal/modalPlayerName.js';
import { GenerateCard, ReturnCardData } from '../components/utilities.js';
import { DB, Auth }  from "../firebaseConfig/firebaseConfig.js"
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { signInAnonymously } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc, collection, updateDoc, arrayUnion, getDocs, onSnapshot, arrayRemove, writeBatch } from "firebase/firestore"; 
import Modal from '../components/molecules/modal/modal.js';
import PlayerList from '../components/molecules/playerList.js';
import BingoCalled from '../components/molecules/bingoCalled.js';
import Button from '../components/atoms/button.js';
import Players from '../components/molecules/players.js';
import Fireworks from './confetti.js';
import { MdOutlineGridOn, MdRule, MdCampaign, MdContentCopy, MdWavingHand } from "react-icons/md";
import Layout from '../components/molecules/gameLayout.js';
import ModalRules from '../components/molecules/modal/modalRules.js';
import Growl from '../components/molecules/growl.js';
import Logo from "../imgs/logo.png"



function GameSession() {
    
    const [gameEnd, setGameEnd] = useState(false)
    const [playerID, setPlayerID] = useState()
    const [newPlayer, setNewPlayer] = useState(false)
    const [bingoCalled, setBingoCalled] = useState(false)
    const [bingoCalledList, setBingoCalledList] = useState([])
    const [playerName, setPlayerName] = useState("")
    const [playerList, setPlayerList] = useState([])
    const [newCardAdded, setNewCardAdded] = useState(false) 
    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalRulesVisibility, setModalRulesVisibility] = useState(false)
    const [growlVisible, setGrowlVisible] = useState(false)
    const [growlContent, setGrowlContent] = useState("")
    const [cards, setCards] = useState([]) 
    const [calls, setCalls] = useState([]) 
    const [adminID, setAdminID] = useState()
    const [admin, setAdmin] = useState(false)
    let { gameid } = useParams();
    const navigate = useNavigate()
    

    
    // GET PARAMS from the url - DONE
    // Subscribe to player list - Is this needed?
    // On ENTER
    // IF ADMIN - Get user data from DB
    // Create a card and add cardID to session card array

    // SHOW ADMIN A Button to end session
    // Subscribe to CARDS

    // If NOT ADMIN - Sign user In and 
    // IF UUID IS not it DB ask for a name and email
    // IF UUID is in DB then add playerID to session player array

    // On EXIT USER

    //Subscribe to the SESSION PlayerList and Bingo Calls
    useEffect(() => {

        const unsub = onSnapshot(doc(DB, "sessions", gameid), (doc) => {
          const x = doc.data()
          const play = x.players
          setPlayerList(x.players) 
          setAdminID(x.admin)
          setBingoCalledList(x.bingo)
          setGameEnd(x.sessionEnd)
          setCalls(x.calls)
        });

        return () => unsub();

    },[])

    // SESSION END
    // Check game status
    useEffect(() => {
      if(gameEnd) {
        navigate('/'+ gameid + '/end',  { state: { 
          "admin": adminID,
          "playerName" : playerName,
          "playerID" : playerID,
        } })
      }
    },[gameEnd])

    async function adminGameEnd() {

      const sessionRef = doc(DB, "sessions", gameid)
      const setGameStop = await updateDoc(sessionRef, {
        sessionEnd: true
      }); 

    }

    async function leaveGame() {
      navigate('/');

      const sessionRef = doc(DB, "sessions", gameid)

      const playerDataSession= {
        playerID: playerID,
        playerName: playerName,
      }

      const writeArray = await updateDoc(sessionRef, {
        players: arrayRemove(playerDataSession)
      });

      

    }

  


    // useEffect(() => {
    //   console.log("render Cards")
    // },[cards])

    // DID SOMEONE CALL BINGO
    useEffect(() => {
      if(Object.keys(bingoCalledList).length !== 0) {
        setBingoCalled(true) 
      }
    },[bingoCalledList])

    // ON SESSION END BY ADMIN


    // AUTHENTICATION
    useEffect(() => {
    
        onAuthStateChanged(Auth, (user) => {
          if (user) {
            const uid = user.uid;
            setPlayerID(uid)
            
          } else {
            signInAnonymously(Auth)
            .then(() => {
              console.log("Signed In")
            })
            .catch((error) => {
              // Add Error Here
            });
          }
        });

      
      },[]);


       

      // Brand New card for new or exisitng players
      // async function BrandNewCard() {

      //   console.log("Creating Brand New Card")
      //   const cardRef = doc(DB, "players", playerID, "cards", gameid)
      //   const cardData= GenerateCard()
      //   const newCard = {
      //     sessionCards: [cardData]
      //   }
      //   const setCardsSnap = await setDoc(cardRef, newCard);
      //   setNewCardAdded(true)
      // }

      // CHECK ABOUT PLAYER POST AUTHENTICATION
      
      useEffect(()=> {
       
        if(playerID) {  

          //UTILS - CHECK IF PLAYER HAS CARDS FUNCTION
          // async function getCards() {
          //   const A = await ReturnCardData(DB, playerID, gameid)
          //   if(A !== null) {
          //     // PLAYER HAS CARDS
          //     setCards(A.sessionCards)
          //   } else {
          //     // PLAYER DOES NOT HAVE CARDS
          //     BrandNewCard();
          //   }
          // } // END GETCARDS
          
          //UTILS - ADD PLAYER TO PLAYER OR GAME DB
          async function AddPlayerDB() {            
            
            const playersRef = doc(DB, "players", playerID)
            const playerSnap = await getDoc(playersRef);
            const sessionRef = doc(DB, "sessions", gameid)
            
            // CHECK IF PLAYER IS IN PLAYER DATABASE
            if (playerSnap.exists()) {
              setNewPlayer(false)   
              // YES PLAYER IN PLAYER DATABASE
              const x = playerSnap.data();
              setPlayerName(x.playerName);
              
              const playerDataSession= {
                playerID: playerID,
                playerName: x.playerName,
              }
              
              // ADD PLAYER TO GAMES DB

              const writeArray = await updateDoc(sessionRef, {
                players: arrayUnion(playerDataSession)
              });

              // PLAYER ADDED TO GAMES DB
              // GET PLAYER CARDS
              // getCards();
              
              
            } else {
              // NO, PLAYER NOT IN PLAYER DATABASE
              setNewPlayer(true)              
              
            }

          } // END ADD PLAYER DB
          
          
          // CHECK IF PLAYER IS IN GAME DATABASE
          if(Object.keys(playerList).length !== 0) {
            let finder = playerList.some(x => x.playerID === playerID)
            
            if(finder) {
              // PLAYER IS IN GAME DB && SET PLAYER NAME
              let newfinder = playerList.find(x => x.playerID === playerID)
              setPlayerName(newfinder.playerName)
              // getCards();
              
            } else {
              // PLAYER IS NOT IN GAME DB
              // IF PLAYER IS IN PLAYER DB ADD TO GAME
              AddPlayerDB()

            }
            
          } else {
            // Player List is not coming back
            console.log("0 Players")
            
          }

        }

      },[playerID, playerList])


      useEffect(() => {

        if(newPlayer) {
          if(playerName.length !== 0) {
            const playerData= {
              playerID: playerID,
              playerName: playerName,
            }

            const playerDataSession= {
              playerID: playerID,
              playerName: playerName,
            }

            const playersRef = doc(DB, "players", playerID)
            const sessionRef = doc(DB, "sessions", gameid)
            
            // ADD PLAYER TO SESSION AND PLAYER DB
            async function AddPlayerSessionDB () {
              const setPlayerSnap = await setDoc(playersRef, playerData);
              
              const setGameSnap = await updateDoc(sessionRef, {
                players: arrayUnion(playerDataSession)
              });
            }
            
            AddPlayerSessionDB();
            // CreateNewCard();
            setNewPlayer(false);
               
          } 
        } 
      },[playerName])
      


      // ONCE NEW CARD IS ADDED GET IT FOR DB
      useEffect(() => {

        if(newCardAdded) {
          async function gettingNewCard() {
            const A = await ReturnCardData(DB, playerID, gameid)
              
              if(A !== null) {
                setCards(A.sessionCards)
              } 
          }
          gettingNewCard();          
        } 

      },[newCardAdded])

      // Refresh Cards
      useEffect(()=> {
        
        setGrowlContent("New Card Added!")
        setNewCardAdded(false);
        
      },[cards])
      
      // THIS WILL MAKE SURE THAT ADMIN ID IS RECIEVED AND ADMIN IS SET TRUE
      useEffect(()=> {
        if((adminID!== undefined || playerID !== undefined) && (adminID == playerID)) {
          setAdmin(true)
        } 
      },[adminID, playerID])




      //CREATE A CARD FROM LINK FUNCTION
      async function CreateNewCard() {
        
  
          // CREATE NEW CARD
          const cardData = GenerateCard()
          const A = await ReturnCardData(DB, playerID, gameid)
        
          if (Object.keys(A.sessionCards).length >= 2) {

            setGrowlContent("Bingo Card Limit Reached!");

          } else {
            
            if(A !== null) {
              const cardRef = doc(DB, "players", playerID, "cards", gameid)
              const writeCardArray = await updateDoc(cardRef, {
                sessionCards: arrayUnion(cardData)
              });
              setNewCardAdded(true)

            } else {

              // BrandNewCard();
              setNewPlayer(false); 
            }
          }

        

      } 

      function recNameValue(x) {
        setPlayerName(x)
      }

      function bCalled(bcalled) {
        

        const sessionRef = doc(DB, "sessions", gameid)

          async function PlayerCalledBingoSessionDB (bcalled) {
            
            const playerDataSession= {
              playerID: playerID,
              playerName: playerName,
              
            }

            const writeBingoArray = await updateDoc(sessionRef, {
              bingo: arrayUnion(playerDataSession)
            });

          

          }

          if (Object.keys(calls).length >= 4) {
            PlayerCalledBingoSessionDB();
          } else {
            alert("Patience! We've called less then 5 numbers");
          }

      }


      //Copy to Clipboard
      const share = () => {
        
        navigator.clipboard.writeText(window.location.href).then(function() {
          setGrowlContent("Link copied to clipboard")
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
      };

      //Growl

      useEffect(() => {
    
        
        if(!growlVisible) {
          if(growlContent) {
            setGrowlVisible(true)
          }
        } else {
          setGrowlVisible(false)
        }

      },[growlContent])

      useEffect(() => {
        
        let interval;
        if (growlVisible) {
          interval = setInterval(() => setGrowlContent(""), 3000);
        } else {
          setGrowlContent("")
        }
        return () => clearInterval(interval);
      }, [growlVisible]);

      // VERIFY CARDS IF ADMIN
      function verifyCards() {
        if(admin) {
          setModalVisibility(true)
        }
      }

      const canvasStyles = {
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
      };

      return(
        <>
          <div className='player-page-layout'>

            {newPlayer&& 
              <ModalPlayerName value={recNameValue}  />
            }
            
            
            <div className="player-card-area">
              
              
                <Calls admin={admin} gameid={gameid} gameEnd={() => setGameEnd(true)} />
                
                
              
              
              <BingoCard  newCardAdded={newCardAdded} calls={calls} />
              {/* <div className='hoz-group'>
                <div className="large-add-btn" onClick={CreateNewCard} secondary><MdOutlineGridOn className='icon' /> Add a Card</div>
              </div> */}
              
              
              <Modal visible={modalVisibility} setVisibility={() => setModalVisibility(false)}  verify={true} calledList={bingoCalledList}  />
              
            </div>

            <div className='player-right-pane-area'>
              
             
                
                {bingoCalled&&admin&&
                  
                    <BingoCalled list={bingoCalledList} verify={() => verifyCards()} />
                  
                }

 
             
                
              <Button onClick={bCalled}>
                <MdCampaign className="icon" /><br />
                Call Bingo
              </Button>

              {(playerList.length !== 0)&&

                <PlayerList playerList={playerList} />

              }

            

              
              <div className='btn-group'>
                <Button onClick={CreateNewCard} secondary><MdOutlineGridOn className='icon' /> Add a Card</Button>
                <Button secondary onClick={() => setModalRulesVisibility(true)}><MdRule className='icon'  /> Game Rules</Button>
              </div>
              
              <ModalRules visible={modalRulesVisibility} setVisibility={() => setModalRulesVisibility(false)} />
              

              
                  
                  <div className='btn-group'>
                    <Button secondary onClick={share}>
                        <MdContentCopy />
                        Share
                    </Button>
                    {admin ?
                      <Button onClick={adminGameEnd} red>
                        <MdWavingHand />
                        End Game
                      </Button>

                      :

                      <Button onClick={leaveGame} red>
                        Leave Game
                      </Button>

                    }

                    
                  </div>
                  <p className='title'>
                    <img src={Logo} width="120px" />
                  </p>
                  
              
            

              
            
            </div>

            
              
          </div>

        {bingoCalled&&
          <Fireworks />
        }

          <Growl visible={growlVisible} closeGrowl={() => setGrowlVisible(false)}  content={growlContent} />
        </>
      );
}

export default GameSession