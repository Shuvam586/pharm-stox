import { BrowserRouter as  Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dash from "./pages/Dash"

import ItemNew from "./pages/items/ItemNew"
import ItemsView from "./pages/items/ItemsView"

import VendorNew from "./pages/vendors/VendorNew"
import VendorsView from "./pages/vendors/VendorsView"

import CustomerNew from "./pages/customers/CustomerNew"
import CustomersView from "./pages/customers/CustomersView"

import PurchaseNew from "./pages/purchases/PurchaseNew"

function App() {
	return (

		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				
				<Route path="/dashboard" element={<Dash />} />

				<Route path="/items" element={<ItemsView />} />
				<Route path="/items/new" element={<ItemNew />} />

				<Route path="/vendors" element={<VendorsView />} />
				<Route path="/vendors/new" element={<VendorNew />} />

				<Route path="/customers" element={<CustomersView />} />
				<Route path="/customers/new" element={<CustomerNew />} />
				
				<Route path="/purchases/new" element={<PurchaseNew />} />
			</Routes>
		</Router>

	)
}

export default App
