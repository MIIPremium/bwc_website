import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import AboutUsHeader from "../../components/(user)/aboutUs-header";
import OutMission from "../../components/(user)/out-mission";
import OurPortfolio from "../../components/(user)/ourportfolio";
import VideoCourse from "../../components/(user)/videocourse";
import { useTranslation } from "react-i18next";
import TaskForce from "../../components/taskforce";
import Footer from "../../components/footer";
import Button from "src/components/button";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [widthScreen, setWidthScreen] = useState({
    winWidth: window.innerWidth,
    winHight: window.innerHeight,
  });

  const detectSize = () => {
    setWidthScreen({
      winWidth: window.innerWidth,
      winHight: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [widthScreen]);
  return (
    <div className="overflow-x-hidden">
      <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
        <Navbar />
      </div>
      <div className="w-full lg:h-[80vh] md:h-[150vh] sm:h-[150vh] md:mt-11 sm:mt-8 ">
        <AboutUsHeader />
      </div>
      <div className="lg:w-[98%] lg:min-h-[80vh] md:min-h-[80vh] md:pb-4 m-auto mb-16  lg:mt-16 sm:mt-40 fedaup animate-fedaup">
        <OutMission />
      </div>

      <OurPortfolio />

      <VideoCourse
        items={[
          "https://www.youtube.com/watch?v=kkv2vh_PvZ4",
          "https://www.youtube.com/watch?v=2vcXxilg650",
          "https://www.youtube.com/watch?v=Bp7UYlluj20",
          "https://www.youtube.com/watch?v=RycxQx2H0qY",
          "https://www.youtube.com/watch?v=U85UenSIjKI",
          "https://www.youtube.com/watch?v=0UkLUtQJPhU",
          "https://www.youtube.com/watch?v=l8lqIyoaGfw",
          "https://www.youtube.com/watch?v=VTAYQqNpfe8",
          "https://www.youtube.com/watch?v=1GyTKexJcw8",
        ]}
        itemsToShow={3}
      />

      {widthScreen.winWidth <= 980 ? (
        <>
          {dir === "ltr" ? (
            <div className="w-full h-36 flex justify-around items-center ">
              <div className="w-[20%] sm:-translate-x-7">
                <Button>
                  <Link to={"/join-us"}>Join Us</Link>
                </Button>
              </div>
              <div className="w-[80%] ">
                <div className="flex p-5 justify-end">
                  <h1 className="text-3xl">{t("team-force")}</h1>
                  <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-36 flex justify-around items-center ">
              <div className="w-[80%]">
                <div className="flex p-5">
                  <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                  <h1 className="text-3xl">{t("team-force")}</h1>
                </div>
              </div>
              <div className="w-[20%] sm:translate-x-7">
                <Button>
                  <Link to={"/join-us"}>أنظم الينا</Link>
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {dir === "ltr" ? (
            <div className="w-full h-36 flex justify-around items-center ">
              <div className="w-[20%] ">
                <Button>
                  <Link to={"/join-us"}>Join Us</Link>
                </Button>
              </div>
              <div className="w-[80%] ">
                <div className="flex p-5 justify-end">
                  <h1 className="text-3xl">{t("team-force")}</h1>
                  <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-36 flex justify-around items-center ">
              <div className="w-[80%]">
                <div className="flex p-5">
                  <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                  <h1 className="text-3xl">{t("team-force")}</h1>
                </div>
              </div>
              <div className="w-[20%] ">
                <Button>
                  <Link to={"/join-us"}>أنظم الينا</Link>
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <div className="w-full lg:h-[80vh] sm:h-[100vh] p-2 overflow-hidden relative fedaup animate-fedaup">
        <TaskForce />
      </div>
      <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
