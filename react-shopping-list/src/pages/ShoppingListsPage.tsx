import { Link } from "react-router";
import { useShoppingListsService } from "../services/ShoppingListsService";
import { useEffect, useReducer } from "react";

export interface ShoppingList {
    id: number;
    name: string;
}

const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const RELOAD = 'RELOAD';
const SET_SHOPPING_LISTS = 'SET_SHOPPING_LISTS';

interface ShoppingListsPageState {
    shoppingLists: ShoppingList[];
    isLoading: boolean;
    errorMessage: string;
    reload: boolean;
}

type Action = {
    type: typeof SET_LOADING,
    payload: { isLoading: boolean }
} | {
    type: typeof SET_ERROR,
    payload: { errorMessage: string }
} | {
    type: typeof RELOAD,
    payload: {}
} | {
    type: typeof SET_SHOPPING_LISTS,
    payload: { shoppingLists: ShoppingList[] }
};

const setLoading = (isLoading: boolean): Action => ({type: SET_LOADING, payload: {isLoading}});

function shoppingListsPageReducer(state: ShoppingListsPageState, {type, payload}: Action): ShoppingListsPageState {
    switch (type) {
        case SET_LOADING: 
            return { ...state, isLoading: payload.isLoading };
        case SET_ERROR: 
            return { ...state, errorMessage: payload.errorMessage };
        case SET_SHOPPING_LISTS: 
            return { ...state, shoppingLists: payload.shoppingLists };
        case RELOAD: 
            return { ...state, reload: !state.reload };
        default:
            return state;
    }
}


export function ShoppingListsPage() {
    const [{ shoppingLists, isLoading, errorMessage, reload }, dispatch] = useReducer(shoppingListsPageReducer, {
        shoppingLists: [],
        isLoading: false,
        errorMessage: '',
        reload: false,
    });

    const { getShoppingLists } = useShoppingListsService();

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch({ type: SET_ERROR, payload: { errorMessage: '' }});

        getShoppingLists()
            .then(results => dispatch({ type: SET_SHOPPING_LISTS, payload: {shoppingLists: results }}))
            .catch(() => {
                dispatch({ type: SET_ERROR, payload: { errorMessage: 'Failed to load data. Try again later.' }});
            })
            .finally(() => dispatch(setLoading(false)));
    }, [reload]);

    const handleReload = () => {
        dispatch({ type: RELOAD, payload: {}})
    }

    return <div className="space-y-2">
        <div className="flex justify-end">
            <Link to={`./create`} className="btn btn-small btn-primary">Create</Link>
        </div>

        {
            errorMessage && <div className="alert alert-error">
                {errorMessage}
            
                <div className="btn btn-outline" onClick={handleReload}>
                    Reload
                </div>
            </div>
        }

        {
            isLoading && (<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
            </div>)
        }

        {
            (!isLoading && !errorMessage) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {
                        shoppingLists.length === 0 && <p>No shopping lists yet...</p>
                    }
        
                    {
                        shoppingLists.map((list) => <div key={list.id} className="card bg-white shadow-sm cursor-pointer">
                            <div className="card-body text-center font-bold">
                                <Link to={`/shopping-lists/${list.id}`}>
                                    {list.name}
                                </Link>
                            </div>
                        </div>)
                    }
                </div>
            )
        }
    </div>
}