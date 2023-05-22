import {createBrowserRouter} from "react-router-dom"
import Home from "./Pages/Home/Home"
import CreateTodo from "./Pages/Create/CreateTodo"
import UpdateTodo from "./Pages/Update/Update"
const Routes = createBrowserRouter([
       {
        path:"/",
        element:<Home/>
       },
       {
        path:"/Create-Todo",
        element:<CreateTodo/>
       },
       {
        path:"/Update-Todo/:todoId",
        element:<UpdateTodo/>
       },
    
]);

export default Routes;