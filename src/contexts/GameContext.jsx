import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as gameServise from '../services/gameService';

export const GameContext = createContext();

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_GAMES':
             return [...action.payload];
        case 'ADD_GAME':
            return [...state, action.payload];
        case 'EDIT_GAME':
            return state.map(x => x._id === action.gameId ? action.playload : x);
    
        default:
             return state;
    }
 }


export const GameProvider = ({
    children,
}) => {
    
    const navigate = useNavigate();
    const [games, dispatcher] = useReducer(gameReducer, []);

    useEffect(() => {
        gameServise.getAll()
            .then(result => {
                const action = {
                    type: 'ADD_GAMES',
                    payload: result
                }
                dispatcher(action);
            });
    }, []);

    const addComment = (gameId, comment) => {
        //  setGames(state =>{
        //   const game = state.find(x=> x._id === gameId);

        //   const comments = game.comment || [];
        //   comments.push(comment)

        //   //always return new reference
        //   return [
        //     ...state.filter(x=> x._id !== gameId),
        //     {...game, comments}
        //   ];
        // })
    };

    const gameAdd = (gameData) => {
        dispatcher({
            type: 'ADD_GAME',
            payload: gameData,
        })
        navigate('/catalog');
    };

    const gameEdit = (gameId, gameData) => {
        // setGames(state => state.map(x=> x._id === gameId ? gameData: x))
        dispatcher({
            type: 'EDIT_GAME',
            payload: gameData,
            gameId,
        })
    }

    return ( 
    < GameContext.Provider value = {{ games, gameAdd, gameEdit, addComment } } > 
    { children } 
    </GameContext.Provider>
    );
}