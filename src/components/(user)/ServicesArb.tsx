import { useQuery } from "@tanstack/react-query";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ServicesHomeProp } from "src/types/validation";

const ServicesArb = () => {
  return (
    <div className="">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase "></span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase "></span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const {
    data: services, // Renamed to `services` for clarity
    isLoading,
    error,
  } = useQuery<ServicesHomeProp[]>({
    queryFn: () =>
      fetch(
        "https://bwc-api-testing.runasp.net/api/website/Home/Services"
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }
        return res.json();
      }),
    queryKey: ["services"], // Unique key for this query
  });
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-1%", "84%"]);

  return (
    <section ref={targetRef} className="relative h-[180vh] ">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden ">
        <motion.div style={{ x }} className="flex gap-4">
          {services?.map((service) => {
            return <Card card={service} key={service.ar_name} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: any) => {
  return (
    <div
      key={card.id}
      className="group relative h-[350px] w-[450px] overflow-hidden bg-white rounded-lg hover:bg-[#FFDAA0]/[.35] cursor-pointer shadow-[0_05px_20px_0px_rgba(0,0,0,0.3)] services-ar"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className=" text-start w-[100%] min-h-[50%] p-4">
        <h1 className="text-3xl mb-4  mt-14 break-words whitespace-pre-wrap">
          {card.ar_name}
        </h1>
        <p className="text-xl text-[#525252] break-words whitespace-normal">
          {card.ar_Description}
        </p>
      </div>
    </div>
  );
};

export default ServicesArb;
