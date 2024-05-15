import { DatePicker, Input, Select } from 'antd'
import './_searchBar.scss'
import { useState } from 'react'
import moment from 'moment'
import dayjs from 'dayjs'
import { searchEvents } from 'services/event'
import { useNavigate } from 'react-router-dom'

export default function Searchbar({ setDate1, setCountry1, setCategory1, country1, date1, category1 }) {
    const [country, setCountry] = useState(country1 ? country1 : "Select Country")
    const [date, setDate] = useState(date1 ? date1 : "")
    const [category, setCategory] = useState(category1 ? category1 : "Select Category")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (country === "Select Country" || country == "" || !country) {
            return window.toastify("Please select country", "error")
        }
        if (date == "" || !date) {
            return window.toastify("Please add date", "error")
        }
        if (category === "Select Category" || category == "" || !category) {
            return window.toastify("Please select category", "error")
        }
        navigate(`/search/${country}/${date}/${category}`)
    }

    const onChange = (date, dateString) => {
        setDate(dateString);
        if (setDate1) setDate1(dateString);
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div id='searchbar-section'>
            <div className="container">
                <div className="card p-4 p-sm-5 rounded-pill border-0 shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3 d-flex justify-content-center">
                            <div className="col-12 col-sm-6 col-lg-3">
                                <Select
                                    showSearch
                                    placeholder="Select Country"
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    value={country}
                                    onChange={e => {
                                        setCountry(e)
                                        if (setCategory1) setCountry1(e)
                                    }}
                                    options={window.countries?.map((item, i) =>
                                    ({
                                        value: item,
                                        label: item,
                                    }))}
                                />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <DatePicker size='large'
                                    onChange={onChange}
                                    defaultValue={date1 ? dayjs(date1) : ""}
                                    disabledDate={(current) => {
                                        return current && current < moment().startOf("day");
                                    }} format='YYYY-MM-DD' />
                            </div>
                            <div className="col-12  col-lg-3">
                                <Select
                                    showSearch
                                    placeholder="Select Category"
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    value={category}
                                    onChange={e => {
                                        setCategory(e)
                                        if (setCategory1) setCategory1(e)
                                    }}
                                    options={window.categories?.map((item, i) =>
                                    ({
                                        value: item,
                                        label: item,
                                    }))}
                                />
                            </div>
                            <div className="col-12  col-lg-2">
                                <button class="button-stylling rounded bg-warning border-0" role="button">
                                    <span class="text">Search Now</span>
                                    <span>Discover</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
