import React from 'react'
import avatar1 from '../../assets/imgs/ava1.png'
import avatar2 from '../../assets/imgs/ava2.png'
import avatar3 from '../../assets/imgs/ava3.png'
import Slider from "react-slick";
import CommentComponent from '../CommentComponent/CommentComponent';
import './SliderCommentStyle.css'

const comments = [
    {
        imgSrc: avatar1,
        name: "Mark",
        rating: 5,
        comment: "“Pizza rất ngon nóng hổi, giao hàng rất nhanh Pizza rất ngon nóng hổi, giao hàng rất nhanh Pizza rất ngon nóng hổi, giao hàng rất nhanh”"

    },
    {
        imgSrc: avatar2,
        name: "Châu Bùi",
        rating: 5,
        comment: "“Chất lượng dịch vụ rất tốt , giao hàng  nhanh,”"
    },
    {
        imgSrc: avatar3,
        name: "Thanh Lịch",
        rating: 4,
        comment: "“Pizza rất ngon, giao hàng nhanh”"
    },

];

const SliderComment = () => {
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        centerMode: true,
        centerPadding: "10px",
    };
    return (
        <div className='container'>
            <div className='container2'>
                <h2 className='mt-4 mb-5' style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700' }}>
                    Phản hồi từ khách hàng
                </h2>
                <div className="slider-container" style={{ backgroundColor: '#F7F6F6' }}>
                    <Slider {...settings}>
                        {comments.map((comment) => {
                            return (
                                <CommentComponent imgSrc={comment.imgSrc} name={comment.name} rating={comment.rating} comment={comment.comment} />
                            )
                        })}



                    </Slider>
                </div>
            </div>

        </div>

    );
}

export default SliderComment
