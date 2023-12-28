import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import BookDetails from './components/BookDetails';
import Home from './components/Home';
import Bookshelves from './components/BookShelves';
import Notfound from './components/Notfound';
import './App.css'


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/shelf" element={<Bookshelves />} />
      <Route path='/book/:id' element={<BookDetails />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  </BrowserRouter>
)

export default App