import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductImage from '../LandingPage/Sections/ProductImage'
import ProductInfo from '../LandingPage/Sections/ProductInfo'
import { Row, Col, } from 'antd'

function DetailProductPage(props) {

    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    

    useEffect(()=> {
        console.log()
        axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
            .then(res => {
                setProduct(res.data[0])
            })
            .catch(err => alert(err))
    },[productId])

  return (
      <div style={{ width: '100%', padding: '3rem 4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h1>{Product.title}</h1>
          </div>

          <br />


          <Row gutter={[16, 16]} >
              <Col lg={12} sm={24}>
                  {/* Product */}
                  <ProductImage detail={Product}/>
              </Col>

              <Col lg={12} sm={24}>

                  {/* Product Info */}
                  <ProductInfo detail={Product}/>
              </Col>
          </Row>



      </div>
  )
}

export default DetailProductPage