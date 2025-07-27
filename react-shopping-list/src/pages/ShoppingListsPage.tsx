import { Link } from "react-router";
import { useShoppingListsService } from "../services/ShoppingListsService";
import { useEffect, useState } from "react";

export interface ShoppingList {
    id: number;
    name: string;
}

export function ShoppingListsPage() {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [reload, setReload] = useState(false);
    const { getShoppingLists } = useShoppingListsService();
    
    useEffect(() => {
        setIsLoading(true);
        setErrorMessage('');

        getShoppingLists()
            .then(results => setShoppingLists(results))
            .catch(() => {
                setErrorMessage('Failed to load data. Try again later.');
            })
            .finally(() => setIsLoading(false));
    }, [reload]);

    const handleReload = () => {
        setReload(!reload)
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