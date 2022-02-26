import React, { Fragment, useState } from 'react'
import { Collapse, Checkbox } from 'antd'

const { Panel } = Collapse

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        
        //누른것의 index를 구한다.
        const currentIndex = Checked.indexOf(value)

        const newChecked = [...Checked]

        if(currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckBoxList = () => props.list && props.list.map((value, index) => (
        <Fragment key={index}>
            <Checkbox onChange={()=>handleToggle(value._id)}
                checked={Checked.indexOf(value._id) === -1 ? false : true}/>
                      {value.name}
        </Fragment>
    ))

  return (
      <div>
          <Collapse defaultActiveKey={['1']}>
              <Panel header="This is panel header 1" key="1">
                  {renderCheckBoxList()}
              </Panel>
          </Collapse>
      </div>
  )
}

export default CheckBox