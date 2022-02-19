import React, { useState } from 'react'
import { Typography, Button, Form, Input} from 'antd'
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;
const Continents = [
  {key:1, value:'Africa'},
  {key:2, value:'Europe'},
  {key:3, value:'Asia'},
  {key:4, value:'North America'},
  {key:5, value:'South America'},
  {key:6, value:'Australia'},
  {key:7, value:'Antarctica'},
]

function UploadProductPage(props) {

  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [Price, setPrice] = useState(0)
  const [Continent, setContinent] = useState(1)
  const [Img, setImg] = useState([])


  const titleChange = (e) => {
    setTitle(e.currentTarget.value)
  }

  const descriptionChange = (e) => {
    setDescription(e.currentTarget.value)
  }

  const priceChange = (e) => {
    setPrice(e.currentTarget.value)
  }

  const continentChange = (e) => {
    setContinent(e.currentTarget.value)
  }

  const updateImg = (newImg) => {
    setImg(newImg)
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if( !Title || !Description || !Price || !Continent || !Img ) {
      return alert(' 모든 값을 넣어주세요...    ')
    }

    const body = {
        writer : props.user.userData._id,
        title : Title,
        description : Description,
        price : Price,
        img : Img,
        continent : Continent
    }

    //서버 데이터 전송
    Axios.post('/api/product', body)
      .then(res => {
        if(res.data.success) {
          alert('업로드 성공')
          props.history.push('/')
        } else {
          alert('업로드 실패')
        }
      })
    
  }


  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h2 level={2}>여행 상품 업로드</h2>
      </div>

      <Form >
        {/* 드랍존 */}
        <FileUpload refreshFunction={updateImg}/>
        <br/>
        <br/>
        <label>이름</label>
        <Input value={Title} onChange={titleChange}/>
        <br/>
        <br/>
        <label>설명</label>
        <TextArea value={Description} onChange={descriptionChange}></TextArea>
        <br/>
        <br/>
        <label>가격 ($)</label>
        <Input type='number' value={Price} onChange={priceChange}/>
        <br/>
        <br/>

        <select onChange={continentChange} value={Continent}>
          {Continents.map( item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}
        </select>

        <br/>
        <br/>
        <Button type='submit' onClick={submitHandler}>
          확인
        </Button>
      </Form>
    </div>
  )
}

export default UploadProductPage