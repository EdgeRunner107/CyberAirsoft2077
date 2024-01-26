import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap'
import "../Pagination.css";
import Pagination from "react-js-pagination";
import ModalOrder from './ModalOrder';

const OrderList = () => {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const size=3;
    const getList = async() => {
        const res=await axios(
            `/purchase/list.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
        //console.log(res.data);    
        setList(res.data.list);
        setTotal(res.data.total);
    }
    useEffect(()=>{
        getList();
    }, [page]);

    return (
        <div className='my-5'>
            <h1 className='custom-TDS text-center mb-5'>Order List</h1>
            <div>
                주문수: {total}건
            </div>
            <Table striped hover bordered>
                <thead>
                    <tr className='text-center'>
                        <td className='custom-TDS mb-2 text-end'>주문번호</td>
                        <td className='custom-TDS mb-2 text-end'>이름</td>
                        <td className='custom-TDS mb-2 text-end'>주문일</td>
                        <td className='custom-TDS mb-2 text-end'>전화</td>
                        <td className='custom-TDS mb-2 text-end'>금액</td>
                        <td className='custom-TDS mb-2 text-end'>상태</td>
                        <td className='custom-TDS mb-2 text-end'>상세보기</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                    <tr key={p.oid} className='text-center'>
                        <td className="custom-TDS2 mb-2">{p.oid}</td>
                        <td className="custom-TDS2 mb-2">{p.uname}({p.uid})</td>
                        <td className="custom-TDS2 mb-2">{p.fmtdate}</td>
                        <td className="custom-TDS2 mb-2">{p.phone}</td>
                        <td className='custom-TDS2 text-end'>{p.fmtsum}원</td>
                        <td className="custom-TDS2 mb-2">{p.str_status}</td>
                        <td className="custom-TDS2 mb-2"><ModalOrder  p={p}/></td>
                    </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page)=>setPage(page)}/>
            }
        </div>
    )
}

export default OrderList