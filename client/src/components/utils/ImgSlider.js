import React from 'react'
import { Carousel, } from 'antd'

function ImgSlider(props) {
  return (
      <div>
          <Carousel autoplay>
              {props.img.map((img, index) => (
                  <div key={index}>
                    <img style={{width:'100%', maxHeight: '145px'}}
                        src={`http://localhost:5000/${img}`}/>
                  </div>
              ))}
          </Carousel>
      </div>
  )
}

export default ImgSlider