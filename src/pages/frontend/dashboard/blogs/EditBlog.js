import React, { useEffect, useRef, useState } from 'react'
import './_blogs.scss';
import { Input, Select, Space, Form, Button, DatePicker, message, Upload, TimePicker, InputNumber, Progress } from 'antd'
import { InboxOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getEditEvent, updateEvent } from 'services/event';
import LoadingIndicator from 'components/LoadingIndicator';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getEditBlog, updateBlog } from 'services/blogs';

const { Dragger } = Upload;


const max_image_width = 590;
const max_image_height = 300;



export default function EditBlog() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("")
    const [blog, setBlog] = useState({})
    const [image, setImage] = useState("")
    const [eventPrice, setBlogPrice] = useState(null)
    const [imgLoading, setImgLoading] = useState(false)
    const [taxRate, setTaxRate] = useState(0.20)
    const eventFormRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll(0, 0)
        getBlog()
    }, [])

    const getBlog = async () => {
        try {
            let { data } = await getEditBlog(id);
            setBlog(data?.data);
            setDescription(data?.data?.description);
            setImage(data?.data?.image);
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }


    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



    const onFinish = async (values) => {

        let body = {
            ...values, description
        };
        setLoading(true)
        try {
            let { data } = await updateBlog(id, body);
            setImage("")
            window.toastify(data.msg, "success");
            navigate("/dashboard/blogs/myBlogs")
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
            getBlog()
        }


    };

    const handleChange = (html) => {
        setDescription(html);
    };

    const formatInitialValues = (blogData) => {
        if (blogData) {
            return {
                title: blogData?.title,
                category: blogData?.category,
                country: blogData?.country,
            };
        }
        return blogData;
    };

    const initialFormValues = formatInitialValues(blog);

    return (
        <>
            <LoadingIndicator loading={loading} />
            <div className='container px-2 px-sm-4 py-5' id='add-events'>
                <div className="card border-0 shadow-lg py-5 px-4">
                    <h2 className='heading-stylling mb-5'>Edit Event</h2>
                    {isLoading
                        ?
                        <div className='my-5 text-center'>
                            <div className="spinner-grow bg-info"></div>
                            <div className="spinner-grow bg-warning mx-3"></div>
                            <div className="spinner-grow bg-info"></div>
                        </div>
                        :
                        <Form
                            name="dynamic_form_nest_item"
                            onFinish={onFinish}
                            initialValues={initialFormValues}
                            autoComplete="off"
                            layout="vertical"
                            ref={eventFormRef}
                        >
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <Form.Item label="Title" name="title" rules={[{ required: true }, {
                                        max: 100,
                                        message: 'Title cannot exceed 90 characters',
                                    }]}>
                                        <Input placeholder="Enter Event Title" name='title' id='title' size='large' />
                                    </Form.Item>
                                </div>
                                <div className="col-12 col-md-6">
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

                                <div className="col-12">
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
                    }
                </div >
            </div >
        </>
    )
}
