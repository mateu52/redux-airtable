import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./components/Layout/Layout";
import { UserHome } from "./pages/UsersHome";
import { Form } from "./pages/FormPage";

export const routes = {
    HOME: {
        path: '/',
    },
    FORMULARZ: {
        path: '/form'
    }
}

export const router = createBrowserRouter([{
    path: routes.HOME.path,
    element: <Layout />,
    children: [{
        path: routes.HOME.path,
        element: <UserHome />
    }, {
        path: routes.FORMULARZ.path,
        element: <Form />
    }]
}]);