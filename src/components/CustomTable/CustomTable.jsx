import React from 'react'
import { Table } from 'antd';
import "./style.scss"

const CustomTable = ({dataSource, columns}) => {
  return (
    <Table columns={columns} dataSource={dataSource} />
  )
}

export default CustomTable