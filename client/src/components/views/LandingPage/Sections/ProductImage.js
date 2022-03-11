import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {

    const [Img, setImg] = useState([])

    useEffect(()=> {

        if(props.detail.img && props.detail.img.length > 0) {
            let img = []
            props.detail.img.map(item => {
                img.push({
                    original : `http://localhost:5000/${item}`,
                    thumbnail : `http://localhost:5000/${item}`,
                })
            })
            setImg(img)
        }
    }, [props.detail])



  return (
    //   <div style={{display: 'flex', justifyContent: 'center', border: '2px solid lightgray' }}>
    <div style={{ justifyContent: 'center', border: '2px solid lightgray' }}>
          <ImageGallery items={Img} />
      </div>
  )
}

export default ProductImage