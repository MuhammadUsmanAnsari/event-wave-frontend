import React, { useEffect, useRef, useState } from 'react'
import { delEvent, getMyEvents, updateEvent } from 'services/event';
import { Popconfirm, Spin, Switch } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useNavigate } from 'react-router-dom';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import ViewEvent from './ViewEvent';

export default function MyEvents() {
    const [events, setEvents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [statusLoading, setStatusLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalEventId, setModalEventId] = useState("");
    const searchInput = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {
        window.scroll(0, 0)
        getEvents();
    }, [])

    const getEvents = async () => {
        try {
            let { data } = await getMyEvents();
            setEvents(data?.data)

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
            title: 'Views',
            dataIndex: 'views',
            key: 'views',
            render: (views) => (
                <div> {views?.length}</div>
            )
        },
        {
            title: 'Likes',
            dataIndex: 'likes',
            key: 'likes',
            render: (likes) => (
                <div> {likes?.length}</div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ...getColumnSearchProps('status'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className='d-flex justify-content-evenly align-items-center'>
                    <Switch className='ms-1' unCheckedChildren={record.status !== "Published" && record.status} id='status' disabled={record.status === "Closed" ? true : false} loading={statusLoading} checkedChildren="Active" size='small' checked={record.status === "Published" ? true : false} onChange={() => handleStatus(record)} />
                    <Button type='dashed' onClick={() => {
                        setOpenModal(true)
                        setModalEventId(record?._id)
                    }}
                        className='ms-1 d-flex align-items-center justify-content-center'>
                        <VisibilityTwoToneIcon fontSize='small' />
                    </Button>
                    <Button type='default' disabled={record.status === "Closed" ? true : false} onClick={() => navigate(`/dashboard/events/edit/${record?._id}`)} className='ms-1 d-flex align-items-center justify-content-center'>
                        <EditTwoToneIcon fontSize='small' />
                    </Button>
                    <Space size="middle" className='ms-1'>
                        <Popconfirm
                            title="Delete the event"
                            description="Are you sure to delete this event?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                            onConfirm={() => handleDelEvent(record?._id)}
                            okType='danger'
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger className='d-flex align-items-center justify-content-center'>
                                <DeleteTwoToneIcon fontSize='small' />
                            </Button>
                        </Popconfirm>
                    </Space>
                </div>

            ),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
    ];


    const handleStatus = async (record) => {
        let status;
        if (record?.status === "Published") {
            status = "Draft"
        } else if (record?.status === "Draft") {
            status = "Published"
        }

        if (status === undefined) {
            return window.toastify("Event is closed already. You can't change status", "error")
        }

        setStatusLoading(true)
        try {
            let { data } = await updateEvent(record?._id, { status });
            window.toastify(data?.msg, "success");
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        } finally {
            getEvents()
            setStatusLoading(false)
        }
    }

    const handleDelEvent = async (id) => {
        try {
            let { data } = await delEvent(id);
            window.toastify(data?.msg, "success");
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        } finally {
            getEvents()
        }
    }

    return (
        <div className="container">
            <h2 className='heading-stylling mb-5 pt-4'>MY EVENTS</h2>
            <div className="row">
                <div className="col" style={{ overflow: "auto" }}>
                    <Table columns={columns} dataSource={events} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {openModal && <ViewEvent open={openModal} setOpen={setOpenModal} id={modalEventId} />}
                </div>
            </div>
        </div>
    )
}
