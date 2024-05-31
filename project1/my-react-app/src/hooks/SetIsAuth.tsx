import { createContext } from "react";


const SetIsAuthContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null> (null)

export default SetIsAuthContext;