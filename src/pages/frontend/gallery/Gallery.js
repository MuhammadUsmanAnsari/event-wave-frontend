import React from 'react'
import noImage from 'assets/pictures/no-image.jpg'
import { Image } from 'antd';

export default function Gallery({ isLoading, images, showMore, setShowMore }) {
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 11) + 2; // Generates random number between 0 and 4 and then adds 2
    };
    const imagesPerRow = 2;
    console.log(images.length);

    return (
        <div className="container my-5 ">
            {isLoading
                ? <div className="row">
                    <div className="col">
                        <div className='my-5 text-center'>
                            <div className="spinner-grow bg-info"></div>
                            <div className="spinner-grow bg-warning mx-3"></div>
                            <div className="spinner-grow bg-info"></div>
                        </div>
                    </div>
                </div>
                : <>
                    <div className="row gx-3 gx-lg-4">
                        {images.map((item, index) => (
                            <div key={index} className={`col-12 col-md-6 col-lg-4 d-flex align-items-center mt-3 mt-md-4`}>
                                <div className="rounded-4 bg-info overflow-hidden shadow">
                                    <Image src={item.image || noImage}
                                        onError={(e) => { e.target.src = noImage; }}
                                        alt={`Image ${index + 1}`}
                                        className="img-fluid" />
                                </div>
                            </div>
                        ))}
                    </div>
                    {
                        (!showMore && !isLoading) && <>
                            <div className="row my-5">
                                <div className="col">
                                    <button className='button-stylling-1 px-4 mx-auto' onClick={() => setShowMore(true)}>Show More</button>
                                </div>
                            </div><hr />
                        </>
                    }
                </>
            }
        </div>
    )
}
