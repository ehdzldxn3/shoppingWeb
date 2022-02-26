import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import {Icon, Col, Card, Row, } from 'antd'
import ImgSlider from '../../utils/ImgSlider';
import Meta from 'antd/lib/card/Meta';
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchFeature from './Sections/SearchFeature'
import {continents, price } from './Sections/Datas';




function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [Postsize, setPostsize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: [],
    })

    const [SearchTerm, setSearchTerm] = useState('')

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
                //더보기 버튼 설정
                setPostsize(res.data.postSize)

                if(body.loadMore) {
                    setProducts([...Products, ...res.data.productInfo] )
                } else {
                    setProducts(res.data.productInfo)
                }
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
            <Col key={index} lg={6} md={8} xs={24}
                style={{paddingTop : '1rem'}}
            >
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

    const showFilteredResult = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price
        let array = []

        for (let key in data) {
            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }
        return array
    }

    const handleFilters = (filters, category) =>{
        const newFilters = {...Filters}

        newFilters[category] = filters

        if(category === 'price') {
            let priceValuse = handlePrice(filters)
            newFilters[category] = priceValuse
        }

        showFilteredResult(newFilters)
        setFilters(newFilters)
    }

    const updateSearch = (newSearchTherm) => {
        
        let body ={
            skip : 0,
            limit : Limit,
            filters : Filters,
            searchTerm : newSearchTherm
        }

        setSkip(0)
        setSearchTerm(newSearchTherm)
        getProducts(body)


    }

    return (
        <div style={{width: '75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Let`s Travel Anywhere < Icon type='rocket'/></h2>
            </div>

            {/* Filter */}
            
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox
                        list={continents}
                        handleFilters={filters => handleFilters(filters, 'continents')}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, 'price')}
                    />
                </Col>
            </Row>
            

            {/* Search */}
            <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
                <SearchFeature
                    refresh={updateSearch}
                />
            </div>
            

            {/* Card */}
            <Row gutter={16, 16}>
                {renderCards}
            </Row>
            


            {Postsize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '3rem' }}>
                    <button onClick={loadMoreHandler}>+</button>
                </div>
            }
        </div>

    )
}

export default LandingPage
