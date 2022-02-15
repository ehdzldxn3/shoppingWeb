import React from 'react'
import Dropzone from 'react-dropzone'
import {Icon, } from 'antd'
import axios from 'axios'

function FileUpload() {

  const dropHandler = (files) => {
    
    let formData = new FormData()
    const config = {
      header: { 'content-type' : 'multipart/fomr-data'}
    }
    formData.append('file', files[0])

    axios.post('/api/product/image', formData, config)
      .then(res => {
        if(res.data.success){

        } else {
          
        }
      })
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
    </div>
  )
}

export default FileUpload