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
    <div>
      <div className="xlg:max-w-[1200px] xlg:justify-self-center overflow-x-hidden">
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
                <div className="w-[20%] sm:-translate-x-12">
                  <div className="flex justify-center mx-2">
                    <div className="outline outline-offset-1 outline-1 outline-[#ccc]/60 rounded-full w-[10.1rem] h-[2.8rem] flex justify-center items-center">
                      <button className="inline-flex w-[10rem] h-[2.8rem] outline outline-1 outline-[#CCA972]/80 bg-black text-white items-center justify-center whitespace-nowrap rounded-full text-md font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        <Link to={"/join-us"} className="text-xs">
                          Get To Know Our Cadres
                        </Link>
                      </button>
                    </div>
                  </div>
                  {/* <Button>
                  <Link to={"/join-us"}>Get to know our cadres</Link>
                </Button> */}
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
                <div className="w-[20%] sm:translate-x-10">
                  <div className="flex justify-center mx-2">
                    <div className="outline outline-offset-1 outline-1 outline-[#ccc]/60 rounded-full w-[8.6rem] h-[2.8rem] flex justify-center items-center">
                      <button className="inline-flex w-[8.5rem] h-[2.8rem] outline outline-1 outline-[#CCA972]/80 bg-black text-white items-center justify-center whitespace-nowrap rounded-full text-md font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        <Link to={"/join-us"}>تعرف على كوادرنا</Link>
                      </button>
                    </div>
                  </div>
                  {/* <Button>
                  <Link to={"/join-us"}>تعرف على كوادرنا</Link>
                </Button> */}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {dir === "ltr" ? (
              <div className="w-full h-36 flex justify-around items-center ">
                <div className="w-[20%] ">
                  <div className="flex justify-center mx-2">
                    <div className="outline outline-offset-1 outline-1 outline-[#ccc]/60 rounded-full w-[12.6rem] h-[2.8rem] flex justify-center items-center">
                      <button className="inline-flex w-[12.5rem] h-[2.8rem] outline outline-1 outline-[#CCA972]/80 bg-black text-white items-center justify-center whitespace-nowrap rounded-full text-md font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        <Link to={"/join-us"}>Get To Know Our Cadres</Link>
                      </button>
                    </div>
                  </div>
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
                  <div className="flex justify-center mx-2">
                    <div className="outline outline-offset-1 outline-1 outline-[#ccc]/60 rounded-full w-[8.6rem] h-[2.8rem] flex justify-center items-center">
                      <button className="inline-flex w-[8.5rem] h-[2.8rem] outline outline-1 outline-[#CCA972]/80 bg-black text-white items-center justify-center whitespace-nowrap rounded-full text-md font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        <Link to={"/join-us"}>تعرف على كوادرنا</Link>
                      </button>
                    </div>
                  </div>
                  {/* <Button></Button> */}
                </div>
              </div>
            )}
          </>
        )}

        <div className="w-full lg:h-[80vh] sm:h-[100vh] p-2 overflow-hidden relative fedaup animate-fedaup">
          <TaskForce />
        </div>
      </div>
      <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
