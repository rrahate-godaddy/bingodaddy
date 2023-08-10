import { useState, useEffect } from 'react';
import { DB, Auth }  from "../firebaseConfig/firebaseConfig.js"
import { useTheme } from '@emotion/react';
import { nanoid } from 'nanoid';
import '../App.css';
import styled from '@emotion/styled'
import { signInAnonymously } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore"; 
import { ReturnPlayerDB } from '../components/utilities.js';
import ModalPlayerName from '../components/molecules/modal/modalPlayerName.js';
import Button from '../components/atoms/button.js';
import { useNavigate } from 'react-router-dom';
import HomeImg from "../imgs/home.jpg"
import Logo from "../imgs/logo.png"

function Home() {

  // const theme = useTheme()
  // const [darkMode, setDarkMode] = useState(true)

  // useEffect(() =>  {
  //   if(theme.scheme == 'dark') {
  //     setDarkMode(true)
  //   }
  // },[])

  const BG = styled.div`
    background-color: #A6FFF8;
    color: #111;
    width: 100%;
    height: 100%;
    overflow: scroll;
    display: flex;
    flex-direction: row;
    justify-content: center;
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
    margin-top: -80px;

    & > div {
        margin-right: 20px;
    }
  `
  const Content = styled.div` 
    text-align: left;
    color: inherit;
    width: 50%;
    padding: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > div {      
      font-size: 1.2em;
    }


    & > .sm {
      font-size: 1em;
      color: #555;

    }
  `

  const Desc = styled.div`
    
    width: 70%;
    color: #555;

    & > .title {
      font-size: 2.5em;
      line-height: 90%;
      margin: 0 0 30px 0;
      color: #111;
      
      

      & > small {
        font-weight: 300;
      }
    }
  `


    const [sessionID, setSessionID] = useState(nanoid(5))
    const [recentSessions, setRecentSessions] = useState([])
    const [playerData, setPlayerData] = useState([])
    const [newPlayer, setNewPlayer] = useState(false)
    const [join, setJoin] = useState(false)
    const [playerName, setPlayerName] = useState("")
    const [adminID, setAdminID] = useState()
    const navigate = useNavigate();

    useEffect(() => {

    
        signInAnonymously(Auth)
        .then(() => {
          console.log("Signed In")
        })
        .catch((error) => {
          // Add Error Here
        });
    
    
        onAuthStateChanged(Auth, (user) => {
          if (user) {
            const uid = user.uid;
            setAdminID(uid)
          } else {
            console.log("NOT")
          }
        });
    
      });
      

      // Check if Admin has another session
      useEffect(() => {
      
        if(adminID !== undefined) {
            
            const q = query(collection(DB, "sessions"), where("admin", "==", adminID));
            const newArray = []

            const querySnapshot = async() => {
                
                const queryData = await getDocs(q);
                
                queryData.forEach((doc) => {
                    const x = doc.data()
                    newArray.push(x.sessionID)
                });

                setRecentSessions(newArray)

            } 


            querySnapshot()
            
            
              
        }
        
      },[adminID])

      useEffect(() => {
        console.log(recentSessions)
      },[recentSessions])

      function joinSession() {
        setJoin(true)
      }

      useEffect(() => {
        if(join){
          setNewPlayer(true)
        }
      },[join])

      
      async function createNewSession() {

       const A = await ReturnPlayerDB(DB, adminID)

       if (A != null) {
        // Admin in Player DB

        const docData= {
          sessionID: sessionID,
          sessionName: "Test",
          admin: adminID,
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
        
        const docRef = doc(DB, "sessions", sessionID) 
        const docSnap = await setDoc(docRef, docData);
        navigate('/'+ sessionID)

       } else {
        // Admin Not in Player DB
        setNewPlayer(true)

       }

      } // END CREATE SESSION

      function recNameValue(x) {
        setPlayerName(x)
      }

      function cancel() {
        setNewPlayer(false)
        setJoin(false)
      }

      useEffect(() => {
        if(playerName.length !== 0 && !join) {
          setNewPlayer(false)
          const playerDocData= {
            playerName: playerName,
            playerID: adminID,
          }

          const sessionDocData= {
            sessionID: sessionID,
            sessionName: "Test",
            admin: adminID,
            sessionEnd: false, 
            players: [
              {
                playerName: playerName,
                playerID: adminID
              }
            ],
            calls:[],
            bingo: [],
            calledNumber: 0

          } 
          
          const sessionDocRef = doc(DB, "sessions", sessionID) 
          const playerDocRef = doc(DB, "players", adminID) 
          
          async function AddNewPlayer() {
            const sessionDocSnap = await setDoc(sessionDocRef, sessionDocData);
            const playerDocSnap = await setDoc(playerDocRef, playerDocData);
            navigate('/'+ sessionID)
          }
          
          AddNewPlayer()
        } else if(playerName.length !== 0 && join) {
          navigate('/' + playerName)
        }
      },[playerName])

  

      return(
        <BG>
            <IMG>
              <img src={HomeImg}  />
            </IMG>
            <Content>

              <Desc>
                {/* <p className='title'>Bin<b>GoDaddy</b></p>*/}

                <p><img src={Logo} className="logo" width="90%" /></p>
                A fun and engaging team building activity that is perfect for fostering a sense of unity and camaraderie within your group.
              </Desc>

              <ButtonContainer>
                  <Button onClick={createNewSession}>Start a new game</Button>
                  <Button secondary onClick={joinSession}>Join a game</Button>
              </ButtonContainer>

              <div className='sm'>made with ❤️ by DRIUX <br />🇺🇸 🇨🇦 🇰🇾 🇳🇱 🇰🇪</div>
            </Content>

            {/* {recentSessions&& 
                <>
                    <h2>Ongoing sessions</h2>
                    <ul>
                    {recentSessions.map((session, index) =>  
                            <li key={index}>{session}</li>  
                    )}  
                    </ul>    
                    
                </>
            } */}

            {newPlayer&& 
              <ModalPlayerName value={recNameValue} join={join} cancel={cancel} />
            }          
            
            
            
        </BG>
      );
}

export default Home