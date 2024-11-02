import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/ui/select";

interface YearItem {
  year: string;
  date: string;
  content: string;
}

const data: YearItem[] = [
  {
    year: "2024",
    date: "3 مايو",
    content:
      "دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... ",
  },
  {
    year: "2023",
    date: "3 مايو",
    content:
      "دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... ",
  },
  // Add more items to make it 30 objects
  ...Array.from({ length: 28 }).map((_, index) => ({
    year: index % 2 === 0 ? "2024" : "2023",
    date: `3 مايو`,
    content: `دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية...  دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... - ${
      index + 3
    }`,
  })),
];

export default function ArchiveIndex() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [filterYear, setFilterYear] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedCount, setDisplayedCount] = useState(10);

  const handleYearFilterChange = (year: string) => {
    setFilterYear(year);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleShowMore = () => {
    setDisplayedCount((prev) => prev + 10);
  };

  const filteredData = data
    .filter((item) => (filterYear ? item.year === filterYear : true))
    .filter((item) =>
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Sort data by year in descending order
  const sortedData = filteredData.sort((a, b) => b.year.localeCompare(a.year));

  // Group data by year
  const groupedData = sortedData.reduce(
    (acc: { [key: string]: YearItem[] }, item) => {
      if (!acc[item.year]) {
        acc[item.year] = [];
      }
      acc[item.year].push(item);
      return acc;
    },
    {}
  );

  const displayedData = Object.entries(groupedData).map(([year, items]) => ({
    year,
    items: items.slice(0, displayedCount),
  }));

  return (
    <div>
      <div className="w-full lg:h-[8vh] md:h-[8vh] sm:h-[11vh]">
        <Navbar />
      </div>
      {dir === "ltr" ? (
        <div className="min-h-[150vh]  mt-10 p-6 ">
          <div className="bg-white rounded-lg  p-4 mb-6">
            <div className="grid grid-cols-4  gap-3 mt-3">
              <div className="col-span-4 md:col-span-1 flex justify-between gap-4">
                {/* <Select dir="ltr" onValueChange={handleAscendingChange}>
                  <SelectTrigger className="w-[48%] rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <SelectValue placeholder="select Publication order" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="oldest">oldest</SelectItem>
                    <SelectItem value="newest">newest</SelectItem>
                  </SelectContent>
                </Select> */}
                <Select dir="ltr">
                  <SelectTrigger className="w-[48%] float-start rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <SelectValue placeholder="Filter by Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="publish">publish</SelectItem>
                    <SelectItem value="news">news</SelectItem>
                    <SelectItem value="analysis">analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-4 md:col-span-2">
                {/* <Input
                  dir="ltr"
                  type="text"
                  id="simple-search"
                  // value={searchQuery}
                  // onChange={handleSearchChange} // Update state as the user types
                  // onKeyDown={handleKeyDown}
                  className="rounded-[32.5px]"
                  placeholder="Search by the name of the publication"
                /> */}
              </div>

              <div className="col-span-4 md:col-span-1"></div>
            </div>
          </div>

          <div
            dir="ltr"
            className="bg-white rounded-lg shadow-md border-[1px] border-[#E5E5E5]"
          >
            {displayedData.map(({ year, items }) => (
              <div key={year} className="mb-6">
                <div className="flex flex-row justify-between items-center bg-white p-4 ">
                  <div className=" font-semibold text-5xl text-[#D5AE78]">
                    {year}
                  </div>
                  <div className="text-lg  h-8 font-semibold bg-[#757575] text-white rounded-lg px-3 ">
                    {items.length}
                  </div>
                </div>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                  >
                    <div className="flex flex-col items-center justify-center w-32 border-r-2 border-[#C7C7C7]">
                      <div className="font-black text-[#D5AE78] text-xl">
                        {item.year} {item.date}
                      </div>
                    </div>
                    <div className="text-gray-800 sm:line-clamp-2 md:line-clamp-1 text-start mr-1 text-xl w-full font-medium">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {displayedCount < filteredData.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="bg-[#D5AE78] text-white text-lg font-black px-4 py-2 rounded-md"
              >
                show more
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-[150vh]  mt-10 p-6 ">
          <div className="bg-white rounded-lg  p-4 mb-6">
            <div className="grid grid-cols-4  gap-3 mt-3">
              <div className="col-span-4 md:col-span-1 flex justify-between gap-4">
                {/* <Select dir="ltr" onValueChange={handleAscendingChange}>
                  <SelectTrigger className="w-[48%] rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <SelectValue placeholder="select Publication order" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="oldest">oldest</SelectItem>
                    <SelectItem value="newest">newest</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>

              <div className="col-span-4 md:col-span-2">
                {/* <Input
                  dir="ltr"
                  type="text"
                  id="simple-search"
                  // value={searchQuery}
                  // onChange={handleSearchChange} // Update state as the user types
                  // onKeyDown={handleKeyDown}
                  className="rounded-[32.5px]"
                  placeholder="Search by the name of the publication"
                /> */}
              </div>

              <div className="col-span-4 md:col-span-1">
                <Select dir="rtl">
                  <SelectTrigger className="w-[48%] float-end rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <SelectValue placeholder="فلتر السنة" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="publish">publish</SelectItem>
                    <SelectItem value="news">news</SelectItem>
                    <SelectItem value="analysis">analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border-[1px] border-[#E5E5E5]">
            {displayedData.map(({ year, items }) => (
              <div key={year} className="mb-6">
                <div className="flex flex-row justify-between items-center bg-white p-4 ">
                  <div className=" font-semibold text-5xl text-[#D5AE78]">
                    {year}
                  </div>
                  <div className="text-lg  h-8 font-semibold bg-[#757575] text-white rounded-lg px-3 ">
                    {items.length}
                  </div>
                </div>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                  >
                    <div className="flex flex-col items-center justify-center w-32 border-l-2 border-[#C7C7C7]">
                      <div className="font-black text-[#D5AE78] text-xl">
                        {item.year} {item.date}
                      </div>
                    </div>
                    <div className="text-gray-800 sm:line-clamp-2 md:line-clamp-1 text-start mr-1 text-xl w-full font-medium">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {displayedCount < filteredData.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="bg-[#D5AE78] text-white text-lg font-black px-4 py-2 rounded-md"
              >
                عرض المزيد
              </button>
            </div>
          )}
        </div>
      )}
      <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
