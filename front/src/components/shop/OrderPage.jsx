import React ,{useEffect, useState}from 'react'
import axios from 'axios'
import {Table, Alert,InputGroup,Row,Col,Form } from 'react-bootstrap'
import ModalPost from '../user/ModalPost';
const OrderPage = ({list, checkSum}) =>{
  const [form, setForm] = useState('');
  const { uid, uname, phone, address1, address2 } = form; //비구조할당 중괄호
  const getUser=async()=>{
    const res=await axios(`/user/read?uid=${sessionStorage.getItem(`uid`)}`)
    setForm(res.data);
  }

  useEffect(()=>{
    getUser();
},[]);

const onPostcode =(address)=>{
  setForm({
      ...form,
      address1: address
  })
}
const onChangeForm=(e)=>{
  setForm({
      ...form,
      [e.target.name]:e.target.value
  })
}

const onOrder = async() => {
  if(window.confirm("위 상품들을 주문하실래요?")){
      const orders = list.filter(s=>s.checked);
      const res=await axios.post("/purchase/insert",{...form, sum:checkSum, orders });
      //장바구니비우기
      for(const order of orders){
          await axios.post(`/cart/delete/${order.cid}`);
      }
      window.location.href=`/order/complete/${res.data}`;
  }
}













  return (
    <div  className='text-center mb-5 text-glow font-bold text-xl' >
      
      <h1>OrderPage</h1>
   

      <Table bordered striped hover>
        <thead >
            <tr>
            <td className='custom-TDS mb-2 text-end'>PIC</td>
              <td className='custom-TDS mb-2 text-end'>PRODUCT</td>

              <td className='custom-TDS mb-2 text-end'>PRICE</td>
              <td className='custom-TDS mb-2 text-end'>EA</td>
              <td className='custom-TDS mb-2 text-end'>SUM</td>
            </tr>

        </thead>
        <tbody>
          {list.map(s=>s.checked && 
            <tr>
              <td className="custom-TDS2 mb-2" ><img src={`/display?file=${s.image}`} width = "30"/></td>
              <td className='custom-TDS2 mb-2 text-end'>{s.title}</td>
              <td className='custom-TDS2 mb-2 text-end'>{s.fmtprice}</td>
              <td className='custom-TDS2 mb-2 text-end'>{s.qnt}</td>
              <td className='custom-TDS2 mb-2 text-end'>{s.fmtsum}</td>
            </tr>
            )}
        </tbody>
      </Table>
      <Alert className='custom-TDS2 mb-2 text-end'>
        <span >주문총액 {checkSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
      </Alert >
      <div class="delimiter2 my-4"></div>
     
      <div className='my-5'>
        
        
     
        <Row>
            <Col md={8}>
                <form>
                <h1 className='custom-TDS3 my-5 text-center'> CUSTOMER INFO</h1>
                    <InputGroup >
                        <InputGroup.Text className="custom-input-group mb-2"  >ID</InputGroup.Text>
                        <Form.Control className="custom-input-group mb-2" value={uid} readOnly/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className="custom-input-group mb-2">NAME</InputGroup.Text>
                        <Form.Control className="custom-input-group mb-2" value={uname} onChange = {onChangeForm} name="uname"/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className="custom-input-group mb-2">P-NUM</InputGroup.Text>
                        <Form.Control className="custom-input-group mb-2" value={phone} onChange = {onChangeForm} name="phone"/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className="custom-input-group mb-2">ADDR</InputGroup.Text>
                        <Form.Control className="custom-input-group mb-2" value={address1} onChange = {onChangeForm} name="address1"/>
                
                        <ModalPost onPostcode={onPostcode} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                    <InputGroup.Text className="custom-input-group mb-2">A-ADDR</InputGroup.Text>
                    <Form.Control name="address2" onChange={onChangeForm} value={address2} placeholder='상세주소' />
                    </InputGroup>
                   
                </form>
                <div>
                  <button onClick={onOrder}  className='custom-TDS3 text-center px-5' >주문하기</button>
                </div>
            </Col>
         

        </Row>
                 

        </div>
    </div>
  )
}

export default OrderPage