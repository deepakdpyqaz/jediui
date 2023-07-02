import React from "react";

export const cities = {
    bangalore: "Bangalore",
    delhi: "Delhi",
    mumbai: "Mumbai"
}


const globalContext = {
    city: cities.bangalore,
    user: null,
    changeCity: () => { },
    changeUser:()=>{}
}

export const AppContext = React.createContext(globalContext)