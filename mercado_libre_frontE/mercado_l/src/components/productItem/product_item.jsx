import React, { useEffect, useState } from 'react'
import globals from '../../index.module.css'
import config from '../../config/config'
import styles from './product_item.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchData } from '../../utils/utils'

const ProductItem = () => {
  let { id } = useParams()

  const [productInfo, setProductInfo] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await fetchData(`${config.API_URL}/api/items/${id}`)
      setProductInfo(response)
    }
    getData()
  }, [id])
  const navigate = useNavigate()
  function handleGoBack() {
    navigate('/')
  }
  return (
    <div className={`${globals.container} ${styles.productInfo}`}>
      <div>
        <div>
          <img src={productInfo?.picture} alt="producto" />
          <div className={styles.titleSection}>
            <p>{`Condición: ${productInfo?.condition} - ${productInfo?.sold_quantity} vendidos`}</p>
            <p>{`${productInfo?.item.price.currency} ${productInfo?.item.price.amount}.00`}</p>
            <h2>{productInfo?.item.title}</h2>
          </div>
        </div>
        <div className={styles.description}>
          <h1>Descripción del producto</h1>
          <p>{productInfo?.description}</p>
        </div>
      </div>
      <button onClick={handleGoBack}>Volver</button>
    </div>
  )
}

export default ProductItem