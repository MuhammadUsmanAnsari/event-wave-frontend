import React, { useState } from 'react'
import './_events.scss';
import { Input, Select, Space, Form, Button, DatePicker, message, Upload, TimePicker } from 'antd'
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Dragger } = Upload;


const max_image_width = 590;
const max_image_height = 300;


const props = {
    name: 'file',
    multiple: false,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    // onChange(info) {
    //     const { status } = info.file;
    //     console.log(info);
    //     if (status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //     }
    //     if (status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully.`);
    //     } else if (status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //     }
    // },
    // onDrop(e) {
    //     console.log('Dropped files', e.dataTransfer.files);
    // },
};

export default function AddEvent() {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [fields, setFields] = useState([]);

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // Function to handle adding fields
    const handleAddField = () => {
        // Add the values of input fields to the list of fields
        setFields([...fields, { input1, input2 }]);
        // Clear input field values
        setInput1('');
        setInput2('');
    };


    const onFinish = (values) => {
        const formattedDate = moment(values.date).format('YYYY-MM-DD');
        const formattedDated = values.time.map(item => moment(item.$d).format('HH:mm'));
        // console.log(formattedDated);
        console.log('Received values of form:', { ...values, date: formattedDate, time: formattedDated });

    };
    return (
        <>
            <div className='container px-2 px-sm-4 py-5' id='add-events'>
                <div className="card border-0 shadow-lg py-5 px-4">
                    <h2 className='heading-stylling mb-5'>Add Event</h2>
                    <Form
                        name="dynamic_form_nest_item"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <div className="row g-3">
                            <div className="col-12 mb-5">
                                <Form.Item name="image" rules={[{ required: true }]}>
                                    <Dragger {...props} >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                            The maximum image size allowed is 2MB and image dimensions shoule be {max_image_width} x {max_image_height} pixels.
                                        </p>
                                    </Dragger>
                                </Form.Item>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                                    <Input placeholder="Enter Event Title" name='title' id='title' size='large' />
                                </Form.Item>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                                    <Select
                                        showSearch
                                        size='large'
                                        id='category'
                                        // value={country}
                                        // onChange={e => setCountry(e)}
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
                            {/*  */}
                            <div className="col-12 col-md-4">
                                <Form.Item label="Country" name="country" rules={[{ required: true }]}>
                                    <Select
                                        showSearch
                                        size='large'
                                        id='country'
                                        // value={country}
                                        // onChange={e => setCountry(e)}
                                        style={{ width: "100%" }}
                                        placeholder="Select Country"
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                        options={window?.countries?.map((item, i) => {
                                            return {
                                                value: item,
                                                label: item,
                                            }
                                        })}
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-12 col-md-4">
                                <Form.Item label="City" name="city" rules={[{ required: true }]}>
                                    <Input placeholder="Enter City" id='city' size='large' />
                                </Form.Item>
                            </div>
                            <div className="col-12 col-md-4">
                                <Form.Item label="Location of Event" name="location" rules={[{ required: true }]}>
                                    <Input placeholder="Enter Full Address" id='location' size='large' />
                                </Form.Item>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Item label="Select Date" name="date" rules={[{ required: true }]}>
                                    <DatePicker className='w-100' placeholder='Select Date' size='large' format='YYYY-MM-DD' id='date' />
                                </Form.Item>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Item label="Time" name="time" rules={[{ required: true }]}>
                                    <TimePicker.RangePicker className='w-100' id="time" size='large' onChange={(e, s) => console.log(s)} />
                                </Form.Item>
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="time" className='mb-2'>Enter schedule</label><br />
                                <Form.List name="users">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: 'flex',
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing first name',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="First Name" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'last']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing last name',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="Last Name" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add field
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <button htmlType="submit" className='button-stylling-1 px-5 ms-auto'>Submit</button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
