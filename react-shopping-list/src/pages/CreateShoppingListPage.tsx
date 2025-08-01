import { useNavigate } from "react-router";
import { ShoppingListForm, ShoppingListFormValues } from "../components/ShoppingListForm/ShoppingListForm";
import { useCreateShoppingListMutation } from "../features/shopping-lists/shopping-lists-api-slice";

export function CreateShoppingListPage() {
    const [createShoppingList] = useCreateShoppingListMutation();
    
    const navigate = useNavigate();
    
    const handleSubmit = async (values: ShoppingListFormValues) => {
        await createShoppingList(values);

        navigate('../');
    }

    return (<div>
        <ShoppingListForm onSubmit={handleSubmit} defaultValues={{ name: '' }}/>
    </div>)
}