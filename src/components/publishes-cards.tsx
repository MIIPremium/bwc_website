import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import formattedDate from "../utilities/formattedDate";
import Slider from "react-slick";
import PublishesImage1 from "../assets/img/publish_1.jpg";
import PublishesImage2 from "../assets/img/publish_2.jpg";
import PublishesImage3 from "../assets/img/publish_3.jpg";
import PublishesImage4 from "../assets/img/publish_4.jpg";
import writerImagePlaceholder from "../assets/img/IMG_9024.jpg";
import { Link } from "react-router-dom";
import { axiosInstance } from "src/lib/http";
import { useTranslation } from "react-i18next";
import formattedDateEn from "src/utilities/formattedDateEn";
interface publishesDataCard {
  img: string;
  type: string;
  title: string;
  date: Date;
  link: string;
  writer?:
    | {
        img: string;
        name: string;
      }
    | undefined;
}

const Cards: publishesDataCard[] = [
  {
    img: PublishesImage1,
    type: "الاخبار",
    link: "https://www.facebook.com/share/p/VzeHNxT5exEnUjuD/ ",
    title:
      "مدير عام شركة عالم الأعمال للاستثمار والدراسات ورئيس مؤسسة حاضنة بناء لريادة الأعمال يزور الغرفة التجارية والصناعية في مدينة عدن",
    date: new Date("2024-11-9"),
    writer: { name: "إعلام الشركة والمؤسسة", img: writerImagePlaceholder },
  },

  {
    img: PublishesImage2,
    type: "الاخبار",
    link: "https://www.facebook.com/share/p/EMDAez298MYM8kR4/",
    title:
      "مدير الصندوق الاجتماعي للتنمية -- حضرموت يزور شركة عالم الأعمال للاستثمار والدراسات وأكاديمية بريميوم للقيادة والإدارة",
    date: new Date("2024-12-5"),
    writer: { name: "إعلام الشركة والمؤسسة", img: writerImagePlaceholder },
  },

  {
    img: PublishesImage3,
    type: "منشور",
    link: "https://www.facebook.com/share/p/eookDQbmwzhNWGY7/",
    title:
      "زيارة مؤسسة صنائع المعروف الإنسانية إلى شركة عالم الأعمال للاستثمار والدراسات وأكاديمية بريميوم للقيادة والإدارة ومؤسسة حاضنة بناء لريادة الأعمال.",
    date: new Date("2024-2-20"),
    writer: { name: "إعلام الشركة والمؤسسة", img: writerImagePlaceholder },
  },

  {
    img: PublishesImage4,
    type: "منشور",
    link: "https://www.facebook.com/share/p/7YwHJFty8vKTYuq7/",
    title:
      "توقيع مذكرة تعاون مشترك بين شركة عالم الأعمال للاستثمار والدراسات المحدودة ومنتدى طلاب المشقاص ",
    date: new Date("2024-2-22"),
    writer: { name: "إعلام الشركة والمؤسسة", img: writerImagePlaceholder },
  },
];

export interface LastPubRespHome {
  id: number;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  date_of_publish: Date;
  ar_description: string;
  en_description: string;
  type: Type;
  writers: WriterElement[];
}
export type LastPubRespHomeProp = {
  id: number;
  name: string;
  img: string;
  link: string;
};
export interface WriterElement {
  id: number;
  ar_fullName: string;
  en_fullName: string;
  image: string;
  ar_description: string;
  en_description: string;
  ar_role: string;
  en_role: string;
  publication: PublicationElement[];
  soicalmedia: any[];
}

export interface PublicationElement {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: string[];
  writers: Array<PublicationWriter | null>;
  reportId: null;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: string[];
  en_table_of_content: string[];
  ar_description: string;
  en_description: string;
  ar_Note: string;
  en_Note: string;
  references: any[];
}

export interface PublicationWriter {
  id: number;
  ar_fullName: string;
  en_fullName: string;
  image: string;
  ar_description: string;
  en_description: string;
  ar_role: string;
  en_role: string;
  publication: Array<PurplePublication | null>;
  soicalmedia: any[];
}

export interface PurplePublication {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: string[];
  writers: null[];
  reportId: null;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[];
  date_of_publish: Date;
  ar_table_of_content: string[];
  en_table_of_content: string[];
  ar_description: string;
  en_description: string;
  ar_Note: string;
  en_Note: string;
  references: any[];
}

export enum Type {
  Analysis = "analysis",
  News = "news",
  Publish = "publish",
}
export default function PublishesCards() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const [data, setData] = useState<LastPubRespHome[]>([]);
  const fetchIssueById = async () => {
    try {
      const response = await axiosInstance.get<LastPubRespHomeProp>(
        `/api/website/Home/LastPublications`
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
        setData(result as LastPubRespHome[]);
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
    <>
      {dir === "ltr" ? (
        <div className="slider-container">
          {data.length === 1 ? (
            <Slider {...settings}>
              <div className="whitespace-nowrap">
                <Link
                  target="_blank"
                  to={
                    data[0].type === "publish"
                      ? `/publish-details/${data[0].id}`
                      : data[0].type === "news"
                      ? `/news-details/${data[0].id}`
                      : data[0].type === "analysis"
                      ? `/Analysis-details/${data[0].id}`
                      : ""
                  }
                  className="max-w-sm rounded h-[500px]  overflow-hidden shadow-lg cursor-pointer hover:bg-[#FFDAA0]/[.35] hover:scale-105 hover:duration-300 "
                >
                  <div className="md:w-full md:h-60 sm:w-full sm:h-52">
                    <img
                      className="object-cover w-full h-full"
                      src={data[0].b_image}
                      alt="Sunset in the mountains"
                    />
                  </div>
                  <div className="px-6 pt-4 pb-2 text-end">
                    <span
                      className={
                        data[0].type === "publish"
                          ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#CEA461] mr-2 mb-2"
                          : data[0].type === "news"
                          ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#69DB57] mr-2 mb-2"
                          : data[0].type === "analysis"
                          ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#979797] mr-2 mb-2"
                          : ""
                      }
                    >
                      {data[0].type}
                    </span>
                  </div>
                  <div className="px-6 py-4 text-end">
                    <p dir="rtl" className="publishesTitle">
                      {data[0].en_Title}
                    </p>
                    <div className="font-bold text-sm mb-2 mt-2">
                      {formattedDate(new Date(data[0].date_of_publish))}
                    </div>
                  </div>
                  <div
                    className={
                      data[0].writers ? "w-11/12 m-auto h-[1px] bg-black" : ""
                    }
                  ></div>
                  <div className="flex justify-end px-4 py-4 w-full h-full ">
                    <p className="mr-3">{data[0]?.writers[0].en_fullName}</p>
                    <img
                      src={data[0].writers[0].image}
                      className={
                        data[0].writers[0].image
                          ? "w-[40px] h-[40px] bg-cover rounded-full outline outline-offset-0.5 outline-[#CCA972]"
                          : ""
                      }
                      alt=""
                    />
                  </div>
                </Link>
              </div>
            </Slider>
          ) : (
            <Slider {...settings}>
              {data.map((item, idx) => (
                <Link
                  target="_blank"
                  to={
                    item.type === "publish"
                      ? `/publish-details/${item.id}`
                      : item.type === "news"
                      ? `/news-details/${item.id}`
                      : item.type === "analysis"
                      ? `/Analysis-details/${item.id}`
                      : ""
                  }
                  className="max-w-sm rounded h-[500px]  overflow-hidden shadow-lg cursor-pointer hover:bg-[#FFDAA0]/[.35] hover:scale-105 hover:duration-300 "
                  key={idx}
                  dir="rtl"
                >
                  <div className="md:w-full md:h-60 sm:w-full sm:h-52">
                    <img
                      className="object-cover w-full h-full"
                      src={item.b_image}
                      alt="Sunset in the mountains"
                    />
                  </div>
                  <div className="px-6 pt-4 pb-2 text-end">
                    <span
                      className={
                        item.type === "publish"
                          ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#CEA461] mr-2 mb-2"
                          : item.type === "news"
                          ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#69DB57] mr-2 mb-2"
                          : item.type === "analysis"
                          ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#979797] mr-2 mb-2"
                          : ""
                      }
                    >
                      {item.type}
                    </span>
                  </div>
                  <div className="px-6 py-4 text-end">
                    <p dir="ltr" className="publishesTitle">
                      {item.en_Title}
                    </p>
                    <div className="font-bold text-sm mb-2 mt-2">
                      {formattedDateEn(new Date(item.date_of_publish))}
                    </div>
                  </div>
                  <div
                    className={
                      item.writers ? "w-11/12 m-auto h-[1px] bg-black" : ""
                    }
                  ></div>
                  <div className="flex justify-end px-4 py-4 w-full h-full ">
                    <p className="ml-3">{item?.writers[0]?.en_fullName}</p>
                    <img
                      src={item?.writers[0]?.image}
                      className={
                        item?.writers[0]?.image
                          ? "w-[40px] h-[40px] bg-cover rounded-full outline outline-offset-0.5 outline-[#CCA972]"
                          : ""
                      }
                      alt=""
                    />
                  </div>
                </Link>
              ))}
            </Slider>
          )}
        </div>
      ) : (
        <div className="slider-container">
          {data.length === 1 ? (
            <Slider {...settings}>
              <div className="whitespace-nowrap">
                <Link
                  target="_blank"
                  to={data[0].ar_Title}
                  className="max-w-sm rounded h-[500px]  overflow-hidden shadow-lg cursor-pointer hover:bg-[#FFDAA0]/[.35] hover:scale-105 hover:duration-300 "
                >
                  <div className="md:w-full md:h-60 sm:w-full sm:h-52">
                    <img
                      className="object-cover w-full h-full"
                      src={
                        data[0].type === "publish"
                          ? `/publish-details/${data[0].id}`
                          : data[0].type === "news"
                          ? `/news-details/${data[0].id}`
                          : data[0].type === "analysis"
                          ? `/Analysis-details/${data[0].id}`
                          : ""
                      }
                      alt="Sunset in the mountains"
                    />
                  </div>
                  <div className="px-6 pt-4 pb-2 text-end">
                    <span
                      className={
                        data[0].type === "publish"
                          ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#CEA461] mr-2 mb-2"
                          : data[0].type === "news"
                          ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#69DB57] mr-2 mb-2"
                          : data[0].type === "analysis"
                          ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#979797] mr-2 mb-2"
                          : ""
                      }
                    >
                      {data[0].type === "publish"
                        ? "منشور"
                        : data[0].type === "news"
                        ? "الاخبار"
                        : data[0].type === "analysis"
                        ? "تحليلات"
                        : ""}
                    </span>
                  </div>
                  <div className="px-6 py-4 text-end">
                    <p dir="rtl" className="publishesTitle">
                      {data[0].ar_Title}
                    </p>
                    <div className="font-bold text-sm mb-2 mt-2">
                      {formattedDate(new Date(data[0].date_of_publish))}
                    </div>
                  </div>
                  <div
                    className={
                      data[0].writers ? "w-11/12 m-auto h-[1px] bg-black" : ""
                    }
                  ></div>
                  <div className="flex justify-end px-4 py-4 w-full h-full ">
                    <p className="mr-3">{data[0]?.writers[0].ar_fullName}</p>
                    <img
                      src={data[0].writers[0].image}
                      className={
                        data[0].writers[0].image
                          ? "w-[40px] h-[40px] bg-cover rounded-full outline outline-offset-0.5 outline-[#CCA972]"
                          : ""
                      }
                      alt=""
                    />
                  </div>
                </Link>
              </div>
            </Slider>
          ) : (
            <Slider {...settings}>
              {data.map((item, idx) => (
                <Link
                  target="_blank"
                  to={
                    item.type === "publish"
                      ? `/publish-details/${item.id}`
                      : item.type === "news"
                      ? `/news-details/${item.id}`
                      : item.type === "analysis"
                      ? `/Analysis-details/${item.id}`
                      : ""
                  }
                  className="max-w-sm rounded h-[500px]  overflow-hidden shadow-lg cursor-pointer hover:bg-[#FFDAA0]/[.35] hover:scale-105 hover:duration-300 "
                  key={idx}
                >
                  <div className="md:w-full md:h-60 sm:w-full sm:h-52">
                    <img
                      className="object-cover w-full h-full"
                      src={item.b_image}
                      alt="Sunset in the mountains"
                    />
                  </div>
                  <div className="px-6 pt-4 pb-2 text-end">
                    <span
                      className={
                        item.type === "publish"
                          ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#CEA461] mr-2 mb-2"
                          : item.type === "news"
                          ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#69DB57] mr-2 mb-2"
                          : item.type === "analysis"
                          ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#979797] mr-2 mb-2"
                          : ""
                      }
                    >
                      {item.type === "publish"
                        ? "منشور"
                        : item.type === "news"
                        ? "الاخبار"
                        : item.type === "analysis"
                        ? "تحليلات"
                        : ""}
                    </span>
                  </div>
                  <div className="px-6 py-4 text-end">
                    <p dir="rtl" className="publishesTitle">
                      {item.ar_Title}
                    </p>
                    <div className="font-bold text-sm mb-2 mt-2">
                      {formattedDate(new Date(item.date_of_publish))}
                    </div>
                  </div>
                  <div
                    className={
                      item.writers ? "w-11/12 m-auto h-[1px] bg-black" : ""
                    }
                  ></div>
                  <div className="flex justify-end px-4 py-4 w-full h-full ">
                    <p className="mr-3">{item?.writers[0]?.ar_fullName}</p>
                    <img
                      src={item?.writers[0]?.image}
                      className={
                        item?.writers[0]?.image
                          ? "w-[40px] h-[40px] bg-cover rounded-full outline outline-offset-0.5 outline-[#CCA972]"
                          : ""
                      }
                      alt=""
                    />
                  </div>
                </Link>
              ))}
            </Slider>
          )}
        </div>
      )}
    </>
  );
}
