import { useNavigate } from "react-router";
import { ShoppingListForm, ShoppingListFormValues } from "../components/ShoppingListForm/ShoppingListForm";
import { useShoppingListsService } from "../services/ShoppingListsService";

export function CreateShoppingListPage() {
    const { createShoppingList } = useShoppingListsService();
    const navigate = useNavigate();
    
    const handleSubmit = async (values: ShoppingListFormValues) => {
        await createShoppingList(values);

        navigate('../');
    }

    return (<div>
        <ShoppingListForm onSubmit={handleSubmit} defaultValues={{ name: '' }}/>
    </div>)
}