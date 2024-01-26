import axios from 'axios';
import React, {useState} from 'react'
import {CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Row, Col, InputGroup, Button, Form, Tabs, Tab } from 'react-bootstrap'

const ContentPage =({pid, form, setForm}) => {
    

        const onChangeContent = (data)=>{
     
                    setForm({
                        ...form,
                        content:data
                    })
        }

        const onClickSave= async()=>{
            if(form.content===""){
                alert("내용을 입력하세요")
            }else{
                if(window.confirm("저장할래?")){
                    const data={pid,content:form.content};
                   // console.log(data)
                    await axios.post("/shop/update/content", data);
                    alert("수정완료");
                }
            }
         
        }





        return(
                    <>
                    <div>
                        <Button onClick={onClickSave}>저장</Button>
                    </div>
                    <Tabs
                                    defaultActiveKey="profile"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                    >
                                    <Tab eventKey="home" title="에디터">
                                    <CKEditor config={{ ckfinder: { uploadUrl:'/shop/ckupload'+pid } }}
                                        editor={ ClassicEditor }
                                        data={ form.content }
                                        onChange={ (event, editor)=>{ onChangeContent(editor.getData()); } }/>
                                    </Tab>
                                    <Tab eventKey="profile" title="HTML">
                                       <Form.Control as ="textarea" rows={20} value ={form.content}/>
                                    </Tab>
                         
                    </Tabs>
                         
                    
                    </>
        )
}
    export default ContentPage