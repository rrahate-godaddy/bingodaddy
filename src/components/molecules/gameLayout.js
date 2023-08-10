import styled from '@emotion/styled'
import { useTheme } from '@emotion/react';
import { Children } from 'react';

function Layout(props) {
    
    const theme = useTheme();
    const PPL = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;

        & > .player-card-area {
            width: 70%;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: scroll;
            background-color: ${theme.background};
            color: ${theme.color};
        }

        & > .player-right-pane-area {
            width: 30%;
            height: 100%;
            background-color: ${theme.rightrail.bg};
            color: ${theme.color};
            overflow: scroll;
            padding: 20px 2%; 
        }

        & > .right-rail-container {
            background-color: #083937;
            border-radius: 10px;
            padding: 20px; 
            
            margin: 20px 0;
            
        }

    `

    return (
        <PPL>
            {props.children}
        </PPL>
    );
}

export default Layout