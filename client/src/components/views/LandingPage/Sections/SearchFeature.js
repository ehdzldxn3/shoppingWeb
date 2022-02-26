import React, { useState } from 'react'
import { Input } from 'antd';


const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState('')

    const searhHandler = (e) => {
        setSearchTerm(e.target.value)
        
        props.refresh(e.target.value)
        
    }

    

  return (
    <Search 
        placeholder="input search text" 
        onChange={searhHandler}
        style={{ width: 200 }}
        value={SearchTerm}
    />
  )
}

export default SearchFeature