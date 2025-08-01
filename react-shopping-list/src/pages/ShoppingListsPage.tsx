import { Link } from "react-router";
import { useGetShoppingListsQuery } from "../features/shopping-lists/shopping-lists-api-slice";

export interface ShoppingList {
    id: number;
    name: string;
}

export function ShoppingListsPage() {
    const shoppingListsResult = useGetShoppingListsQuery(undefined);

    const handleReload = () => {
       shoppingListsResult.refetch();
    }

    return <div className="space-y-2">
        <div className="flex justify-end">
            <Link to={`./create`} className="btn btn-small btn-primary">Create</Link>
        </div>

        {
            shoppingListsResult.isError && <div className="alert alert-error">
                Failed to load data, try again later!
            
                <div className="btn btn-outline" onClick={handleReload}>
                    Reload
                </div>
            </div>
        }

        {
            shoppingListsResult.isLoading && (<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
                <div className="skeleton card p-8" />
            </div>)
        }

        {
            (shoppingListsResult.isSuccess) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {
                        shoppingListsResult.data.length === 0 && <p>No shopping lists yet...</p>
                    }
        
                    {
                        shoppingListsResult.data.map((list) => <div key={list.id} className="card bg-white shadow-sm cursor-pointer">
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