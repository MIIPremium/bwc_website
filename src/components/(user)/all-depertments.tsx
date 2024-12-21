import React from "react";
import allDepertments from "../../assets/img/all-departmemts.png";
import learn from "../../assets/img/تعليم والتدريب.jpg";
import management from "../../assets/img/ادارة المشاريع.jpg";
import enterpurnore from "../../assets/img/ريادة الاعمال.jpg";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

export default function AllDepertments() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletScreen = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 979px)",
  });
  const isMonitorScreen = useMediaQuery({ query: "(min-width: 980px)" });
  return (
    <>
      {isMobileScreen && (
        <>
          {dir === "ltr" ? (
            <div className=" px-3 py-8 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Section */}
                <div className="h-60 w-full ">
                  <img
                    src={learn} // Replace with your image path
                    alt="Education and Training"
                    className="object-cover h-full w-full "
                  />
                </div>
                <div
                  dir="ltr"
                  className="flex flex-col justify-center min-h-[20vh] py-3 shadow-md px-4"
                >
                  <div className="flex ">
                    <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      Education and Training
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                    Business World's Education and Training Department focuses
                    on developing People's business skills and knowledge
                    Different. The department offers specialized training
                    programs and workshops aimed at to strengthen managerial and
                    technical competencies. This includes courses in Project
                    management, marketing, and human resources, which helps
                    Participants to deal efficiently with practical challenges
                    and provide them with Capacities to adapt to changing labour
                    market requirements and enhance their professional
                    opportunities.
                  </p>
                </div>

                {/* Second Section */}
                <div className="h-60 w-full ">
                  <img
                    src={management} // Replace with your image path
                    alt="Project Management"
                    className="object-cover h-full w-full "
                  />
                </div>
                <div
                  dir="ltr"
                  className="flex flex-col justify-center min-h-[20vh] py-3 shadow-md px-4"
                >
                  <div className="flex ">
                    <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      Project Management
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                    The Project Management Section specializes in providing
                    companies and individuals with tools and techniques for
                    efficient and effective project implementation. We offer
                    Consultancy specialized in project planning, performance
                    evaluation, and work Department to develop effective risk
                    management strategies and customize resources, ensuring the
                    quality of results. It also provides modern tools and
                    techniques To help enterprises achieve success in their
                    projects and contribute to Increase productivity.
                  </p>
                </div>

                {/*  */}

                <div className="h-60 w-full ">
                  <img
                    src={enterpurnore} // Replace with your image path
                    alt="Entrepreneurship"
                    className="object-cover h-full w-full "
                  />
                </div>
                <div
                  dir="ltr"
                  className="flex flex-col justify-center min-h-[20vh] py-3 shadow-md px-4"
                >
                  <div className="flex ">
                    <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      Entrepreneurship
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                    The entrepreneurship department is concerned with
                    stimulating innovation and developing ideas New that can
                    turn into successful projects. The section offers Consulting
                    and supporting individuals and start-ups, including setting
                    up Business plans, marketing strategies and funding
                    provision. Aims to Boost entrepreneurship and stimulate
                    economic growth by supporting pioneers Business, we seek to
                    enable individuals to realize their ambitions through
                    Provide the necessary resources and knowledge to establish
                    their own business.
                  </p>
                </div>

                {/*  */}

                <div className="h-60 w-full ">
                  <img
                    src={allDepertments} // Replace with your image path
                    alt="Studies and Consultations"
                    className="object-cover h-full w-full "
                  />
                </div>
                <div
                  dir="ltr"
                  className="flex flex-col justify-center min-h-[20vh] py-3 shadow-md px-4"
                >
                  <div className="flex ">
                    <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      Studies and Consultations
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    The Department of Studies and Consulting is dedicated to
                    conducting in-depth research and comprehensive analysis on
                    economic and market trends. This section provides
                    feasibility studies, analytical reports, and strategic
                    consulting to help companies make informed decisions. We
                    seek to provide accurate and reliable information that
                    supports business growth and helps develop effective
                    strategies.
                  </p>
                </div>

                {/* Add additional sections as needed, following the same structure */}
              </div>
            </div>
          ) : (
            <div className=" px-3 py-8 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Section */}
                <div className="h-60 w-full ">
                  <img
                    src={learn} // Replace with your image path
                    alt="التعليم والتدريب"
                    className="object-cover h-full w-full "
                  />
                </div>
                <div className="flex flex-col justify-center min-h-[20vh] py-3 shadow-md px-4">
                  <div className="flex ">
                    <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      التعليم والتدريب
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                    يركز قسم التعليم والتدريب في شركة عالم الأعمال على تطوير
                    المهارات والمعرفة اللازمة للأفراد في مجالات الأعمال
                    المختلفة. يقدم القسم برامج تدريبية متخصصة وورش عمل تهدف إلى
                    تعزيز الكفاءات الإدارية والفنية. يتضمن ذلك دورات في إدارة
                    المشاريع، التسويق، والموارد البشرية، مما يساعد المشاركين على
                    التعامل بكفاءة مع التحديات العملية وتزويدهم بالقدرات اللازمة
                    للتكيف مع متطلبات سوق العمل المتغيرة وتعزيز فرصهم المهنية.
                  </p>
                </div>

                {/* Second Section */}
                <div className="h-60 w-full ">
                  <img
                    src={management} // Replace with your image path
                    alt="إدارة المشاريع"
                    className="object-cover h-full w-full "
                  />
                </div>
                <div className="flex flex-col justify-center min-h-[20vh] py-3 shadow-md px-4">
                  <div className="flex ">
                    <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      إدارة المشاريع
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                    يختص قسم إدارة المشاريع بتزويد الشركات والأفراد بالأدوات
                    والتقنيات اللازمة لتنفيذ المشاريع بكفاءة وفاعلية. نقدم
                    استشارات متخصصة في تخطيط المشاريع، وتقييم الأداء، ويعمل
                    القسم على تطوير استراتيجيات فعالة لإدارة المخاطر، وتخصيص
                    الموارد، وضمان جودة النتائج. كما يوفر أدوات وتقنيات حديثة
                    لمساعدة المنشآت على تحقيق النجاح في مشاريعهم والمساهمة في
                    زيادة الإنتاجية.
                  </p>
                </div>

                {/*  */}

                <div className="h-60 w-full ">
                  <img
                    src={enterpurnore} // Replace with your image path
                    alt="ريادة الأعمال"
                    className="object-cover h-full w-full "
                  />
                </div>
                <div className="flex flex-col justify-center min-h-[20vh] py-3 shadow-md px-4">
                  <div className="flex ">
                    <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      ريادة الأعمال
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                    يعنى قسم ريادة الأعمال بتحفيز الابتكار وتطوير الأفكار
                    الجديدة التي يمكن أن تتحول إلى مشاريع ناجحة. يقدم القسم
                    استشارات ودعمًا للأفراد والشركات الناشئة، بما في ذلك إعداد
                    خطط العمل، واستراتيجيات التسويق، وتوفير التمويل. يهدف إلى
                    تعزيز روح المبادرة وتحفيز النمو الاقتصادي من خلال دعم رواد
                    الأعمال، ونسعى لتمكين الأفراد من تحقيق طموحاتهم من خلال
                    توفير الموارد والمعرفة اللازمة لتأسيس أعمالهم الخاصة.
                  </p>
                </div>

                {/*  */}

                <div className="h-60 w-full ">
                  <img
                    src={allDepertments} // Replace with your image path
                    alt="الدراسات والاستشارات"
                    className="object-cover h-full w-full "
                  />
                </div>
                <div className="flex flex-col justify-center min-h-[20vh] py-3 shadow-md px-4">
                  <div className="flex ">
                    <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      الدراسات والاستشارات
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                    يكرس قسم الدراسات والاستشارات جهوده لإجراء أبحاث معمقة
                    وتحليلات شاملة حول الاتجاهات الاقتصادية والسوقية. يقدم هذا
                    القسم دراسات جدوى، وتقارير تحليلية، واستشارات استراتيجية
                    لمساعدة الشركات في اتخاذ قرارات مستنيرة. نسعى لتوفير معلومات
                    دقيقة وموثوقة تدعم نمو الأعمال وتساعد في تطوير استراتيجيات
                    فعالة.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {isTabletScreen && (
        <>
          {dir === "ltr" ? (
            <div className="   mx-auto py-8 px-4 md:px-7">
              {/*  */}
              <div className="flex relative mb-6">
                {/* First Section (Image) */}

                <div dir="ltr" className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%]  right-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center py-4 shadow-md min-h-72">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Education and Training
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      Business World's Education and Training Department focuses
                      on developing People's business skills and knowledge
                      Different. The department offers specialized training
                      programs and workshops aimed at to strengthen managerial
                      and technical competencies. This includes courses in
                      Project management, marketing, and human resources, which
                      helps Participants to deal efficiently with practical
                      challenges and provide them with Capacities to adapt to
                      changing labour market requirements and enhance their
                      professional opportunities.
                    </p>
                  </div>
                </div>

                <div className="h-[500px] w-[50%] relative -z-20">
                  <img
                    src={learn} // Replace with your image path
                    alt="Education and Trainingt"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}

                {/* Add additional sections as needed */}
              </div>

              <div className="flex relative mb-6">
                {/* First Section (Image) */}

                <div dir="ltr" className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%]  right-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center py-4 shadow-md min-h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Project Management
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      The Project Management Section specializes in providing
                      companies and individuals with tools and techniques for
                      efficient and effective project implementation. We offer
                      Consultancy specialized in project planning, performance
                      evaluation, and work Department to develop effective risk
                      management strategies and customize resources, ensuring
                      the quality of results. It also provides modern tools and
                      techniques To help enterprises achieve success in their
                      projects and contribute to Increase productivity.
                    </p>
                  </div>
                </div>

                <div className="h-[500px] w-[50%] relative -z-20">
                  <img
                    src={management} // Replace with your image path
                    alt="Project Management"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}

                {/* Add additional sections as needed */}
              </div>

              <div className="flex relative mb-6">
                {/* First Section (Image) */}

                <div dir="ltr" className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%]  right-20 top-12 bg-white absolute mx-auto flex-col px-10 justify-center py-4 shadow-md min-h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Entrepreneurship
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      The entrepreneurship department is concerned with
                      stimulating innovation and developing ideas New that can
                      turn into successful projects. The section offers
                      Consulting and supporting individuals and start-ups,
                      including setting up Business plans, marketing strategies
                      and funding provision. Aims to Boost entrepreneurship and
                      stimulate economic growth by supporting pioneers Business,
                      we seek to enable individuals to realize their ambitions
                      through Provide the necessary resources and knowledge to
                      establish their own business.
                    </p>
                  </div>
                </div>

                <div className="h-[500px] w-[50%] relative -z-20">
                  <img
                    src={enterpurnore} // Replace with your image path
                    alt="Entrepreneurshipt"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}

                {/* Add additional sections as needed */}
              </div>

              <div className="flex relative mb-6">
                {/* First Section (Image) */}

                <div dir="ltr" className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%]  right-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center py-4 shadow-md min-h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Studies and Consultations
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      The Department of Studies and Consulting is dedicated to
                      conducting in-depth research and comprehensive analysis on
                      economic and market trends. This section provides
                      feasibility studies, analytical reports, and strategic
                      consulting to help companies make informed decisions. We
                      seek to provide accurate and reliable information that
                      supports business growth and helps develop effective
                      strategies.
                    </p>
                  </div>
                </div>

                <div className="h-[500px] w-[50%] relative -z-20">
                  <img
                    src={allDepertments} // Replace with your image path
                    alt="studies and consultations"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}

                {/* Add additional sections as needed */}
              </div>
            </div>
          ) : (
            <div className="   mx-auto py-8 px-4 md:px-7">
              {/*  */}
              <div className="flex min-h-56 relative mb-6">
                {/* First Section (Image) */}
                <div className="min-h-[500px] w-[50%] relative -z-20">
                  <img
                    src={learn} // Replace with your image path
                    alt="التعليم والتدريب"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}
                <div className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] left-20 top-16 bg-white absolute mx-auto flex-col px-10 py-4 justify-center shadow-md min-h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        التعليم والتدريب
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      يركز قسم التعليم والتدريب في شركة عالم الأعمال على تطوير
                      المهارات والمعرفة اللازمة للأفراد في مجالات الأعمال
                      المختلفة. يقدم القسم برامج تدريبية متخصصة وورش عمل تهدف
                      إلى تعزيز الكفاءات الإدارية والفنية. يتضمن ذلك دورات في
                      إدارة المشاريع، التسويق، والموارد البشرية، مما يساعد
                      المشاركين على التعامل بكفاءة مع التحديات العملية وتزويدهم
                      بالقدرات اللازمة للتكيف مع متطلبات سوق العمل المتغيرة
                      وتعزيز فرصهم المهنية.
                    </p>
                  </div>
                </div>

                {/* Add additional sections as needed */}
              </div>

              <div className="flex min-h-56 relative mb-6">
                {/* First Section (Image) */}
                <div className="min-h-[500px] w-[50%] relative -z-20">
                  <img
                    src={management} // Replace with your image path
                    alt="إدارة المشاريع"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}
                <div className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] left-20 top-16 bg-white absolute mx-auto flex-col px-10 py-4 justify-center shadow-md min-h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        إدارة المشاريع
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      يختص قسم إدارة المشاريع بتزويد الشركات والأفراد بالأدوات
                      والتقنيات اللازمة لتنفيذ المشاريع بكفاءة وفاعلية. نقدم
                      استشارات متخصصة في تخطيط المشاريع، وتقييم الأداء، ويعمل
                      القسم على تطوير استراتيجيات فعالة لإدارة المخاطر، وتخصيص
                      الموارد، وضمان جودة النتائج. كما يوفر أدوات وتقنيات حديثة
                      لمساعدة المنشآت على تحقيق النجاح في مشاريعهم والمساهمة في
                      زيادة الإنتاجية.
                    </p>
                  </div>
                </div>

                {/* Add additional sections as needed */}
              </div>
              <div className="flex min-h-56 relative mb-6">
                {/* First Section (Image) */}
                <div className="min-h-[500px] w-[50%] relative -z-20">
                  <img
                    src={enterpurnore} // Replace with your image path
                    alt="ريادة الأعمال"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}
                <div className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] left-20 top-16 bg-white absolute mx-auto flex-col px-10 py-4 justify-center shadow-md min-h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        ريادة الأعمال
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      يعنى قسم ريادة الأعمال بتحفيز الابتكار وتطوير الأفكار
                      الجديدة التي يمكن أن تتحول إلى مشاريع ناجحة. يقدم القسم
                      استشارات ودعمًا للأفراد والشركات الناشئة، بما في ذلك إعداد
                      خطط العمل، واستراتيجيات التسويق، وتوفير التمويل. يهدف إلى
                      تعزيز روح المبادرة وتحفيز النمو الاقتصادي من خلال دعم رواد
                      الأعمال، ونسعى لتمكين الأفراد من تحقيق طموحاتهم من خلال
                      توفير الموارد والمعرفة اللازمة لتأسيس أعمالهم الخاصة.
                    </p>
                  </div>
                </div>

                {/* Add additional sections as needed */}
              </div>
              <div className="flex min-h-56 relative mb-6">
                {/* First Section (Image) */}
                <div className="min-h-[500px] w-[50%] relative -z-20">
                  <img
                    src={allDepertments} // Replace with your image path
                    alt="الدراسات والاستشارات"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}
                <div className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] left-20 top-16 bg-white absolute mx-auto flex-col px-10 py-4 justify-center shadow-md min-h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        الدراسات والاستشارات
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      يكرس قسم الدراسات والاستشارات جهوده لإجراء أبحاث معمقة
                      وتحليلات شاملة حول الاتجاهات الاقتصادية والسوقية. يقدم هذا
                      القسم دراسات جدوى، وتقارير تحليلية، واستشارات استراتيجية
                      لمساعدة الشركات في اتخاذ قرارات مستنيرة. نسعى لتوفير
                      معلومات دقيقة وموثوقة تدعم نمو الأعمال وتساعد في تطوير
                      استراتيجيات فعالة.
                    </p>
                  </div>
                </div>

                {/* Add additional sections as needed */}
              </div>
            </div>
          )}
        </>
      )}

      {isMonitorScreen && (
        <>
          {dir === "ltr" ? (
            <div className="   mx-auto py-8 px-4 md:px-7">
              {/*  */}
              <div className="flex relative mb-6">
                {/* First Section (Image) */}

                <div dir="ltr" className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] right-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center shadow-md h-72">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Education and Training
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      Business World's Education and Training Department focuses
                      on developing People's business skills and knowledge
                      Different. The department offers specialized training
                      programs and workshops aimed at to strengthen managerial
                      and technical competencies. This includes courses in
                      Project management, marketing, and human resources, which
                      helps Participants to deal efficiently with practical
                      challenges and provide them with Capacities to adapt to
                      changing labour market requirements and enhance their
                      professional opportunities.
                    </p>
                  </div>
                </div>

                <div className="h-96 w-[50%] relative -z-20">
                  <img
                    src={learn} // Replace with your image path
                    alt="Education and Trainingt"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}

                {/* Add additional sections as needed */}
              </div>

              <div className="flex relative mb-6">
                {/* First Section (Image) */}

                <div dir="ltr" className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] right-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center shadow-md h-64">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Project Management
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      The Project Management Section specializes in providing
                      companies and individuals with tools and techniques for
                      efficient and effective project implementation. We offer
                      Consultancy specialized in project planning, performance
                      evaluation, and work Department to develop effective risk
                      management strategies and customize resources, ensuring
                      the quality of results. It also provides modern tools and
                      techniques To help enterprises achieve success in their
                      projects and contribute to Increase productivity.
                    </p>
                  </div>
                </div>

                <div className="h-96 w-[50%] relative -z-20">
                  <img
                    src={management} // Replace with your image path
                    alt="project management"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}

                {/* Add additional sections as needed */}
              </div>
              <div className="flex relative mb-6">
                {/* First Section (Image) */}

                <div dir="ltr" className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] right-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center shadow-md h-72">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Entrepreneurship
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      The entrepreneurship department is concerned with
                      stimulating innovation and developing ideas New that can
                      turn into successful projects. The section offers
                      Consulting and supporting individuals and start-ups,
                      including setting up Business plans, marketing strategies
                      and funding provision. Aims to Boost entrepreneurship and
                      stimulate economic growth by supporting pioneers Business,
                      we seek to enable individuals to realize their ambitions
                      through Provide the necessary resources and knowledge to
                      establish their own business.
                    </p>
                  </div>
                </div>

                <div className="h-96 w-[50%] relative -z-20">
                  <img
                    src={enterpurnore} // Replace with your image path
                    alt="entrepreneurship"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}

                {/* Add additional sections as needed */}
              </div>
              <div className="flex relative mb-6">
                {/* First Section (Image) */}

                <div dir="ltr" className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] right-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center shadow-md h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] mr-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Studies and Consultations
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      The Department of Studies and Consulting is dedicated to
                      conducting in-depth research and comprehensive analysis on
                      economic and market trends. This section provides
                      feasibility studies, analytical reports, and strategic
                      consulting to help companies make informed decisions. We
                      seek to provide accurate and reliable information that
                      supports business growth and helps develop effective
                      strategies.
                    </p>
                  </div>
                </div>

                <div className="h-96 w-[50%] relative -z-20">
                  <img
                    src={allDepertments} // Replace with your image path
                    alt="studies and consultations"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}

                {/* Add additional sections as needed */}
              </div>
            </div>
          ) : (
            <div className="   mx-auto py-8 px-4 md:px-7">
              {/*  */}
              <div className="flex relative mb-6">
                {/* First Section (Image) */}
                <div className="h-96 w-[50%] relative -z-20">
                  <img
                    src={learn} // Replace with your image path
                    alt="التعليم والتدريب"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}
                <div className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] left-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center shadow-md h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        التعليم والتدريب
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      يركز قسم التعليم والتدريب في شركة عالم الأعمال على تطوير
                      المهارات والمعرفة اللازمة للأفراد في مجالات الأعمال
                      المختلفة. يقدم القسم برامج تدريبية متخصصة وورش عمل تهدف
                      إلى تعزيز الكفاءات الإدارية والفنية. يتضمن ذلك دورات في
                      إدارة المشاريع، التسويق، والموارد البشرية، مما يساعد
                      المشاركين على التعامل بكفاءة مع التحديات العملية وتزويدهم
                      بالقدرات اللازمة للتكيف مع متطلبات سوق العمل المتغيرة
                      وتعزيز فرصهم المهنية.
                    </p>
                  </div>
                </div>

                {/* Add additional sections as needed */}
              </div>

              <div className="flex relative mb-6">
                {/* First Section (Image) */}
                <div className="h-96 w-[50%] relative -z-20">
                  <img
                    src={management} // Replace with your image path
                    alt="إدارة المشاريع"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}
                <div className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] left-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center shadow-md h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        إدارة المشاريع
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      يختص قسم إدارة المشاريع بتزويد الشركات والأفراد بالأدوات
                      والتقنيات اللازمة لتنفيذ المشاريع بكفاءة وفاعلية. نقدم
                      استشارات متخصصة في تخطيط المشاريع، وتقييم الأداء، ويعمل
                      القسم على تطوير استراتيجيات فعالة لإدارة المخاطر، وتخصيص
                      الموارد، وضمان جودة النتائج. كما يوفر أدوات وتقنيات حديثة
                      لمساعدة المنشآت على تحقيق النجاح في مشاريعهم والمساهمة في
                      زيادة الإنتاجية.
                    </p>
                  </div>
                </div>

                {/* Add additional sections as needed */}
              </div>

              <div className="flex relative mb-6">
                {/* First Section (Image) */}
                <div className="h-96 w-[50%] relative -z-20">
                  <img
                    src={enterpurnore} // Replace with your image path
                    alt="ريادة الأعمال"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}
                <div className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] left-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center shadow-md h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        ريادة الأعمال
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      يعنى قسم ريادة الأعمال بتحفيز الابتكار وتطوير الأفكار
                      الجديدة التي يمكن أن تتحول إلى مشاريع ناجحة. يقدم القسم
                      استشارات ودعمًا للأفراد والشركات الناشئة، بما في ذلك إعداد
                      خطط العمل، واستراتيجيات التسويق، وتوفير التمويل. يهدف إلى
                      تعزيز روح المبادرة وتحفيز النمو الاقتصادي من خلال دعم رواد
                      الأعمال، ونسعى لتمكين الأفراد من تحقيق طموحاتهم من خلال
                      توفير الموارد والمعرفة اللازمة لتأسيس أعمالهم الخاصة.
                    </p>
                  </div>
                </div>

                {/* Add additional sections as needed */}
              </div>

              <div className="flex relative mb-6">
                {/* First Section (Image) */}
                <div className="h-96 w-[50%] relative -z-20">
                  <img
                    src={allDepertments} // Replace with your image path
                    alt="الدراسات والاستشارات"
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Second Section (Text Content) */}
                <div className="w-[50%] relative z-10 ">
                  <div className="flex w-[100%] left-20 top-16 bg-white absolute mx-auto flex-col px-10 justify-center shadow-md h-60">
                    <div className="flex ">
                      <div className="w-3 h-10 rounded-md bg-[#CCA972] ml-2 bg-gradient-to-r from-[#A27942] "></div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        الدراسات والاستشارات
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 text-justify leading-[25px]">
                      يكرس قسم الدراسات والاستشارات جهوده لإجراء أبحاث معمقة
                      وتحليلات شاملة حول الاتجاهات الاقتصادية والسوقية. يقدم هذا
                      القسم دراسات جدوى، وتقارير تحليلية، واستشارات استراتيجية
                      لمساعدة الشركات في اتخاذ قرارات مستنيرة. نسعى لتوفير
                      معلومات دقيقة وموثوقة تدعم نمو الأعمال وتساعد في تطوير
                      استراتيجيات فعالة.
                    </p>
                  </div>
                </div>

                {/* Add additional sections as needed */}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
