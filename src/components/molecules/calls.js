import { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import { doc, setDoc, getDoc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore"; 
import { DB } from "../../firebaseConfig/firebaseConfig.js"
import Modal from './modal/modal.js';
import Button from '../atoms/button.js';
import '../../App.css';

function Calls(props) {
    
    const[calledArray, setCalledArray]= useState([]);
    const[calledNumber, setCalledNumber]= useState();
    const[calledNumberDB, setCalledNumberDB]= useState();
    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalContent, setModalContent] = useState()


    var ArraySeventyFive = Array.from({length: 75}, (_, i) => i + 1)
    const callsRef = doc(DB, "sessions", props.gameid)
    
    // useEffect(() => {

    //     async function GetCalls() {
            
    //         const callsSnap = await getDoc(callsRef);
            
    //         if (callsSnap.exists()) {
    //           const x = callsSnap.data()
    //           setCalledArray(x.calls)
              
    //         } 
    //       }
          
    //       GetCalls();
          
    // },[props.gameid])

    useEffect(() => {
        if(calledArray.length == 75){
            props.bingoCalled(true)
        }
    },[calledArray])


    useEffect(()=> {

        

        if(calledNumberDB !== undefined && calledNumberDB !== 0) {


            async function SetCalls() {
        
                const writeArray = await updateDoc(callsRef, {
                    calls: arrayUnion(calledNumberDB)
                });

                const writeCallNumber = await updateDoc(callsRef, {
                    calledNumber: calledNumberDB
                });

            } 
              
            SetCalls();
        } 

    },[calledNumberDB])

    useEffect(() => {

        const unsub = onSnapshot(doc(DB, "sessions", props.gameid), (doc) => {
            const x = doc.data()
            setCalledArray(x.calls)
            setCalledNumber(x.calledNumber)
          });

          return () => unsub();
    },[])


    function Shuffle(a) {
            
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

 

    function NewCall() {
        
        if(calledArray !== undefined) {
            
            let difference = ArraySeventyFive.filter(x => !calledArray.includes(x))
            let shuffled = Shuffle(difference)
            let result = shuffled.pop();
            setCalledNumberDB(result)
        }
 

    }

    function GetLetter(x) {
        
        if(x > 0 && x <= 15) {
            return "B"
        } else if(x >=   16 && x <= 30) { return "I" }
        else if( x >= 31 && x <= 45) { return "N" }
        else if(x >= 46 && x <= 60) { return "G" }
        else if(x >= 61 && x <= 75) { return "O" }
    }

    function RecentCalls() {
        setModalVisibility(true)
    }

    return(
        <div className='Container'>  
            <div>
                <div className='cont-h2'>Calls&nbsp;&nbsp;
                    {(calledArray.length !== 0)&&props.admin&& 
                        <small><a onClick={RecentCalls} secondary>View All</a></small>
                    }
                    {/* {(Object.keys(calledArray).length != 0)&&
                    <div className="pill">
                        {calledArray.length}
                    </div>
                    } */}
                </div>

                

            
                {(Object.keys(calledArray).length == 0)&&
                    <b className='called-num'>Waiting...</b>
                }
                {(calledNumber !== 0)&&
                    <b className='called-num'>{GetLetter(calledNumber)} - {calledNumber}</b>
                }

            </div>
            



            
            {props.admin&& 
                
                <Button onClick={NewCall}>Call It</Button>

            }
                
            {(calledArray.length !== 0)&&!props.admin&&

                <Button secondary onClick={RecentCalls}>View Calls</Button>
            }
            
            <Modal visible={modalVisibility} setVisibility={() => setModalVisibility(false)}  modalContent={calledArray} />
            
            
        </div>
    )
}

export default Calls
