import { useState, useEffect, useCallback, Children } from 'react';
import styled from '@emotion/styled'
import { useParams} from 'react-router-dom';
import "../atoms/cardcell.css"



const CardCell = (props) => {

    

    const Cell = styled.div`
        text-align: center; 
        width: 50px;
        height: 30px;
        display: flex;
        justify-content: center;
        padding: 25px;
        align-items: center;
        border: ${props => (props.title ? '1px solid #000' : props.active ? `1px solid #FED317` : `1px solid #61EDEA`)};
        border-radius: 10px;
        margin: 10px;
        cursor: ${props => (props.title ? 'default ' : 'pointer')};
        color: ${props => (props.title ? '#fff' : '#001e1d')};

        &:hover {
            background-color: ${props => (props.title ? 'none' : props.active ? 'none' : props.misClick ? '#FD341D' : '#fde8c8')};
            // -webkit-box-shadow: ${props => (props.title ? 'none' : props.active ? 'none' : props.misClick ? 'none' : ' inset -9px -8px 5px -4px rgba(0,0,0,1)')}; 
            // -moz-box-shadow: ${props => (props.title ? 'none' : props.active ? 'none' : props.misClick ? 'none' : ' inset -9px -8px 5px -4px rgba(0,0,0,1)')}; 
            // box-shadow: ${props => (props.title ? 'none' : props.active ? 'none' : props.misClick ? 'none' : ' inset -9px -8px 5px -4px rgba(0,0,0,1)')}; 
        }

        
        
        background-color: ${props => (props.title ? '#000' : props.active ? `#FED317` : '#fff')}; 
        background-color: ${props => (props.misClick ? '#FD341D' : "auto")};
        animation: ${props => (props.misClick && "horizontal-shaking 0.3s")};
        animation-iteration-count: 3;

    `

    const [active, setActive] = useState(props.active)
    const [misClick, setMisClick] = useState(false)
    let { gameid } = useParams();
    



    function cellClicked(item,cardnumber) {
        
        if(props.calls.includes(item) || item == "FREE") {
            props.cellClick(item, cardnumber)
            setActive(!active)
        } else {
            setMisClick(true)
        }
        
    }

    useEffect(() => {
        setTimeout(() => {
          setMisClick(false);
        }, 900)
      },);


    return (
        
    
            <Cell
                onClick={() => cellClicked(props.item, props.cardnumber)} 
                title={props.title}
                active={active} 
                misClick={misClick}
            >
                {props.children}
            </Cell>
     
    )

}

export default CardCell