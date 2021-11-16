import './App.css';
import AddressForm from './components/address-form/AddressForm';
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/AddressForm" element={<AddressForm />} />
          <Route path="/AddressForm" element={<AddressForm />} />
          <Route exact path="/update/:id" element={<AddressForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
