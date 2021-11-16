import './App.css';
import AddressForm from './components/address-form/AddressForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddressForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
