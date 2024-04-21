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
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'config/Firebase';

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


    const props = {
        name: 'file',
        multiple: false,
        fileList: [],
        customRequest: async ({ file, onSuccess, onError }) => {
            let results = window.verifyImageSize(file);
            if (results) {
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    const width = img.width;
                    const height = img.height;
                    if (width === max_image_width && height === max_image_height) {
                        if (event?.image?.includes("https://firebasestorage.googleapis.com")) {
                            const fileRef = ref(storage, event?.image);
                            deleteObject(fileRef).then(async () => {
                                const fileExt = file.name.split('.').pop();
                                const imagesRef = ref(storage, `events/${window.getRandomId()}.${fileExt}`)
                                const uploadTask = uploadBytesResumable(imagesRef, file);

                                setImgLoading(true)
                                uploadTask.on('state_changed',
                                    (snapshot) => {
                                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                        setImgProgress(progress)
                                    },
                                    (error) => {
                                        window.toastify(error.message, "error")
                                        setImgLoading(false)
                                    },
                                    () => {
                                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                            setImage(downloadURL);
                                            setImgLoading(false)
                                        });
                                    }
                                );
                            })

                        } else {
                            const fileExt = file.name.split('.').pop();
                            const imagesRef = ref(storage, `events/${window.getRandomId()}.${fileExt}`)
                            const uploadTask = uploadBytesResumable(imagesRef, file);

                            setImgLoading(true)
                            uploadTask.on('state_changed',
                                (snapshot) => {
                                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                    setImgProgress(progress)
                                },
                                (error) => {
                                    window.toastify(error.message, "error")
                                    setImgLoading(false)
                                },
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        setImage(downloadURL);
                                        setImgLoading(false)
                                    });
                                }
                            );
                        }

                    } else {
                        return window.toastify(`Image dimenstions should be ${max_image_width}x${max_image_height} px. Your image resolution is ${width}x${height} px`, "error")
                    }
                }



            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



    const onFinish = async (values) => {
        if (image === "") {
            return window.toastify("Image is required.", "error");
        }
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
            ticketPrice, schedule: formattedSchedule, image
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
                speakers: eventData?.speakers?.map((item) => ({
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
                                <div className="col-12 mb-5">
                                    {imgLoading
                                        ? <div className='my-3 text-center'>
                                            <Progress type="circle" percent={imgProgress} />
                                        </div>
                                        : <>
                                            {image === ""
                                                ? <Dragger {...props} >
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                    <p className="ant-upload-hint">
                                                        The maximum image size allowed is 2MB and image dimensions shoule be {max_image_width} x {max_image_height} pixels.
                                                    </p>
                                                </Dragger>
                                                : <div className="text-center">
                                                    <img src={image} alt='Event Picture' className='img-fluid' />
                                                    <Dragger {...props} style={{ width: "fit-content", background: "#9accc9", margin: "10px auto" }}>
                                                        Change Picture
                                                    </Dragger>
                                                </div>
                                            }
                                        </>
                                    }


                                </div>
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
                                        <DatePicker className='w-100' placeholder='Select Date' size='large' disabledDate={(current) => {
                                            // Disable past dates
                                            return current && current < moment().startOf("day");
                                        }} format='YYYY-MM-DD' id='date' />
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
                                    <label htmlFor="time" className='mb-2'>Speakers / Performers</label><br />
                                    <Form.List name="speakers">
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
                                                        Add Speaker / Performer
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
