import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col, Card, InputGroup, Form, Button } from 'react-bootstrap';
import "./Pagination.css";
import Pagination from "react-js-pagination";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { BsChatLeftDots } from "react-icons/bs";

const HomePage = () => {
    const location=useLocation();
    const search=new URLSearchParams(location.search);
    const navi = useNavigate();

    const size=6;
    const page=search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState("");

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);




    const getList = async() => {
        setLoading(true)
        const res=await axios(`/shop/list.json?page=${page}&size=${size}&query=${query}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
    }, [location]);

    const onSubmit = (e) =>{
        e.preventDefault();
        navi(`/?page=1&size=${size}&query=${query}`);
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <Row className='mb-2'>
                <Col md={4} className='mb-2'>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control  className=' custom-TDS2 mb-3' placeholder='상품명,제조사' value={query}
                                onChange={(e)=>setQuery(e.target.value)}/>
                            <button className="custom-input-group mb-2" type="submit">SEARCH</button>
                        </InputGroup>
                    </form>
                </Col>
                <Col>
                    <span className=' custom-TDS2 mb-3' >상품수: {total}개</span>
                </Col>
            </Row>
            <Row>
                {list.map(shop=>
                    <Col key={shop.pid} xs={6} md={4} lg={2}>
                        <Card  className=' custom-TDS2 mb-3' style={{cursor:'pointer'}}>
                                <Link to={`/shop/info/${shop.pid}`}>
                                    <Card.Body>
                                        <img src={`/display?file=${shop.image}`} width="100%"/>
                                        <div className='ellipsis'>[{shop.pid}]{shop.title}</div>
                                        <div className='price'>{shop.fmtprice}원</div>
                                    </Card.Body>
                                </Link>
                                <Card.Footer className='text-end'>
                                    <span className='heart'>
                                        <FaHeart/>
                                        <small className='ms-1'
                                            style={{fontSize:'0.7rem'}}>{shop.fcnt}</small>
                                    </span>
                                    <span className='ms-2'>
                                        <BsChatLeftDots/>
                                        <small className='ms-1'
                                            style={{fontSize:'0.7rem'}}>{shop.reviewcnt}</small>
                                    </span>
                                </Card.Footer>

                        </Card>
                    </Col>
                )}
            </Row>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page)=>{navi(`/?page=${page}&size=${size}&query=${query}`)}}/>
            }



             
        </div>
    )
}

export default HomePage