import { useContext } from "react"
import SetIsAuthContext from "./SetIsAuth"


const useSetIsAuth = () => useContext(SetIsAuthContext)

export default useSetIsAuth