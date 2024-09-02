import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/HomePage';
import About from './pages/About';
import Account from './pages/Account';
import Header from '../src/components/Header/Header';
import Footer from './components/Footer/Footer';
import SignIn from './components/Auth/SignIn';
import Login from './components/Auth/Login';
import { AuthProvider } from './components/Auth/AuthContet';
import ProductPage from './components/Product/productpop';
import BookList from './pages/BookList';
import Checkout from './pages/Checkout';
import Success from './pages/success';
import Failed from './pages/failed';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // localStorage.clear();



  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
          <Route path="/product/:productcode" element={<ProductPage />} />
          <Route path="/products/:tagCode" element={<BookList />} />
          <Route path="/account/register" element={<SignIn/>} />
          <Route path="/account/login" element={<Login/>} />
          <Route path="/my-account/:activepage" element={<Account />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
