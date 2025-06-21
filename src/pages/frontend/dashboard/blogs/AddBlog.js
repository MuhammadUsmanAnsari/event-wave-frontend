import React, { useEffect, useRef, useState } from 'react'
import './_blogs.scss';
import { Input, Select, Form, Upload, Progress } from 'antd'
import { InboxOutlined, } from '@ant-design/icons';
import moment from 'moment';
import { addEvent } from 'services/event';
import LoadingIndicator from 'components/LoadingIndicator';
import ReactQuill from 'react-quill';
import { addBlog } from 'services/blogs';

const { Dragger } = Upload;


const max_image_width = 590;
const max_image_height = 300;



export default function AddBlog() {
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [imgProgress, setImgProgress] = useState(0)
    const [imgLoading, setImgLoading] = useState(false)
    const blogFormRef = useRef();

    useEffect(() => {
        window.scroll(0, 0)
    }, [])




    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



    const onFinish = async (values) => {

        let body = {
            ...values, description,
        };
        console.log(body);
        setLoading(true)
        try {
            let { data } = await addBlog(body);

            window.toastify(data.msg, "success");
            blogFormRef.current.resetFields()
            setDescription("")
            setImage("")
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        } finally {
            setLoading(false)
        }


    };

    const handleChange = (html) => {
        setDescription(html);
    };

    return (
        <>
            <LoadingIndicator loading={loading} />

            <div className='container px-2 px-sm-4 py-5' id='add-events'>
                <div className="card border-0 shadow-lg py-5 px-4">
                    <h2 className='heading-stylling mb-5'>Add Blog</h2>
                    <Form
                        name="dynamic_form_nest_item"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                        ref={blogFormRef}
                    >
                        <div className="row g-3">
                            <div className="col-12 col-md-6 px-0 px-md-2">
                                <Form.Item label="Title" name="title" rules={[{ required: true, }, {
                                    max: 100,
                                    message: 'Title cannot exceed 90 characters',
                                }]}>
                                    <Input
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault(); // Prevent form submission on Enter key press
                                            }
                                        }}
                                        placeholder="Enter Blog Title" name='title' id='title' size='large' />
                                </Form.Item>
                            </div>
                            <div className="col-12 col-md-6 px-0 px-md-2">
                                <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                                    <Select
                                        showSearch
                                        size='large'
                                        id='category'
                                        style={{ width: "100%" }}
                                        placeholder="Select Category"
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                        options={window?.categories?.map((item, i) => {
                                            return {
                                                value: item,
                                                label: item,
                                            }
                                        })}
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-12 px-0 px-md-2">
                                <label className='mb-3' htmlFor="description">Event Description</label>
                                <ReactQuill
                                    id='description'
                                    theme="snow"
                                    placeholder='Enter content of your blog...'
                                    value={description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 text-danger">
                                Fields with (*) are required.
                            </div>


                            <div className="col-12">
                                <Form.Item>
                                    <button htmlType="submit" className='button-stylling-1 px-5 ms-auto' disabled={loading}>
                                        {
                                            loading
                                                ? <div className='spinner-border spinner-border-sm'></div>
                                                : "Submit"
                                        }
                                    </button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div >
            </div >
        </>
    )
}
