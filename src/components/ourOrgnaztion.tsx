import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image4 from "../assets/img/1724086550980.jpg";
import { axiosInstance } from "src/lib/http";
import { OgResp } from "src/types/validation";
interface publishesDataCard {
  img: string;
}



export interface OrgProp {
  id: number;
  name: string;
  img: string;
  link: string;
}
export default function OurOrgnaztion() {
  const [data, setData] = useState<OrgProp[]>([]);
  const fetchIssueById = async () => {
    try {
      const response = await axiosInstance.get<OgResp>(
        `/api/website/Home/OrgUndBWC`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching issue:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchIssueById();
      if (Array.isArray(result)) {
        setData(result as OrgProp[]);
      } else {
        console.error("Data is not an array", result);
      }
    };

    getData();
  }, []);
  const counter = data.length;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: counter === 1 ? 1 : counter === 2 ? 2 : counter === 3 ? 3 : 4,
    slidesToScroll: 1,
    rtl: true,
    responsive: [
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      {data.length === 1 ? (
        <div className="whitespace-nowrap">
          <a
            href={data[0].link}
            target="_blank"
            className="inline-block rounded-xl w-[25%] h-[200px] mx-10 overflow-hidden mt-2 shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] hover:bg-[#FFDAA0]/[.35] hover:cursor-pointer hover:scale-105"
          >
            <div
              key={data[0].id}
              className="flex-row-reverse w-[100%] h-[100%]"
            >
              <a
                href={data[0].link}
                target="_blank"
                className="flex justify-center items-center w-[100%] h-full p-2"
              >
                <img
                  src={data[0].img}
                  className="object-contain w-[100%] h-[100%]"
                  alt={data[0].name}
                />
              </a>
            </div>
          </a>
        </div>
      ) : (
        <Slider {...settings}>
          {data.map((item, idx) => (
            <div className="whitespace-nowrap" key={item.id}>
              <a
                href={item.link}
                target="_blank"
                className="inline-block rounded-xl w-[55%] h-[200px] mx-10 overflow-hidden mt-2 shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] hover:bg-[#FFDAA0]/[.35] hover:cursor-pointer hover:scale-105"
              >
                <div className="flex-row-reverse w-[100%] h-[100%]">
                  <a
                    href={item.link}
                    target="_blank"
                    className="flex justify-center items-center w-[100%] h-full p-2"
                  >
                    <img
                      src={item.img}
                      className="object-contain w-[100%] h-[100%]"
                      alt={item.name}
                    />
                  </a>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
