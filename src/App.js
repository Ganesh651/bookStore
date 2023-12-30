import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import BookDetails from './components/BookDetails';
import Home from './components/Home';
import Bookshelves from './components/BookShelves';
import Notfound from './components/Notfound';
import Wrapper from './components/Wrapper';
import './App.css'


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <Wrapper>
          <Home />
        </Wrapper>
      } />
      <Route path="/shelf" element={
        <Wrapper>
          <Bookshelves />
        </Wrapper>
      } />
      <Route path='/book/:id' element={
        <Wrapper>
          <BookDetails />
        </Wrapper>
      } />
      <Route path='*' element={<Notfound />} />
    </Routes>
  </BrowserRouter>
)

export default App