import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ServicesHomeProp } from "src/types/validation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Services = () => {
  return (
    <div className="py-8">
      <HorizontalSwiperCarousel />
    </div>
  );
};

const HorizontalSwiperCarousel = () => {
  const {
    data: services,
    isLoading,
    error,
  } = useQuery<ServicesHomeProp[]>({
    queryFn: () =>
      fetch("https://bwc.runasp.net/api/website/Home/Services").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }
        return res.json();
      }),
    queryKey: ["services"],
  });

  const { t, i18n } = useTranslation();

  return (
    <section className="w-full px-4 md:px-16">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        autoplay={{ delay: 4000 }}
        loop
        dir={"ltr"}
        className="w-[100%] custom-swiper"
      >
        {services?.map((card: any) => (
          <SwiperSlide key={card.id}>
            <div className="relative h-[250px] w-[90%] m-3 justify-self-center bg-white rounded-lg shadow-[0_5px_20px_rgba(0,0,0,0.2)] overflow-hidden group">
              <div
                style={{
                  backgroundImage: `url(${card.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 group-hover:scale-105 transition-transform duration-300 opacity-20"
              ></div>
              <div className="relative z-10 p-6 text-start">
                <h1 className="text-3xl font-bold mb-4">{card.en_name}</h1>
                <p className="text-lg text-[#525252]">{card.en_Description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Services;
