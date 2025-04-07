import { redirect } from "react-router"


export const checkIsLogin = () => {
    if(!localStorage.getItem("isLoggedIn")){
        return redirect("/login")
    } else {
        return null
    }
}

