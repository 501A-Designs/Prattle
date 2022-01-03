import { createContext, useContext, useState } from "react";
// import { supabase } from '../utils/supabaseClient';
const AppContext = createContext({});

const AppContextProvider = (props) => {
    const [currentRoom, setCurrentRoom] = useState();

    return (
        <AppContext.Provider
            value={{
                currentRoom,
                setCurrentRoom,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };