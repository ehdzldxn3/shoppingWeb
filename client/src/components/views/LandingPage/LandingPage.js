import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import {Icon, Col, Card, Row, Carousel } from 'antd'
import ImgSlider from '../../utils/ImgSlider';
import Meta from 'antd/lib/card/Meta';



function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)

    useEffect(() => {

        let body = {
            skip : Skip,
            limit : Limit,
        }

        getProducts(body)


    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(res => {
            if(res.data.success) {
                
                // if(body.loadMore) {
                //     setProducts([...Products, ...res.data.productInfo] )
                // } else {
                //     setProducts(res.data.productInfo)
                // }
                
            } else {
                alert('상품을 가져오는 실패 했습니다.')
            }
        })
    }

    //더보기 버튼
    const loadMoreHandler = (e) => {
        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)

        setSkip(skip)
    }

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
            



            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '3rem'}}>
                <button onClick={loadMoreHandler}>+</button>
            </div>
        </div>
    )
}

export default LandingPage
