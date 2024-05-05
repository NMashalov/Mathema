import {createBrowserRouter} from "react-router-dom";
import { Core } from './core/core';
import { Intro } from './pages/intro/intro';
import Law from './pages/law.mdx';
import { Routes } from './structs/routes';

import { Caleido } from './pages/draw/examples/caleido';
import { PdfReader } from './pages/pdf/core';
import { LoginPage } from './pages/login/login';
import { Draw } from "./pages/draw/draw";
import { ChessApp } from "./pages/chess/app";


export const public_router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/draw",
    element: <Draw/>
  },
  {
    path: "/chess",
    element: <ChessApp/>
  }
])

export const private_roter =  createBrowserRouter([
  {
    path: "/pdf",
    element: <PdfReader/>
  },
  {
    path: '/draw',
    element: <Core />,
    children: [
      {
        path: "/drawing/caleido",
        element: <Caleido/>,
      },
    ]
  },
  {
    path: "/",
    element: <Core />,
    children: [
      {
        path: `/`,
        element: <Intro />
      },
      {
        path: `/${Routes.law}`,
        element: <Law />,
      },
    ]
  }
  ]
)