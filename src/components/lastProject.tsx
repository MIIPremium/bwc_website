import React from "react";
import imga from "../assets/img/1706714290731.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import formattedDate from "../utilities/formattedDate";
import Slider from "react-slick";
import image1 from "../assets/img/1706714290731.jpg";
import image2 from "../assets/img/1706714564880.jpg";
import image3 from "../assets/img/IMG_9024.jpg";
import image4 from "../assets/img/logo.png";
interface publishesDataCard {
  img: string;
  title: string;
  subTitle: string;
}

const Cards: publishesDataCard[] = [
  {
    img: image1,
    title: "التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين",
    subTitle:
      "بينما يتطلع العالم نحو التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين"
  },
  {
    img: image1,
    title: "التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين",
    subTitle:
      "بينما يتطلع العالم نحو التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين"
  },
  {
    img: image1,
    title: "التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين",
    subTitle:
      "بينما يتطلع العالم نحو التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين"
  },
  {
    img: image1,
    title: "التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين",
    subTitle:
      "بينما يتطلع العالم نحو التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين"
  },
  {
    img: image1,
    title: "التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين",
    subTitle:
      "بينما يتطلع العالم نحو التطورات في البحر الأحمر وتأثير هجمات جماعة الحوثيين"
  },
];
export default function LastProject() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    rtl: true,
  };
  return (
    <Slider {...settings}>
      {Cards.map((item, idx) => (
        <div
          className="max-w-sm rounded-xl h-[420px] overflow-hidden shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] "
          key={idx}
        >
          <div className="px-6 mt-6 text-end">
            <p className="text-black text-xl font-extrabold">{item.title}</p>
          </div>          
          <div className="px-6 py-4 text-end">
            <p className="text-[#525252] text-sm">{item.subTitle}</p>
          </div>
          <div className="w-full h-60 px-3">
            <img
              className="object-cover w-full h-full rounded-xl"
              src={item.img}
              alt="Sunset in the mountains"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}