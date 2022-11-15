import { useContext } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { GameContext } from "../../contexts/GameContext";

const GameOwner = ({children}) => {
    const {selectGame} = useContext(GameContext);
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuthContext();
     // I have to be sure that tha params is called gameId
    const{gameId} = useParams();

    const currentGame = selectGame(gameId);

    if (isAuthenticated && user._id !== currentGame._ownerId){
        return navigate('/catalog', {replace: true});
    }

    return children ? children : <Outlet />;
};

export default GameOwner;