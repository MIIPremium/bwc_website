import React, { useState } from "react";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";

interface YearItem {
  year: string;
  date: string;
  content: string;
}

const data: YearItem[] = [
  {
    year: "2024",
    date: "3 مايو",
    content: "دراﺴﺔ أهمية خصوصية البيانات الشخصية...",
  },
  {
    year: "2023",
    date: "3 مايو",
    content: "دراﺴﺔ أهمية خصوصية البيانات الشخصية...",
  },
  // Add more items to make it 30 objects
  ...Array.from({ length: 28 }).map((_, index) => ({
    year: index % 2 === 0 ? "2024" : "2023",
    date: `3 مايو`,
    content: `دراﺴﺔ أهمية خصوصية البيانات الشخصية... - ${index + 3}`,
  })),
];

export default function ArchiveIndex() {
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
      <div className="min-h-[150vh] bg-gray-100 mt-10 p-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <select
              onChange={(e) => handleYearFilterChange(e.target.value)}
              className="bg-white border border-gray-300 rounded-md p-2 md:mr-4 mb-4 md:mb-0"
            >
              <option value="">فلتر بالسنة</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="بحث باسم الكاتب"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 rounded-md border border-gray-300 w-full md:w-auto pr-10"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.384 4.384a1 1 0 01-1.415 1.415l-4.384-4.384zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {displayedData.map(({ year, items }) => (
            <div key={year} className="mb-6">
              <div className="flex flex-row justify-between items-center bg-white p-4 ">
                <div className=" font-semibold text-5xl text-[#D5AE78]">
                  {year}
                </div>
                <div className="text-lg  h-8 font-semibold bg-gray-100 rounded-lg px-3 ">
                  {items.length}
                </div>
              </div>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-center bg-[#E5E5E5] hover:bg-white min-h-[15vh] mt-[1px] p-6 cursor-pointer border-b"
                >
                  <div className="flex flex-col items-center justify-center w-32 border-l-2 border-black">
                    <div className="font-semibold text-[#D5AE78] text-2xl">
                      {item.year} {item.date}
                    </div>
                  </div>
                  <div className="text-gray-800 text-start mr-1 text-2xl w-full font-medium">
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
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              عرض المزيد
            </button>
          </div>
        )}
      </div>
      <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
