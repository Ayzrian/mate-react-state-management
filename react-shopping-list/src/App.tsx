import { BrowserRouter, Route, Routes } from "react-router"
import { ShoppingListPage } from "./pages/ShoppingListPage"
import { ShoppingListsPage } from "./pages/ShoppingListsPage"
import { AppLayout } from "./pages/AppLayout"
import { HomePage } from "./pages/HomePage"
import { CreateShoppingListItemPage } from "./pages/CreateShoppingListItemPage"
import { LoginPage } from "./pages/LoginPage"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./pages/ProtectedRoute"
import { CreateShoppingListPage } from "./pages/CreateShoppingListPage"

function App() {
  return <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/shopping-lists" element={<AppLayout />}>
            <Route index element={<ShoppingListsPage />}/>
            <Route path="create" element={<CreateShoppingListPage />} />

            <Route path=":id">
              <Route index element={<ShoppingListPage />}/>
              <Route path="create" element={<CreateShoppingListItemPage />}/>
            </Route>
          </Route>
        </Route>

        <Route element={<AppLayout/>}>
          <Route path="/" element={<HomePage />}/>

          <Route path="*" element={<p>Page not found.</p>}/>
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
}

export default App