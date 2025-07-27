import { Outlet } from "react-router";
import { Header } from "../components/Header/Header";


export function AppLayout() {
   return (
       <>
           <Header>
                <em>Shoppping List App</em>
           </Header>


           <div className="container mx-auto p-2">
               <Outlet />
           </div>
       </>
   );
}
