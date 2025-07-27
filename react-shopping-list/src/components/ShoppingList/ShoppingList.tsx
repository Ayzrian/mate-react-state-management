import React from "react";
import { ShoppingItem } from "../../types";
import { ShoppingListItem } from "../ShoppingListItem/ShoppingListItem";

interface ShoppingListProps {
    list: ShoppingItem[];
    onItemDelete: (itemId: number) => void;
    onItemEdit: (itemId: number) => void;
 }

export const ShoppingList = React.memo(({ list, onItemDelete, onItemEdit }: ShoppingListProps) => {
    if (list.length === 0) {
        return <div>
            Shopping List is Empty :(
        </div>
    }

    return (
        <ul className="space-y-2">
           {
               list.map((item) => <ShoppingListItem
                                       key={item.id}
                                       item={item}
                                       onItemDelete={onItemDelete}
                                       onItemEdit={onItemEdit}/>
               )
           }
        </ul>
    )
});