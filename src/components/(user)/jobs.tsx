import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Clock10,
  FileArchive,
  MoveLeft,
  MoveRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getApi } from "src/lib/http";
import { Button } from "src/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import JobNotFound from "src/assets/icons/job-not-found";
type joinUsRespon = {
  id: number;
  ar_jobTitle: string;
  en_jobTitle: string;
  img: string;
  avaliable: boolean;
  publish: boolean;
  ar_basicDescription: string;
  en_basicDescription: string;
  ar_skiles: string[];
  en_skiles: string[];
  ar_advances: string[];
  en_advances: string[];
  formLink: string;
  endDate: Date;
};
export default function Jobs() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  // Handle availability checkbox change
  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(e.target.value === "available"); // Update isAvailable based on selected value
  };

  // Handle sorting (newest/oldest) radio button change
  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAscending(e.target.value === "newest");
  };
  const { data: joinUs } = useQuery({
    queryKey: ["JoinUs", searchQuery, isAvailable, isAscending],
    queryFn: () =>
      getApi<joinUsRespon[]>(
        `/api/website/JoinUs?query=${searchQuery}&avaliable=${isAvailable}&ascending=${isAscending}`
      ),
  });

  const itemsPerPage = 3;
  const totalItems = joinUs?.data.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Current page state
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = joinUs?.data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Pagination button logic
  const getPaginationNumbers = () => {
    const pages = [];
    const maxPageButtons = 3;

    if (totalPages <= maxPageButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <>
      {dir === "ltr" ? (
        <div>
          <div className="sm:h-10 md:h-0 sm:flex sm:px-5 sm:translate-y-4">
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden sm:static border-[#434749]"
                >
                  <SlidersHorizontal fill="#434749" stroke="#434749" />
                  <span className="px-1">Filter</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="w-fit max-w-lg bg-white">
                <DrawerHeader className="flex justify-between p-4">
                  <DrawerTitle className="text-lg font-bold">
                    Filter
                  </DrawerTitle>
                  <DrawerClose>
                    <X className="w-5 h-5 text-gray-600" />
                  </DrawerClose>
                </DrawerHeader>

                <div className="p-6 overflow-y-auto">
                  <div className="w-full h-[1px] bg-[#F0F1F5]"></div>
                  <div className="flex items-center max-w-sm mx-auto mt-6">
                    <label className="sr-only">Search</label>
                    <div dir="ltr" className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Search />
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        value={searchQuery}
                        onChange={handleSearchChange} // Update search query state
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#997740] focus:border-[#997740] block w-80 ps-10 p-2.5"
                        placeholder="Search by job name..."
                        required
                      />
                    </div>
                  </div>
                  <div dir="ltr" className="px-4 mt-4">
                    <h3>Publication</h3>
                    <div className="flex items-center mb-4 mt-4">
                      <input
                        id="oldest"
                        type="radio"
                        name="sort"
                        value="oldest"
                        checked={!isAscending} // Bind to state
                        onChange={handleSortChange} // Update sorting state
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="oldest"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        oldest
                      </label>
                    </div>
                    <div className="flex items-center mb-4 mt-4">
                      <input
                        id="newest"
                        type="radio"
                        name="sort"
                        value="newest"
                        checked={isAscending} // Bind to state
                        onChange={handleSortChange} // Update sorting state
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="newest"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        newest
                      </label>
                    </div>
                  </div>

                  {/*  */}

                  <div dir="ltr" className="px-4 mt-4">
                    <h3>Job Availability</h3>
                    <div className="flex items-center mb-4 mt-4">
                      <input
                        id="available"
                        type="radio"
                        name="availability"
                        value="available"
                        checked={isAvailable} // Bind to state
                        onChange={handleAvailabilityChange} // Update availability state
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        className="ms-2 text-sm font-medium text-gray-900"
                        htmlFor="available"
                      >
                        available
                      </label>
                    </div>

                    <div className="flex items-center mb-4 mt-4">
                      <input
                        id="notAvailable"
                        type="radio"
                        name="availability"
                        value="notAvailable"
                        checked={!isAvailable} // Bind to state
                        onChange={handleAvailabilityChange} // Update availability state
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        className="ms-2 text-sm font-medium text-gray-900"
                        htmlFor="notAvailable"
                      >
                        notAvailable
                      </label>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="w-full lg:h-[100vh] flex px-4 mt-5">
            {/* Main content */}
            <div dir="ltr" className=" md:w-[70%] sm:w-[100%] h-full  ">
              {currentItems && currentItems.length > 0 ? (
                <div className=" h-full w-full ">
                  {/* this is working */}
                  {/* Displaying the jobs */}
                  <div className="">
                    {currentItems?.map((item) => (
                      <div
                        className="w-[100%] h-[100%] mt-8 bg-white border-2 border-gray-300 px-3 py-2 rounded-lg "
                        key={item.id}
                      >
                        <a href={`/job-details/${item.id}`}>
                          <div className=" w-full  flex items-center ">
                            <h1 className="text-2xl">{item.en_jobTitle}</h1>

                            <div className=" pb-2 text-end translate-y-3">
                              {item.avaliable === true ? (
                                <span className="inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#69DB57] ml-2 mb-2">
                                  available
                                </span>
                              ) : (
                                <span className="inline-block bg-[#FFEDED] rounded-[5px] px-5  text-sm font-semibold text-[#E05151] ml-2 mb-2">
                                  notAvailable
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center mt-2 h-6">
                            <div className="flex">
                              <FileArchive className="mr-2" />
                              <h6>{item.id}</h6>
                            </div>
                            <div className="flex ml-2">
                              <Clock10 className="mr-2" />
                              <h6>full time</h6>
                            </div>
                            <div className="flex ml-2">
                              <Calendar className="mr-2" />
                              <h6>{String(item.endDate)}</h6>
                            </div>
                          </div>
                          <div className="flex items-center mt-5">
                            <p className="text-[#5B5B5B] job">
                              {item.en_basicDescription}
                            </p>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Pagination controls */}
                  <div className="mt-4 flex justify-between space-x-2 ">
                    <button
                      className="md:px-4 md:py-2 sm:px-4 sm:py-2 sm:h-10 flex items-center border border-black text-black rounded-md hover:bg-[#d5ae78] hover:text-white"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <MoveLeft className="mr-2" />
                      <h6>prev</h6>
                    </button>

                    <div className="  md:pr-0 sm:pr-5">
                      {getPaginationNumbers().map((page, index) => (
                        <button
                          key={index}
                          className={`px-4 py-2 rounded ml-1 ${
                            currentPage === page
                              ? "bg-[#d5ae78] rounded-md  text-white"
                              : "bg-white border border-black  rounded-md text-black hover:bg-[#d5ae78] hover:text-white"
                          }`}
                          onClick={() =>
                            typeof page === "number" && paginate(page)
                          }
                          disabled={typeof page !== "number"}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="md:px-4 md:py-2 sm:px-4 sm:py-2 sm:h-10  border flex border-black text-black rounded-md hover:bg-[#d5ae78] hover:text-white"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <h6>next</h6>
                      <MoveRight size={20} className="ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className=" h-full w-full flex justify-center items-center">
                  <div className=" text-center">
                    <JobNotFound />
                    <p>
                      There is no result of your search, try another job search
                    </p>
                  </div>
                </div>
              )}

              {/* ----------------------------------- */}
              {/* <div className=" h-full w-full flex justify-center items-center">
          <div>
            <NotFoundSearch />
            <h1 className="text-center mt-8 text-shadow">
              لا توجد نتيجة لبحثك , جرب البحث عن وظيفة اخرى
            </h1>
          </div>
        </div> */}
            </div>

            {/* Sidebar */}
            <div className="md:block sm:hidden w-[30%] h-full   ">
              <div className="w-[95%] h-full border border-gray-200 px-4 float-end rounded-lg shadow-md">
                {/*  */}
                <div className="flex items-center max-w-sm mx-auto mt-6">
                  <label className="sr-only">Search</label>
                  <div dir="ltr" className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <Search />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      value={searchQuery}
                      onChange={handleSearchChange} // Update search query state
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#997740] focus:border-[#997740] block w-full ps-10 p-2.5"
                      placeholder="Search by job name..."
                      required
                    />
                  </div>
                </div>
                {/*  */}

                <div dir="ltr" className="px-4 mt-4">
                  <h3>Publication</h3>

                  <div className="flex items-center mb-4 mt-4">
                    <input
                      id="oldest"
                      type="radio"
                      name="sort"
                      value="oldest"
                      checked={!isAscending} // Bind to state
                      onChange={handleSortChange} // Update sorting state
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="oldest"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      oldest
                    </label>
                  </div>
                  <div className="flex items-center mb-4 mt-4">
                    <input
                      id="newest"
                      type="radio"
                      name="sort"
                      value="newest"
                      checked={isAscending} // Bind to state
                      onChange={handleSortChange} // Update sorting state
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="newest"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      newest
                    </label>
                  </div>
                </div>

                {/*  */}

                <div dir="ltr" className="px-4 mt-4">
                  <h3>Job Availability</h3>
                  <div className="flex items-center mb-4 mt-4">
                    <input
                      id="available"
                      type="radio"
                      name="availability"
                      value="available"
                      checked={isAvailable} // Bind to state
                      onChange={handleAvailabilityChange} // Update availability state
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      className="ms-2 text-sm font-medium text-gray-900"
                      htmlFor="available"
                    >
                      available
                    </label>
                  </div>

                  <div className="flex items-center mb-4 mt-4">
                    <input
                      id="notAvailable"
                      type="radio"
                      name="availability"
                      value="notAvailable"
                      checked={!isAvailable} // Bind to state
                      onChange={handleAvailabilityChange} // Update availability state
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      className="ms-2 text-sm font-medium text-gray-900"
                      htmlFor="notAvailable"
                    >
                      notAvailable
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="sm:h-10 md:h-0 sm:flex sm:justify-end sm:px-5 sm:translate-y-4">
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden sm:static border-[#434749] "
                >
                  <SlidersHorizontal fill="#434749" stroke="#434749" />
                  <span className="px-1">فلترة</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="w-fit max-w-lg bg-white">
                <DrawerHeader className="flex justify-between p-4">
                  <DrawerTitle className="text-lg font-bold">فلترة</DrawerTitle>
                  <DrawerClose>
                    <X className="w-5 h-5 text-gray-600" />
                  </DrawerClose>
                </DrawerHeader>

                <div className="p-6 overflow-y-auto">
                  <div className="w-full h-[1px] bg-[#F0F1F5]"></div>
                  <div className="flex items-center max-w-sm mx-auto mt-6">
                    <label className="sr-only">Search</label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Search />
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        value={searchQuery}
                        onChange={handleSearchChange} // Update search query state
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#997740] focus:border-[#997740] block w-80 ps-10 p-2.5"
                        placeholder="ابحث باسم الوظيفة ..."
                        required
                      />
                    </div>
                  </div>
                  <div className="px-4 mt-4">
                    <h3>تاريخ النشر</h3>
                    <div className="flex items-center mb-4 mt-4">
                      <input
                        id="newest"
                        type="radio"
                        name="sort"
                        value="newest"
                        checked={isAscending} // Bind to state
                        onChange={handleSortChange} // Update sorting state
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="newest"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        الاحدث
                      </label>
                    </div>

                    <div className="flex items-center mb-4 mt-4">
                      <input
                        id="oldest"
                        type="radio"
                        name="sort"
                        value="oldest"
                        checked={!isAscending} // Bind to state
                        onChange={handleSortChange} // Update sorting state
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="oldest"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        الاقدم
                      </label>
                    </div>
                  </div>

                  {/*  */}

                  <div className="px-4 mt-4">
                    <h3>حالة الوظيفة</h3>
                    <div className="flex items-center mb-4 mt-4">
                      <input
                        id="available"
                        type="radio"
                        name="availability"
                        value="available"
                        checked={isAvailable} // Bind to state
                        onChange={handleAvailabilityChange} // Update availability state
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        className="ms-2 text-sm font-medium text-gray-900"
                        htmlFor="available"
                      >
                        المتاحة
                      </label>
                    </div>

                    <div className="flex items-center mb-4 mt-4">
                      <input
                        id="notAvailable"
                        type="radio"
                        name="availability"
                        value="notAvailable"
                        checked={!isAvailable} // Bind to state
                        onChange={handleAvailabilityChange} // Update availability state
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        className="ms-2 text-sm font-medium text-gray-900"
                        htmlFor="notAvailable"
                      >
                        الغير متاحة
                      </label>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="w-full lg:h-[100vh] flex px-4 mt-5">
            {/* Sidebar */}
            <div className="md:block sm:hidden w-[30%] h-full ">
              <div className="w-[95%] h-full border border-gray-200 px-4 rounded-lg shadow-md">
                {/*  */}
                <div className="flex items-center max-w-sm mx-auto mt-6">
                  <label className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <Search />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      value={searchQuery}
                      onChange={handleSearchChange} // Update search query state
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#997740] focus:border-[#997740] block w-full ps-10 p-2.5"
                      placeholder="ابحث باسم الوظيفة ..."
                      required
                    />
                  </div>
                </div>
                {/*  */}

                <div className="px-4 mt-4">
                  <h3>تاريخ النشر</h3>

                  <div className="flex items-center mb-4 mt-4">
                    <input
                      id="oldest"
                      type="radio"
                      name="sort"
                      value="oldest"
                      checked={!isAscending} // Bind to state
                      onChange={handleSortChange} // Update sorting state
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="oldest"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      الاقدم
                    </label>
                  </div>

                  <div className="flex items-center mb-4 mt-4">
                    <input
                      id="newest"
                      type="radio"
                      name="sort"
                      value="newest"
                      checked={isAscending} // Bind to state
                      onChange={handleSortChange} // Update sorting state
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="newest"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      الاحدث
                    </label>
                  </div>
                </div>

                {/*  */}

                <div className="px-4 mt-4">
                  <h3>حالة الوظيفة</h3>
                  <div className="flex items-center mb-4 mt-4">
                    <input
                      id="available"
                      type="radio"
                      name="availability"
                      value="available"
                      checked={isAvailable} // Bind to state
                      onChange={handleAvailabilityChange} // Update availability state
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      className="ms-2 text-sm font-medium text-gray-900"
                      htmlFor="available"
                    >
                      المتاحة
                    </label>
                  </div>

                  <div className="flex items-center mb-4 mt-4">
                    <input
                      id="notAvailable"
                      type="radio"
                      name="availability"
                      value="notAvailable"
                      checked={!isAvailable} // Bind to state
                      onChange={handleAvailabilityChange} // Update availability state
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      className="ms-2 text-sm font-medium text-gray-900"
                      htmlFor="notAvailable"
                    >
                      الغير متاحة
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className=" md:w-[70%] sm:w-[100%] h-full  ">
              {currentItems && currentItems.length > 0 ? (
                <div className=" h-full w-full ">
                  {/* this is working */}
                  {/* Displaying the jobs */}
                  <div className="">
                    {currentItems?.map((item) => (
                      <div
                        className="w-[100%] h-[100%] mt-8 bg-white border-2 border-gray-300 px-3 py-2 rounded-lg "
                        key={item.id}
                      >
                        <a href={`/job-details/${item.id}`}>
                          <div className=" w-full  flex items-center ">
                            <h1 className="text-2xl">{item.ar_jobTitle}</h1>

                            <div className=" pb-2 text-end translate-y-3">
                              {item.avaliable === true ? (
                                <span className="inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-5  text-sm font-semibold text-[#69DB57] mr-2 mb-2">
                                  متاحة
                                </span>
                              ) : (
                                <span className="inline-block bg-[#FFEDED] rounded-[5px] px-5  text-sm font-semibold text-[#E05151] mr-2 mb-2">
                                  غير متاحة
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center mt-2 h-6">
                            <div className="flex">
                              <FileArchive className="ml-2" />
                              <h6>{item.id}</h6>
                            </div>
                            <div className="flex mr-2">
                              <Clock10 className="ml-2" />
                              <h6>دوام كامل</h6>
                            </div>
                            <div className="flex mr-2">
                              <Calendar className="ml-2" />
                              <h6>{String(item.endDate)}</h6>
                            </div>
                          </div>
                          <div className="flex items-center mt-5">
                            <p className="text-[#5B5B5B] job">
                              {item.ar_basicDescription}
                            </p>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Pagination controls */}
                  <div className="mt-4 flex justify-between space-x-2 ">
                    <button
                      className="md:px-4 md:py-2 sm:px-4 sm:py-2 sm:h-10 flex items-center border border-black text-black rounded-md hover:bg-[#d5ae78] hover:text-white"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <MoveRight size={20} className="ml-2" />
                      <h6>السابق</h6>
                    </button>

                    <div className="  md:pr-0 sm:pr-5">
                      {getPaginationNumbers().map((page, index) => (
                        <button
                          key={index}
                          className={`px-4 py-2 rounded ml-1 ${
                            currentPage === page
                              ? "bg-[#d5ae78] rounded-md  text-white"
                              : "bg-white border border-black  rounded-md text-black hover:bg-[#d5ae78] hover:text-white"
                          }`}
                          onClick={() =>
                            typeof page === "number" && paginate(page)
                          }
                          disabled={typeof page !== "number"}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="md:px-4 md:py-2 sm:px-4 sm:py-2 sm:h-10  border flex border-black text-black rounded-md hover:bg-[#d5ae78] hover:text-white"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <h6>التالي</h6>
                      <MoveLeft className="mr-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className=" h-full w-full flex justify-center items-center">
                  <div className=" text-center">
                    <JobNotFound />
                    <p>لا توجد نتيجة لبحثك , جرب البحث عن وظيفة اخرى</p>
                  </div>
                </div>
              )}

              {/* ----------------------------------- */}
              {/* <div className=" h-full w-full flex justify-center items-center">
          <div>
            <NotFoundSearch />
            <h1 className="text-center mt-8 text-shadow">
              لا توجد نتيجة لبحثك , جرب البحث عن وظيفة اخرى
            </h1>
          </div>
        </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
