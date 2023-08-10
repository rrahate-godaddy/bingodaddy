import { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import { doc, setDoc, getDoc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore"; 
import { DB } from "../../firebaseConfig/firebaseConfig.js"

function Players(props) {

    useEffect(()=> {

        console.log("Test COmp")
    },[])

    return(
        <div>
            Player
        </div>
    )
}

export default Players