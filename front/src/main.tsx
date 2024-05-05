import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import { useAtom } from 'jotai';
import { isLogged } from './store';

import { public_router,private_roter } from "./routers"

function App(){

  const [isLogin] = useAtom(isLogged)

  return (
    <>
      {!isLogin ?
        <RouterProvider router={public_router} />
        :
        <RouterProvider router={private_roter} />
      }
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
)
