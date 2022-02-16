import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import {Icon, } from 'antd'
import axios from 'axios'

function FileUpload() {


  const [Image, setImage] = useState([])

  const dropHandler = (files) => {
    
    let formData = new FormData()
    const config = {
      header: { 'content-type' : 'multipart/fomr-data'}
    }
    formData.append('file', files[0])

    axios.post('/api/product/image', formData, config)
      .then(res => {
        if(res.data.success){
          
          setImage([...Image, res.data.filePath])
          console.log(res.data)
        } else {
          alert('파일을 저장을 저장하는데 실패했습니다.')
        }
      })
  }

  const deleteImg = (img) => {
    const currentIndex = Image.indexOf(img)
    let newImg = [...Image]
    newImg.splice(currentIndex, 1)
    setImage(newImg)
  }

  return (
    <div style={{display:'flex', justifyContent: 'space-betwen'}}>
          <Dropzone onDrop={dropHandler}>
              {({ getRootProps, getInputProps }) => (
                  <section>
                      <div 
                        style={{
                            width: 300, height: 240, border: '2px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type='plus' style={{fontSize: '5rem'}}/> 
                      </div>
                  </section>
              )}
          </Dropzone>

      <div style={{ marginLeft:'50px', display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        {Image.map((Image, index) => (
            <div onClick={()=> deleteImg(Image)} key={index}>
              <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                src={`http://localhost:5000/${Image}`}
              />
            </div>
          
        ))}
      </div>
    </div>
  )
}

export default FileUpload