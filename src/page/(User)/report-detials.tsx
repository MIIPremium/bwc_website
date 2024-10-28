import React from "react";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";
import mainImgUrl from "../../assets/img/report-details-image.png";
import { ReactComponent as TranslateIcon } from "../../assets/icons/translate-icon.svg";
import CalendarIcon from "../../assets/icons/calendar-icon";
import ClockCircle from "../../assets/icons/clock-circle";
import Author from "../../components/(user)/author";
import { MoveLeft, MoveRight } from "lucide-react";
import AuthorCard from "../../components/(user)/author-card";
import NewsList from "../../components/(user)/news-list";
import { useParams } from "react-router-dom";
export default function ReportDetials() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
        <Navbar />
      </div>
      <div className=" min-h-screen md:p-4">
        {/* Main Content Section */}
        <main className="md:max-w-[90vw] mx-auto  md:p-6">
          <h1 className=" text-[36px] font-bold mb-[43px] flex items-center gap-x-2">
            <span className="bg-[#CCA972] h-10 w-[10px] rounded-full "></span>
            <span>التقارير</span>
          </h1>
          <h1 className=" text-2xl font-bold mb-[43px]">
            التنمية قادمة: توخوا الحذر في تطلعاتكم
          </h1>
          {/* Image Section */}
          <div className="mb-8 relative min-h-[652px] ">
            <img
              src={mainImgUrl} // Replace with actual image path
              alt="Report cover"
              className="w-full absolute md:static object-cover h-full"
            />
          </div>
          <div className="grid grid-cols-6 gap-x-2 gap-y-2">
            <div className=" col-span-6 md:col-span-4 ">
              <div className="flex flex-col md:flex-row justify-between md:h-[70px] bg-[#D5AE78] items-center mb-4 rounded-lg">
                <div className="flex items-center gap-x-2 py-5 ps-8">
                  <div className="flex items-center gap-x-2">
                    <CalendarIcon />
                    <span>قبل 22 ساعه</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <ClockCircle />
                    <span>وقت القراءة: 00:08:40</span>
                  </div>
                </div>
                <button className="bg-[#C4A171]  md:h-[68px] w-full md:w-fit flex items-center place-content-center gap-x-2  text-black px-4 py-2 rounded-[8px]">
                  <span>Read this in English</span>
                  <TranslateIcon />
                </button>
              </div>
              {/*-------- author ------------- */}
              <div>
                <Author />
              </div>
              {/* ------- Content index ----------- */}
              <div className="mt-[33px] mb-[56px]">
                <h2 className="text-xl font-bold mb-5">فهرس المحتوى</h2>
                <ul className="list-disc list-inside text-gray-700">
                  <li>العنصر الأول</li>
                  <li>العنصر الثاني</li>
                  <li>العنصر الثالث</li>
                  <li>العنصر الرابع</li>
                  <li>العنصر الخامس</li>
                </ul>
              </div>
              {/* ------ Report description ----------- */}
              <div className="mb-[47px]">
                <h2 className="text-xl font-bold mb-5">وصف التقرير</h2>
                <p>
                  هيمنت التوترات في معسكر التحالف الذي تقوده السعودية على المشهد
                  السياسي طوال فترة الصيف، في ظل التنافس بين السعودية الإمارات
                  الذي يستمر في إضعاف موقف الحكومة المعترف بها دوليًا. تُعد
                  محافظة حضرموت الشاسعة شرقي اليمن التي تشترك بحدودها مع
                  السعودية ساحة هذا التنافس في المشهد الراهن، حيث شهدت موجات من
                  الاضطرابات السياسية والعسكرية. من جهة أخرى، شهدتمحادثات
                  السعودية مع جماعة الحوثيين (أنصار الله) جمودًا في الأسابيع
                  الماضية على ضوء استمرار نقاط خلافية حول بعض الملفات منها وضع
                  المملكة كطرف في الحرب وسداد رواتب موظفي القطاع العام.
                </p>
              </div>
              {/* ------ Executive summary ----------- */}
              <div className="mb-[47px]">
                <h2 className="text-xl font-bold mb-5">ملخص تنفيذي</h2>
                <p>
                  هيمنت التوترات في معسكر التحالف الذي تقوده السعودية على المشهد
                  السياسي طوال فترة الصيف، في ظل التنافس بين السعودية الإمارات
                  الذي يستمر في إضعاف موقف الحكومة المعترف بها دوليًا. تُعد
                  محافظة حضرموت الشاسعة شرقي اليمن التي تشترك بحدودها مع
                  السعودية ساحة هذا التنافس في المشهد الراهن، حيث شهدت موجات من
                  الاضطرابات السياسية والعسكرية. من جهة أخرى، شهدتمحادثات
                  السعودية مع جماعة الحوثيين (أنصار الله) جمودًا في الأسابيع
                  الماضية على ضوء استمرار نقاط خلافية حول بعض الملفات منها وضع
                  المملكة كطرف في الحرب وسداد رواتب موظفي القطاع العام.
                </p>
              </div>
              {/* ------ note ----------- */}
              <div className="mb-[47px]">
                <h2 className="text-xl font-bold mb-5">ملاحظة</h2>
                <p>
                  هيمنت التوترات في معسكر التحالف الذي تقوده السعودية على المشهد
                  السياسي طوال فترة الصيف، في ظل التنافس بين السعودية الإمارات
                  الذي يستمر في إضعاف موقف الحكومة المعترف بها دوليًا. تُعد
                  محافظة حضرموت الشاسعة شرقي اليمن التي تشترك بحدودها مع
                  السعودية ساحة هذا التنافس في المشهد الراهن، حيث شهدت موجات من
                  الاضطرابات السياسية والعسكرية. من جهة أخرى، شهدتمحادثات
                  السعودية مع جماعة الحوثيين (أنصار الله) جمودًا في الأسابيع
                  الماضية على ضوء استمرار نقاط خلافية حول بعض الملفات منها وضع
                  المملكة كطرف في الحرب وسداد رواتب موظفي القطاع العام.
                </p>
              </div>
              {/* ----- download ------ */}

              <div className="w-full flex justify-center">
                <div className="relative mx-3 md:mx-0 h-[188.93px] max-w-[733px] w-full origin-bottom rounded-lg overflow-clip bg-black ">
                  <img
                    src={mainImgUrl} // Replace with actual image path
                    alt="Report cover"
                    className="w-full absolute  object-cover h-full opacity-55 blur-sm "
                  />
                  <div className="z-50 absolute flex flex-col items-center justify-center w-full h-full">
                    <span className="text-[22px] md:text-[28px] font-bold text-white mb-3 ">
                      التنمية قادمة: توخوا الحذر في تطلعاتكم
                    </span>
                    <button className="bg-white shadow-md py-2 px-14 text-xl font-bold rounded-full text-[#CCA972]">
                      تحميل
                    </button>
                  </div>
                </div>
              </div>
              {/* ------ Pagination Section ------*/}
              <div className="flex justify-between items-center mt-8 max-w-7xl mx-auto">
                <button className=" flex items-center gap-x-1 border text-black px-4 py-2 rounded-[9px]">
                  <MoveRight />
                  <span>السابق</span>
                </button>
                <button className=" flex items-center gap-x-1 border text-black px-4 py-2 rounded-[9px]">
                  <span>التالي</span>
                  <MoveLeft />
                </button>
              </div>
              <div className="w-full border-t my-14"></div>
              <AuthorCard />
            </div>
            <div className=" hidden md:block col-span-6 md:col-span-2 h-10">
              {/* last news here */}
              <div className="md:h-[70px] bg-[#D5AE78] rounded-lg flex items-center ps-4">
                <h2 className="text-2xl font-bold">اقرأ أيضًا</h2>
              </div>
              <NewsList />
            </div>
          </div>
        </main>
      </div>
      <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
// {/* Article details */}
// <div className="flex justify-between items-center mb-4">
// <p className="text-gray-500">محمود الطاهري | أحمد سيف</p>
// <p className="text-gray-500">وقت القراءة: 00:08:40 | قبل 22 ساعة</p>
// </div>

// {/* Download & Language Option */}
// <div className="flex justify-between items-center mb-8">
// <button className="bg-yellow-500 text-white px-4 py-2 rounded">Read this in English</button>
// <button className="bg-yellow-500 text-white px-4 py-2 rounded">تحميل</button>
// </div>

// {/* Table of Contents */}
// <div className="bg-gray-100 p-4 mb-8 rounded-md">
// <h2 className="font-bold text-xl mb-4">فهرس المحتوى</h2>
// <ul className="list-disc list-inside text-gray-700">
//   <li>العنصر الأول</li>
//   <li>العنصر الثاني</li>
//   <li>العنصر الثالث</li>
//   <li>العنصر الرابع</li>
//   <li>العنصر الخامس</li>
// </ul>
// </div>

// {/* Report Text */}
// <section>
// <h2 className="font-bold text-xl mb-4">وصف التقرير</h2>
// <p className="text-gray-700 leading-relaxed mb-8">
//   النص هنا حول التقرير الذي قام بتوضيح التحديات على المستوى السياسي خلال فترة التصنيف في الدول العربية...
// </p>

// <h2 className="font-bold text-xl mb-4">ملخص التقرير</h2>
// <p className="text-gray-700 leading-relaxed mb-8">
//   النص هنا حول ملخص التقرير وعلاقته بالدور السياسي والاقتصادي...
// </p>

// <h2 className="font-bold text-xl mb-4">ملخص النتائج</h2>
// <p className="text-gray-700 leading-relaxed mb-8">
//   النص هنا حول ملخص النتائج وكيفية تطبيقها في المستقبل القريب...
// </p>
// </section>

// {/* Note Section */}
// <div className="bg-gray-200 p-4 rounded-md mb-8">
// <h2 className="font-bold text-xl mb-4">ملاحظة</h2>
// <p className="text-gray-700 leading-relaxed">
//   تم التنبيه إلى ضرورة الحذر في مسألة التصنيف...
// </p>
// </div>
// {/* Pagination Section */}
// <div className="flex justify-between items-center mt-8 max-w-7xl mx-auto">
// <button className="bg-gray-300 text-black px-4 py-2 rounded">العودة</button>
// <button className="bg-gray-300 text-black px-4 py-2 rounded">التالي</button>
// </div>
