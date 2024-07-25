
import { Routes, Route } from "react-router-dom";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingForm from "./pages/Listing";
import Homepage from "./pages/Home";

// Components
import MyNavbar from "./components/Navbar";
import BookDetail from "./pages/Details";
import ViewOrdersPage from "./pages/Orders";
import OrderDetailsPage from "./pages/ViewOrder";



function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/book/list" element={<ListingForm/>} />
        <Route path="/book/view/:bookId" element={<BookDetail/>} />
        <Route path="/books/orders" element={<ViewOrdersPage/>} />
        <Route path="/books/orders/:bookId" element={<OrderDetailsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
