import { useState, useEffect } from 'react';
import { FireApp, Auth }  from "./firebaseConfig/firebaseConfig.js"
import logo from './logo.svg';
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


function App() {

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
    <RouterProvider router={router} />
  );
  
}

export default App;
