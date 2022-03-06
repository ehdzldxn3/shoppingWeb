import React from 'react'
import './UserCardBlock.css'
import { Button, } from 'antd'

function UserCardBlock(props) {

    const renderCartImg = (imgs) => {
        if (imgs.length > 0) {
            let img = imgs[0]
            return `http://localhost:5000/${img}`
        }
    }

    



    

    const renderItems = () => (
        props.products && props.products.map((product, index) => (

            <tr key={index}>
                <td>
                    <img style={{width: '70px'}} alt='prouct'
                    src={renderCartImg(product.img)} />
                </td>
                <td>
                    {product.qty} EA
                </td>
                <td>
                    $ {product.price}
                </td>
                <td>
                    <Button onClick={()=>props.removeFromCart(product._id)}>
                        Remove
                    </Button>
                </td>
            </tr>
        ))
    )

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Product from Cart</th>
                </tr>
            </thead>
            <tbody>
                {renderItems()}
            </tbody>
        </table>
    </div>
  )
}

export default UserCardBlock