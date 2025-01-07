import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PublishesImage from "../assets/img/PublishesImage.jpg";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "src/lib/http";
import { TaskForceResp } from "src/types/validation";
interface publishesDataCard {
  img: string;
  writer?:
    | {
        name: string;
        major: string;
        role: string;
        nameEng: string;
        majorEng: string;
        roleEng: string;
      }
    | undefined;
}

const Cards: publishesDataCard[] = [
  {
    img: PublishesImage,
    writer: {
      name: "حمود احمد سيف العطاس",
      major: "بكلاريوس علوم الكمبيوتر",
      role: "مهندس برمجيات",
      nameEng: "Hamood Abudrqeb Ahmed Saif",
      majorEng: "Computer Information System",
      roleEng: "Front-End",
    },
  },

  {
    img: PublishesImage,
    writer: {
      name: "حمود احمد سيف العطاس",
      major: "بكلاريوس علوم الكمبيوتر",
      role: "مهندس برمجيات",
      nameEng: "Hamood Abudrqeb Ahmed Saif",
      majorEng: "Computer Information System",
      roleEng: "Front-End",
    },
  },

  {
    img: PublishesImage,
    writer: {
      name: "حمود احمد سيف العطاس",
      major: "بكلاريوس علوم الكمبيوتر",
      role: "مهندس برمجيات",
      nameEng: "Hamood Abudrqeb Ahmed Saif",
      majorEng: "Computer Information System",
      roleEng: "Front-End",
    },
  },

  {
    img: PublishesImage,
    writer: {
      name: "حمود احمد سيف العطاس",
      major: "بكلاريوس علوم الكمبيوتر",
      role: "مهندس برمجيات",
      nameEng: "Hamood Abudrqeb Ahmed Saif",
      majorEng: "Computer Information System",
      roleEng: "Front-End",
    },
  },
];
export interface TaskForceProp {
  id: number;
  ar_name: string;
  en_name: string;
  ar_degree: string;
  en_degree: string;
  ar_role: string;
  en_role: string;
  img: string;
}
export default function TaskForce() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const [data, setData] = useState<TaskForceProp[]>([]);
  const fetchIssueById = async () => {
    try {
      const response = await axiosInstance.get<TaskForceResp>(
        `/api/website/AboutUs/TaskForce`
      );
      return response.data; // Ensure this returns OrgProp[]
    } catch (error) {
      console.error("Error TaskForce fetching issue:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchIssueById();
      if (Array.isArray(result)) {
        setData(result as TaskForceProp[]);
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
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="slider-container ">
      {data.length === 1 ? (
        <>
          {dir === "ltr" ? (
            //
            <div className="w-full  flex justify-center">
              <div
                className="max-w-sm rounded h-[500px] ml-[5rem] overflow-hidden shadow-lg cursor-pointer  hover:bg-[#FFDAA0]/[.35]  relative "
                key={data[0].id}
              >
                <img
                  className="object-cover w-full h-full "
                  src={data[0].img}
                  alt="Sunset in the mountains"
                />

                <div className="w-full h-[15vh] bg-[rgb(49,51,53)]/[.55] absolute rounded-t-md bottom-0 z-10 text-white hover:h-full hover:duration-500 hover:ease-in-out text-center hover:text-end hover:px-3 hover:pt-44">
                  <h3 className="text-2xl">{data[0].en_name}</h3>
                  <h5 className="leading-[70px]">{data[0].en_degree}</h5>
                  <p>{data[0].en_role}</p>
                </div>
              </div>
            </div>
          ) : (
            //
            //
            <div className="w-full  flex justify-center">
              <div
                className="max-w-sm rounded h-[500px] ml-[5rem] overflow-hidden shadow-lg cursor-pointer hover:bg-[#FFDAA0]/[.35]  relative "
                key={data[0].id}
              >
                <img
                  className="object-cover w-full h-full "
                  src={data[0].img}
                  alt="Sunset in the mountains"
                />

                <div className="w-full h-[15vh] bg-[rgb(49,51,53)]/[.55] absolute rounded-t-md bottom-0 z-10 text-white hover:h-full hover:duration-500 hover:ease-in-out text-center hover:text-start hover:px-3 hover:pt-44">
                  <h3 className="text-2xl">{data[0].ar_name}</h3>
                  <h5 className="leading-[70px]">{data[0].ar_degree}</h5>
                  <p>{data[0].ar_role}</p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        //
        <>
          <Slider {...settings}>
            {data.map((item, idx) => (
              <div
                className="max-w-sm rounded h-[500px]  overflow-hidden shadow-lg cursor-pointer hover:bg-[#FFDAA0]/[.35]  relative"
                key={idx}
              >
                <img
                  className="object-cover w-full h-full "
                  src={item.img}
                  alt="Sunset in the mountains"
                />
                {dir === "ltr" ? (
                  <div className="w-full h-[15vh] bg-[rgb(49,51,53)]/[.55] absolute rounded-t-md bottom-0 z-10 text-white hover:h-full hover:duration-500 hover:ease-in-out text-center hover:text-start hover:px-3 hover:pt-44">
                    <h3 className="text-2xl">{item.en_name}</h3>
                    <h5 className="leading-[70px]">{item.en_degree}</h5>
                    <p>{item.en_role}</p>
                  </div>
                ) : (
                  <div className="w-full h-[15vh] bg-[rgb(49,51,53)]/[.55] absolute rounded-t-md bottom-0 z-10 text-white hover:h-full hover:duration-500 hover:ease-in-out text-center hover:text-end hover:px-3 hover:pt-44">
                    <h3 className="text-2xl">{item.ar_name}</h3>
                    <h5 className="leading-[70px]">{item.ar_degree}</h5>
                    <p>{item.ar_role}</p>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
}
