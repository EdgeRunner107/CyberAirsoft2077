import React from 'react'
import { useParams } from 'react-router-dom'

const OrderComplete = () => {
    const {oid} = useParams();
    return (
        <div className='my-5 text-center' style={{ color: 'white' }}>
        <h1>주문이 완료되었습니다.</h1>
        <h3 className='my-5'>주문번호: {oid}</h3>
    </div>
    )
}

export default OrderComplete