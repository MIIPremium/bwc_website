import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import miiImage from "../assets/img/mii_brand.png";
import premiumImage from "../assets/img/premium_brand.png";
interface publishesDataCard {
  img: string;
  title: string;
  subTitle: string;
  link: string;
}

const Cards: publishesDataCard[] = [
  {
    img: miiImage,
    link: "http://mii.edu.ye/",
    title: "المعهد الدولي الحديث",
    subTitle:
      "تأسس المعهد الدولي الحديث على يد الدكتور ربيع بن علي العوبثاني في يونيو 2003م، ويعمل المعهد تحت إشراف وزارة التعليم الفني والتدريب المهني بترخيص رقم (132) صادر في يناير 2004م. تسعى المؤسسة لأن تكون الرائدة في تقديم خدمات تعليمية وتدريبية ذات جودة عالية وبمعايير عالمية. ",
  },
  {
    img: premiumImage,
    link: "InProucation",
    title: "أكاديمية بريميوم للقيادة والإدارة",
    subTitle:
      "أكاديمية بريميوم للقيادة والإدارة، مؤسسة تعليمية وتدريبية تساعد في المقام الأول على إعداد وصناعة كفاءات بشرية مؤهلة من خلال برامج تدريب عالية الجودة للدفع بعملائها أفراداً ومؤسسات لاستغلال أقصى ما لديهم من إمكانيات وقدرات ومهارات ليكونوا قادرين على المنافسة محلياً وعالمياً. ",
  },
];
export default function LeariningAndTraning() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {Cards.map((item, idx) => (
          <Link
            target="_blank"
            to={item.link}
            className=" rounded-xl  h-[250px] overflow-hidden mt-2 shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] hover:bg-[#FFDAA0]/[.35] hover:cursor-pointer "
            key={idx}
          >
            <div className=" flex-row-reverse w-[100%] h-[100%] flex">
              <div className="flex justify-center items-center w-[40%] h-full p-5">
                <img
                  src={item.img}
                  className="object-contain w-[100%] h-[100%]"
                  alt=""
                />
              </div>
              <div className=" w-[60%] flex justify-center items-center">
                <div className="text-end px-3 text-sm w-[95%]">
                  <h1 className="text-xl mb-2">{item.title}</h1>
                  <div className="bg-black w-[100%] h-[1px] "></div>
                  <p className="text-[12px] font-black mt-2 leading-6 text-[#525252]">
                    {item.subTitle}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
