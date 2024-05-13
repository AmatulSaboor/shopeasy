import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Product from './components/product/Product';
import AddProduct from './components/product/AddProduct';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path='addProduct' element={<AddProduct />} />
          <Route path='products' element={<Product />} />
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
