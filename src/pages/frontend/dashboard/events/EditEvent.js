import React, { useEffect, useRef, useState } from 'react'
import './_events.scss';
import { Input, Select, Space, Form, Button, DatePicker, message, Upload, TimePicker, InputNumber, Progress } from 'antd'
import { InboxOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getEditEvent, updateEvent } from 'services/event';
import LoadingIndicator from 'components/LoadingIndicator';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const { Dragger } = Upload;


const max_image_width = 590;
const max_image_height = 300;



export default function EditEvent() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("")
    const [event, setEvent] = useState({})
    const [image, setImage] = useState("")
    const [eventPrice, setEventPrice] = useState(null)
    const [imgLoading, setImgLoading] = useState(false)
    const [taxRate, setTaxRate] = useState(0.20)
    const [imgProgress, setImgProgress] = useState(0)
    const eventFormRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll(0, 0)
        getEvent()
    }, [])

    const getEvent = async () => {
        try {
            let { data } = await getEditEvent(id);
            setEvent(data?.data);
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
        const formattedDate = moment(values?.date?.$d).format('YYYY-MM-DD');
        const formattedDated = values?.time?.map(item => moment(item.$d).format('HH:mm'));
        const ticketPrice = Math.floor(Number(values?.ticketPrice) * (1 + taxRate));
        const formattedSchedule = values?.schedule?.map(item => (
            {
                time: moment(item?.time.$d).format('HH:mm'),
                details: item.details
            }
        ))
        let body = {
            ...values, date: formattedDate, time: formattedDated, description,
            ticketPrice, schedule: formattedSchedule,
        };
        setLoading(true)
        try {
            let { data } = await updateEvent(id, body);
            setImage("")
            window.toastify(data.msg, "success");
            navigate("/dashboard/events/myEvents")
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
            getEvent()
        }


    };

    const handleValueChange = (e, w) => {
        setEventPrice(e?.ticketPrice)
    }
    const handleChange = (html) => {
        setDescription(html);
    };

    const formatInitialValues = (eventData) => {
        const startTime = eventData?.time && eventData.time[0] ? dayjs(eventData.time[0], 'HH:mm') : null;
        const endTime = eventData?.time && eventData.time[1] ? dayjs(eventData.time[1], 'HH:mm') : null;
        if (eventData) {
            return {
                schedule: eventData?.schedule?.map((item) => ({
                    time: dayjs(item?.time, 'HH:mm'), // Convert time to moment object
                    details: item.details, // Set details as provided
                })),
                guests: eventData?.guests?.map((item) => ({
                    name: item?.name, // Convert time to moment object
                    details: item?.details, // Set details as provided
                    profession: item?.profession, // Set details as provided
                    img: item?.img, // Set details as provided
                })),
                // ...eventData,
                // arrival_time: stop.arrival_time ? moment(stop.arrival_time).format('HH:mm') : null,
                // departure_time: stop.departure_time ? moment(stop.departure_time).format('HH:mm') : null,
                title: eventData?.title,
                date: eventData?.date ? dayjs(eventData?.date) : null,
                category: eventData?.category,
                country: eventData?.country,
                city: eventData?.city,
                location: eventData?.location,
                organizerInfo: eventData?.organizerInfo,
                eventRules: eventData?.eventRules,
                ticketPrice: eventData?.ticketPrice,
                seats: eventData?.seats,
                tags: eventData?.tags,
                time: [startTime, endTime],
            };
        }
        return eventData;
    };

    const initialFormValues = formatInitialValues(event);

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
                            onValuesChange={handleValueChange}
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
                                        <DatePicker className='w-100' placeholder='Select Date' size='large'
                                            disabledDate={(current) => {
                                                return current && current <= moment().endOf("day");
                                            }}
                                            format='YYYY-MM-DD' id='date' />
                                    </Form.Item>
                                </div>
                                <div className="col-12 col-md-6">
                                    <Form.Item label="Time" name="time" rules={[{ required: true }]}>
                                        <TimePicker.RangePicker className='w-100' id="time" size='large' format={'HH:mm'} />
                                    </Form.Item>
                                </div>
                                <div className="col-12 col-md-6">
                                    <Form.Item label="Organizer information" name="organizerInfo" >
                                        <Input placeholder="Enter organizer information" id='location' size='large' />
                                    </Form.Item>
                                </div>
                                <div className="col-12 col-md-6">
                                    <Form.Item label="Event Rules and Policies" name="eventRules" >
                                        <Input placeholder="Enter Rules and Policies" id='rules' size='large' />
                                    </Form.Item>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="time" className='mb-2'>Enter schedule</label><br />
                                    <Form.List name="schedule">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <div
                                                        key={key}
                                                        style={{
                                                            display: 'flex',
                                                            marginBottom: 8,
                                                            paddingTop: 20,
                                                        }}
                                                        align="center"
                                                        className='row'
                                                    >
                                                        <div className="col-12 col-lg-4">
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'time']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Time is required',
                                                                    },
                                                                ]}
                                                            >
                                                                <TimePicker className='w-100' format={'HH:mm'} />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="col-12 col-lg-7">
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'details']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Details is required',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input placeholder="Enter Details" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="col-12 col-lg-1 pb-2 pb-lg-0">
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </div>
                                                    </div>
                                                ))}
                                                <Form.Item className='mt-2'>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add Time
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="time" className='mb-2'>Speakers / Guests</label><br />
                                    <Form.List name="guests">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <div
                                                        key={key}
                                                        style={{
                                                            display: 'flex',
                                                            marginBottom: 8,
                                                            paddingTop: 20,
                                                        }}
                                                        align="center"
                                                        className='row'
                                                    >
                                                        <div className="col-12 col-lg-6">
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'name']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Name is required',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input placeholder="Enter Name" onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault(); // Prevent form submission on Enter key press
                                                                    }
                                                                }} />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="col-12 col-lg-6">
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'profession']}
                                                            >
                                                                <Input placeholder="Enter Profession" onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault(); // Prevent form submission on Enter key press
                                                                    }
                                                                }} />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="col-12 col-lg-11">
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'details']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Details is required',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input placeholder="Enter Details" onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault(); // Prevent form submission on Enter key press
                                                                    }
                                                                }} />
                                                            </Form.Item>
                                                        </div>

                                                        <div className="col-12 col-lg-1 pb-2 pb-lg-0">
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </div>
                                                    </div>
                                                ))}
                                                <Form.Item className='mt-2'>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add Speaker / Guest
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                                <div className="col-12 col-md-4">
                                    <Form.Item label="Ticker Price" name="ticketPrice" extra={(eventPrice > 0 && eventPrice) ? `Ticket price for users will be ${Math.floor(eventPrice * (1 + taxRate))}. Adjust if needed.` : ""} rules={[
                                        {
                                            required: true,
                                            message: 'Ticket price required',
                                        },
                                    ]}>
                                        <InputNumber className='w-100' size='large' min={1} placeholder='Enter Ticket Price (Rs.)' />
                                    </Form.Item>
                                </div>
                                <div className="col-12 col-md-4">
                                    <Form.Item label="Seats" name="seats" rules={[
                                        {
                                            required: true,
                                            message: 'Seats required',
                                        },
                                    ]}>
                                        <InputNumber min={1} className='w-100' size='large' placeholder='Enter Total Seats' />
                                    </Form.Item>

                                </div>
                                <div className="col-12 col-md-4">
                                    <Form.Item label="Event Relevent Tags" name="tags" >
                                        <Input className='w-100' size='large' placeholder='E.g. wedding, seminar' />
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <label className='mb-3' htmlFor="description">Event Description</label>
                                    <ReactQuill
                                        id='description'
                                        theme="snow"
                                        placeholder='Say something about event...'
                                        value={description}
                                        onChange={handleChange}
                                    />
                                    {/* <Form.Item label="Event Description" name="description" >
                                    <TextArea
                                        showCount
                                        id='description'
                                        maxLength={5000}
                                        autoSize
                                        placeholder="Say something about event..."
                                        style={{
                                            minHeight: 140
                                        }}
                                    />
                                </Form.Item> */}
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
