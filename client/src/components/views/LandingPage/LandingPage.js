import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import {Icon, Col, Card, Row, Carousel } from 'antd'
import ImgSlider from '../../utils/ImgSlider';
import Meta from 'antd/lib/card/Meta';


function LandingPage() {

    const [Products, setProducts] = useState([])

    useEffect(() => {

        let body = {

        }

        axios.post('/api/product/products')
            .then(res => {
                if(res.data.success) {
                    setProducts(res.data.productInfo)
                } else {
                    alert('상품을 가져오는 실패 했습니다.')
                }
            })

    }, [])

    const renderCards = Products.map((product, index) => {
        return (
            <Col key={index} lg={6} md={8} xs={24} >
                <Card
                    cover={<ImgSlider img={product.img} />}
                >
                    <Meta
                        title={product.title}
                        description={`$${product.price}`}
                    />
                </Card>
            </Col>
        )
    })

    return (
        <div style={{width: '75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Let`s Travel Anywhere < Icon type='rocket'/></h2>
            </div>

            {/* Filter */}

            {/* Search */}

            {/* Card */}
            <Row gutter={16, 16}>
                {renderCards}
            </Row>
            



            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage
