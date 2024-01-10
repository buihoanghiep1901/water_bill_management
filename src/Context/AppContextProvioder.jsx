// @ts-nocheck
import React ,{useState} from "react";
import AppContext from "./Context";

const AppContextProvider =({children})=>{
    const [showUpdate, setShowUpdate]=useState(false)
    const [showCreate, setShowCreate]=useState(false)
    const [reload, setReload]=useState(false)
    return (
        <AppContext.Provider 
        value={{showUpdate, showCreate, setReload, reload, setShowUpdate, setShowCreate}}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider