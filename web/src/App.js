import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './components/product/Product';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path='products' element={<Product />} />
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
