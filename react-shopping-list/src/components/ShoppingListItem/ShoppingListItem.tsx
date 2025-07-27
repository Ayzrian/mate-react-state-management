import { cva } from "class-variance-authority";
import { ShoppingItem } from "../../types";

interface ShoppingListItemProps {
    item: ShoppingItem;
    onItemDelete: (itemId: number) => void;
    onItemEdit: (itemId: number) => void;
 } 

 export function ShoppingListItem({
    item: { id, name, quantity = 1, mustHave },
    onItemDelete,
    onItemEdit
 }: ShoppingListItemProps) { 
    const itemClass = cva("flex justify-between items-center bg-base-100 p-3 rounded shadow-md", {
        variants: {
            mustHave: {
                true: "border border-dashed border-red-300"
            }
        }
    })

    const handleDeleteClick = () => {
        onItemDelete(id)
    }

    const handleEditClick = () => {
        onItemEdit(id)
    } 

    return (
        <li className={itemClass({ mustHave })}>
             <div className="space-x-2">
                <span className="badge badge-soft badge-primary">{quantity}</span>
                <span>{name}</span>
             </div>
             <div className="space-x-2">
                <button className="btn btn-xs btn-info text-base" onClick={handleEditClick}>Edit</button>
                <button className="btn btn-xs btn-circle btn-error text-base" onClick={handleDeleteClick}>X</button>
             </div>
        </li>
    ); 
}