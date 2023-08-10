import { useState, useRef, useEffect, useCallback } from 'react';
import Button from './button';
import styled from '@emotion/styled'
import "../atoms/form.css"
import { useNavigate } from 'react-router-dom';



const Form = (props) => {

  const Container = styled.div`
   

    & > div {
      
      
      & > div {
        width: 50%;
      }
    }

  `

    const [textInput, setTextInput] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    

    function save() {

      if(Object.keys(textInput).length !== 0) {
        props.value(textInput)
        setShowError(false)
      } else {
        setShowError(true)
      }
      
        
    }

    function cancel() {
      navigate('/')
    }


    return (
      
      <div className='container'>
        <div>
          <input
            className='formInput'
            type="text"
            placeholder={props.join? "Enter Game ID" : "Enter Name"}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          {showError&&
            <p>Please enter a valid {props.join? "game id" : "name"}</p>
          }

          <div className='bttn-group'>
          <Button onClick={save}>
            {props.join?
              "Join Game" : "Join Game"
            }
            
          </Button>

        
          <Button onClick={props.cancel} secondary>
            Cancel
          </Button>
          
        </div>
       
        
        </div>
      </div>
        
    );
}

export default Form