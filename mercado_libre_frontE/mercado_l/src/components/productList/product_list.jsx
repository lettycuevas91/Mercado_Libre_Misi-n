import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../../config/config'
import { fetchData } from '../../utils/utils'
import styles from './product_list.css'
import globals from '../../index.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';



const ProductList = ({ products, setProducts, query, setQuery }) => {
  const [Carga, setCarga] = useState(false)
  useEffect(() => {

    const getProducts = async () => {
      const data = await fetchData(`${config.API_URL}/api/items?q=${query}`)
      setProducts(data.items)
      setCarga(false)
    }
    getProducts()
  }, [query, setProducts])

  function search(e) {
    e.preventDefault()
    setCarga(true)
    setQuery(e.target.buscador.value)
  }
  return (
    <div className={globals.container}>
      <div className={styles['search-container']}></div>
      <form onSubmit={search}>
        <div className="buscador">  <b>Ingrese el producto a buscar</b>
  <input type="search" id="form1" class="form-control" name="buscador"  placeholder="Buscar producto" aria-label="Search" />
  
</div>
</form>
      {Carga && <p>Cargando catalogo...</p>}
      {products.map((item) => {
        return (
          <Link to={`/product/${item.id}`} className={styles.productInfo} key={item.id}>
            <img src={item.picture}></img>
            <div>
              <p>{item.price.currency + item.price.amount + '.00'}</p>
              <h2>{item.title}</h2>
            </div>
            <span>{item.city}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductList