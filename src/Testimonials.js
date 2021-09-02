import React, { useState, useEffect } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./Testimonials.css"
import { Avatar } from "@material-ui/core"
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons"
import axios from "axios"


const PreviousBtn = (props) => {
    //  console.log(props);
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIos style={{ color: "gray", fontSize: "30px" }} />
        </div>
    );
};
const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowForwardIos style={{ color: "gray", fontSize: "30px" }} />
        </div>
    );
};
/* 
const Testimonials = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }} className="testimonial">
            <div style={{ width: "50%", textAlign: "center" }}>
                <h1 style={{ marginBottom: 20, marginTop: 20 }}>Testimonials</h1>
                <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
                    <Card img="data:image/jpeg;base64,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" />

                    <Card img="data:image/jpeg;base64,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" />
                    <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX35Sgsl-oV6hrXdLQarQI1ayd-iIoguQI0Q&usqp=CAU" />
                </Slider>
            </div>
        </div>
    )
}
const Card = ({ img }) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            color: "gray"
        }}>
            <Avatar
                imgProps={{ style: { borderRadius: "50%" } }} src={img}
                style={{ height: 120, width: 120, border: "1px solid lightgray", padding: 7, marginBottom: 20 }} />
            <p>Yes there are now several vaccines that are in use. The first mass vaccination programme started in early December 2020 and the number of vaccination doses administered is updated on a daily basis here.
                At least 13 different vaccines (across 4 platforms) have been administered.</p>
            <p><span style={{
                fontWeight: 600,
                color: "rgb(38, 31, 31)",
                fontStyle: "italic"
            }}>KRITHI SHETTY</span></p>
            <p style={{ fontStyle: "italic", color: "rgb(38, 31, 31)", fontWeight: 500, fontSize: 13 }}>South Indian Actress</p>
        </div>
    )
}

export default Testimonials */



const Testimonials = () => {
    let i = 0
    const [values, setValues] = useState([])
    useEffect(() => {
        fetchCall()
    }, [])

    const fetchCall = async () => {
        try {
            const display = await axios.get('https://testimonialapi.toolcarton.com/api')
            setValues(display.data)

        }
        catch (err) {
            console.log(err)
        }


    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }} className="testimonial">
            <div style={{ width: "50%", textAlign: "center" }}>
                <h1 style={{ marginBottom: 20, marginTop: 20 }}>Testimonials</h1>

                {/*  {JSON.stringify(values)} */}
                <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
                    {values.map(v => (
                        <div key={i++}>
                            <Card img={v.avatar} mes={v.message} name={v.name} des={v.designation} />
                        </div>

                    ))}
                </Slider>

            </div>
        </div>
    )
}
const Card = ({ img, mes, name, des }) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            color: "gray"
        }}>
            <Avatar
                imgProps={{ style: { borderRadius: "50%" } }} src={img}
                style={{ height: 120, width: 120, border: "1px solid lightgray", padding: 7, marginBottom: 20 }} />
            <p>{mes}</p>
            <p><span style={{
                fontWeight: 600,
                color: "rgb(38, 31, 31)",
                fontStyle: "italic"
            }}>{name}</span></p>
            <p
                style={{ fontStyle: "italic", color: "rgb(38, 31, 31)", fontWeight: 500, fontSize: 13 }}>
                {des}
            </p>
        </div>
    )
}

export default Testimonials
