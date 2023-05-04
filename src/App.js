import { useState, useEffect } from 'react';
import { FireApp, Auth }  from "./firebaseConfig/firebaseConfig.js"
import { ThemeProvider } from '@emotion/react';
import { theme } from './components/utilities.js';
import './App.css';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import RouterError from './pages/router/routerError.js';
import Home from './pages/home.js';
import GameSession from './pages/gameSession.js';
import GameEnd from './pages/gameEnd.js';
import Form from './components/atoms/form.js';
import Fireworks from './pages/confetti.js';


function App() {

  const [themeSel, setThemeSel] = useState(theme.light)
  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeSel(theme.dark)
    }
  },[])

  const router = createHashRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <RouterError />,
    },
    {
      path: "/:gameid",
      element: <GameSession />,
      errorElement: <RouterError />,
    },
    {
      path: "/:gameid/end",
      element: <GameEnd />,
      errorElement: <RouterError />,
    }
  ]);
 
  return (
    <ThemeProvider theme={themeSel}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
  
}

export default App;
