import Product_List from './components/productList/product_list'
import Product_Item from './components/productItem/product_item'
import  estilo from './App.css'
import styles from './Estilo.module.css'
import Logo from '../src/Logo.png'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState(null)
  return (
    
    <div className={styles.app}>
    <header className ={estilo}>
      <div>
      <div align="left"> <img src= {Logo}/></div>
       </div>
    </header>
      <Routes>
        <Route
          path="/"
          element={
            <Product_List
              products={products}
              setProducts={setProducts}
              query={query}
              setQuery={setQuery}
            />
          }
        />
        <Route path="/product/:id" element={<Product_Item />} />
      </Routes>
    </div>
  )
}

export default App