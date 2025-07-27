import { useCallback, useState } from "react"
import { ShoppingList } from "../components/ShoppingList/ShoppingList"
import { ShoppingListItemForm, ShoppingListItemFormValues } from "../components/ShoppingListItemForm/ShoppingListItemForm"
import { ShoppingListPanel } from "../components/ShoppingListPanel/ShoppingListPanel"
import { useShoppingList } from "../hooks/useShoppingList"
import { ShoppingItem } from "../types"
import { useParams, Link } from "react-router"
import { createPortal } from "react-dom"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"


export function ShoppingListPage() {
  const { id } = useParams();

  const {
    list,
    deleteItem,
    updateItem,
    mustHaveFilter,
    setMustHaveFilter,
    setSortBy
  } = useShoppingList(Number(id));

  const [errorMessage, setErrorMessage] = useState('');

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const editingItem = list.find(item => item.id === editingId) as ShoppingItem;

  const handleSubmit = async (item: ShoppingListItemFormValues) => {
    if (editing) {
      await updateItem(editingId, item);
      setEditing(false);
    }
  } 

  const handleItemDelete = useCallback(async (itemId: number) => {
    try {
      setErrorMessage('');
      await deleteItem(itemId);
    } catch (e) {
      setErrorMessage('Failed to delete item. Try again later!')
    }
  }, [setErrorMessage, deleteItem])

  const handleItemEdit = useCallback((itemId: number) => {
    setEditingId(itemId);
    setEditing(true);
  }, [setEditing, setEditingId])

  return (
    <>
        <div className="flex">
            <div className="breadcrumbs text-sm flex-1">
                <ul>
                    <li><Link to="../">Shopping Lists</Link></li>
                    <li><Link to={`../${id}`}>Shopping List #{id}</Link></li>
                </ul>
            </div>

            <Link to={`../${id}/create`} className="btn btn-small btn-primary">Add</Link>
        </div>

        <Dialog open={editing} onClose={() => setEditing(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
          
            <div className="fixed w-screen inset-0 h-screen flex flex-col items-center justify-center">
              <DialogPanel>
                <ShoppingListItemForm key={editingId} onSubmit={handleSubmit} defaultValues={editingItem}/>
              </DialogPanel>
            </div>
        </Dialog>

        <br/>
        <ShoppingListPanel
            mustHaveFilter={mustHaveFilter}
            onMustHaveFilterChange={setMustHaveFilter}
            onSortByChange={setSortBy}
        />

        <div className="divider"/>

        {
          errorMessage && <div className="alert alert-error">{errorMessage}</div>
        }

        <ShoppingList list={list} onItemDelete={handleItemDelete} onItemEdit={handleItemEdit}/>
    </>
  )
}
