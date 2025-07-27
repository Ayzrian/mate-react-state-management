import { useNavigate, useParams } from "react-router";
import { ShoppingListItemForm, ShoppingListItemFormValues } from "../components/ShoppingListItemForm/ShoppingListItemForm";
import { useShoppingListItemService } from "../services/ShoppingListItemService";
 
export function CreateShoppingListItemPage() {
    const { id } = useParams();
    const { createShoppingListItem } = useShoppingListItemService();
    const navigate = useNavigate();

    const handleSubmit = async (values: ShoppingListItemFormValues) => {
        await createShoppingListItem(Number(id), values);

        navigate(-1);
    }

    return <div>        
        <ShoppingListItemForm onSubmit={handleSubmit} defaultValues={{
            name: "",
            quantity: 1,
            mustHave: false,
        }}/>
    </div>
}