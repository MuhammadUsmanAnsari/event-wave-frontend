import { Button, Input, Popconfirm, Space, Switch, Table } from 'antd';
import LoadingIndicator from 'components/LoadingIndicator';
import React, { useEffect, useRef, useState } from 'react'
import { getAdminPendingEvents, publishEventByAdmin } from 'services/event';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import ViewEvent from './ViewEvent';
import RejectEvent from './RejectEvent';

export default function Events() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [modalEventId, setModalEventId] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const searchInput = useRef(null);

    useEffect(() => {
        getPendingEvents()
    }, [rejectModal])

    const getPendingEvents = async () => {
        try {
            let { data } = await getAdminPendingEvents();
            setEvents(data?.data)
            console.log(data?.data);
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
    }



    // table search
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        borderColor: "#9accc9",
                        marginBottom: 8,
                        boxShadow: "0px 0px 2px #9accc9 ",
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                            backgroundColor: "#9accc9"
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        className='text-warning'
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? dataIndex === "date" ? text?.toString()?.split('T')[0] : text.toString() : ''}
                />
            ) : (
                dataIndex === "date" ? text?.split('T')[0] : text

            ),
    });







    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            ...getColumnSearchProps('category'),
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            ...getColumnSearchProps('country'),
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            ...getColumnSearchProps('city'),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
        },
        {
            title: 'Added By',
            dataIndex: ['addedBy', 'email'],
            key: 'addedBy',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <div className='d-flex justify-content-center align-items-center'>
                    <Button type='dashed' onClick={() => {
                        setOpenModal(true)
                        setModalEventId(record?._id)
                    }}
                        className='ms-1 d-flex align-items-center justify-content-center'>
                        <VisibilityTwoToneIcon fontSize='small' />
                    </Button>

                    <Space size="middle" className='ms-1'>
                        <Popconfirm
                            title="Publish the event"
                            description="Are you sure you want to publish this event?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'green',
                                    }}
                                />
                            }
                            onConfirm={() => handlePublishEvent(record)}
                            okType='dashed'
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className='d-flex align-items-center justify-content-center'>
                                Publish
                            </Button>
                        </Popconfirm>
                    </Space>
                    <Space size="middle" className='ms-1'>
                        <Button danger className='d-flex align-items-center justify-content-center' onClick={() => {
                            setModalEventId(record?._id)
                            setRejectModal(true)
                        }}>
                            Reject
                        </Button>
                    </Space>
                </div >

            ),
        },
    ];


    const handlePublishEvent = async (record) => {
        try {
            let { data } = await publishEventByAdmin(record?._id);
            window.toastify(data?.msg, "success");
            getPendingEvents()
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        } finally {
        }
    }

    return (
        <>
            <LoadingIndicator loading={loading} />

            <div className="container">
                <h2 className='heading-stylling mb-5 pt-4'>ADDED EVENTS</h2>
                <div className="row">
                    <div className="col" style={{ overflow: "auto" }}>
                        {
                            loading
                                ? <div className='my-5 text-center'>
                                    <div className="spinner-grow spinner-grow-sm bg-info"></div>
                                    <div className="spinner-grow spinner-grow-sm bg-warning mx-3"></div>
                                    <div className="spinner-grow spinner-grow-sm bg-info"></div>
                                </div>
                                : <Table columns={columns} dataSource={events} />
                        }

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {openModal && <ViewEvent open={openModal} setOpen={setOpenModal} id={modalEventId} />}
                        {rejectModal && <RejectEvent open={rejectModal} setOpen={setRejectModal} id={modalEventId} />}
                    </div>
                </div>
            </div>
        </>
    )
}
