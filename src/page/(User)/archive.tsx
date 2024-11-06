// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import Footer from "src/components/footer";
// import Navbar from "src/components/navbar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "src/ui/select";

// interface YearItem {
//   year: string;
//   total: string;
//   archive: archive[];
// }

// interface archive {
//   id: number;
//   type: string;
//   ar_title: string;
//   en_title: string;
//   date_of_publish: Date;
// }

// const data: YearItem[] = [
//   {
//     year: "2023",
//     total: "5",
//     archive: [
//       {
//         id: 1,
//         type: "Report",
//         ar_title: "تقرير سنوي",
//         en_title: "Annual Report",
//         date_of_publish: new Date("2023-01-15"),
//       },
//       {
//         id: 2,
//         type: "Article",
//         ar_title: "مقال علمي",
//         en_title: "Scientific Article",
//         date_of_publish: new Date("2023-03-10"),
//       },
//       {
//         id: 3,
//         type: "Article",
//         ar_title: "مقال علمي",
//         en_title: "Scientific Article",
//         date_of_publish: new Date("2023-03-10"),
//       },
//       {
//         id: 4,
//         type: "Article",
//         ar_title: "مقال علمي",
//         en_title: "Scientific Article",
//         date_of_publish: new Date("2023-03-10"),
//       },
//       {
//         id: 5,
//         type: "Article",
//         ar_title: "مقال علمي",
//         en_title: "Scientific Article",
//         date_of_publish: new Date("2023-03-10"),
//       },
//     ],
//   },
//   {
//     year: "2022",
//     total: "3",
//     archive: [
//       {
//         id: 3,
//         type: "Study",
//         ar_title: "دراسة ميدانية",
//         en_title: "Field Study",
//         date_of_publish: new Date("2022-05-20"),
//       },
//       {
//         id: 4,
//         type: "Document",
//         ar_title: "وثيقة رسمية",
//         en_title: "Official Document",
//         date_of_publish: new Date("2022-08-11"),
//       },
//       {
//         id: 5,
//         type: "Press Release",
//         ar_title: "بيان صحفي",
//         en_title: "Press Release",
//         date_of_publish: new Date("2022-11-01"),
//       },
//     ],
//   },
//   {
//     year: "2021",
//     total: "2",
//     archive: [
//       {
//         id: 6,
//         type: "Research",
//         ar_title: "بحث علمي",
//         en_title: "Scientific Research",
//         date_of_publish: new Date("2021-02-25"),
//       },
//       {
//         id: 7,
//         type: "Report",
//         ar_title: "تقرير شهري",
//         en_title: "Monthly Report",
//         date_of_publish: new Date("2021-06-15"),
//       },
//       {
//         id: 6,
//         type: "Research",
//         ar_title: "بحث علمي",
//         en_title: "Scientific Research",
//         date_of_publish: new Date("2021-02-25"),
//       },
//       {
//         id: 7,
//         type: "Report",
//         ar_title: "تقرير شهري",
//         en_title: "Monthly Report",
//         date_of_publish: new Date("2021-06-15"),
//       },
//       {
//         id: 6,
//         type: "Research",
//         ar_title: "بحث علمي",
//         en_title: "Scientific Research",
//         date_of_publish: new Date("2021-02-25"),
//       },
//       {
//         id: 7,
//         type: "Report",
//         ar_title: "تقرير شهري",
//         en_title: "Monthly Report",
//         date_of_publish: new Date("2021-06-15"),
//       },
//       {
//         id: 6,
//         type: "Research",
//         ar_title: "بحث علمي",
//         en_title: "Scientific Research",
//         date_of_publish: new Date("2021-02-25"),
//       },
//       {
//         id: 7,
//         type: "Report",
//         ar_title: "تقرير شهري",
//         en_title: "Monthly Report",
//         date_of_publish: new Date("2021-06-15"),
//       },
//       {
//         id: 6,
//         type: "Research",
//         ar_title: "بحث علمي",
//         en_title: "Scientific Research",
//         date_of_publish: new Date("2021-02-25"),
//       },
//       {
//         id: 7,
//         type: "Report",
//         ar_title: "تقرير شهري",
//         en_title: "Monthly Report",
//         date_of_publish: new Date("2021-06-15"),
//       },
//     ],
//   },
// ];

// export default function ArchiveIndex() {
//   const { t, i18n } = useTranslation();
//   const dir = i18n.dir();
//   const [filterYear, setFilterYear] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [displayedCount, setDisplayedCount] = useState(10); // Start with 10 archives

//   const handleYearFilterChange = (year: string) => {
//     setFilterYear(year);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleShowMore = () => {
//     setDisplayedCount((prev) => prev + 5); // Show 5 more archives each time
//   };

//   // Filter data by year and search query
//   const filteredData = data
//     .filter((item) => !filterYear || item.year === filterYear)
//     .map((yearItem) => ({
//       ...yearItem,
//       archive: yearItem.archive.filter(
//         (archiveItem) =>
//           archiveItem.ar_title
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           archiveItem.en_title.toLowerCase().includes(searchQuery.toLowerCase())
//       ),
//     }))
//     .filter((yearItem) => yearItem.archive.length > 0);

//   // Sort data by year in descending order (latest year first)
//   const sortedData = filteredData.sort(
//     (a, b) => Number(b.year) - Number(a.year)
//   );

//   // Flatten archives for easier slicing
//   const allArchives = sortedData.flatMap((yearItem) =>
//     yearItem.archive.map((archive) => ({ ...archive, year: yearItem.year }))
//   );

//   // Limit displayed archives
//   const limitedArchives = allArchives.slice(0, displayedCount);

//   // Group limited archives by year for display
//   const groupedArchives = limitedArchives.reduce<{
//     [key: string]: typeof allArchives;
//   }>((acc, archiveItem) => {
//     if (!acc[archiveItem.year]) {
//       acc[archiveItem.year] = [];
//     }
//     acc[archiveItem.year].push(archiveItem);
//     return acc;
//   }, {});

//   // Sort groupedArchives keys in descending order
//   const sortedGroupedArchives = Object.entries(groupedArchives).sort(
//     ([yearA], [yearB]) => Number(yearB) - Number(yearA)
//   );

//   return (
//     <div>
//       <div className="w-full lg:h-[8vh] md:h-[8vh] sm:h-[11vh]">
//         <Navbar />
//       </div>
//       {dir === "ltr" ? (
//         // <div className="min-h-[150vh]  mt-10 p-6 ">
//         //   <div className="bg-white rounded-lg  p-4 mb-6">
//         //     <div className="grid grid-cols-4  gap-3 mt-3">
//         //       <div className="col-span-4 md:col-span-1 flex justify-between gap-4">
//         //         {/* <Select dir="ltr" onValueChange={handleAscendingChange}>
//         //           <SelectTrigger className="w-[48%] rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
//         //             <SelectValue placeholder="select Publication order" />
//         //           </SelectTrigger>
//         //           <SelectContent className="bg-white">
//         //             <SelectItem value="oldest">oldest</SelectItem>
//         //             <SelectItem value="newest">newest</SelectItem>
//         //           </SelectContent>
//         //         </Select> */}
//         //         <Select dir="ltr">
//         //           <SelectTrigger className="w-[48%] float-start rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
//         //             <SelectValue placeholder="Filter by Year" />
//         //           </SelectTrigger>
//         //           <SelectContent className="bg-white">
//         //             <SelectItem value="all">All</SelectItem>
//         //             <SelectItem value="publish">publish</SelectItem>
//         //             <SelectItem value="news">news</SelectItem>
//         //             <SelectItem value="analysis">analysis</SelectItem>
//         //           </SelectContent>
//         //         </Select>
//         //       </div>

//         //       <div className="col-span-4 md:col-span-2">
//         //         {/* <Input
//         //           dir="ltr"
//         //           type="text"
//         //           id="simple-search"
//         //           // value={searchQuery}
//         //           // onChange={handleSearchChange} // Update state as the user types
//         //           // onKeyDown={handleKeyDown}
//         //           className="rounded-[32.5px]"
//         //           placeholder="Search by the name of the publication"
//         //         /> */}
//         //       </div>

//         //       <div className="col-span-4 md:col-span-1"></div>
//         //     </div>
//         //   </div>

//         //    <div
//         //     dir="ltr"
//         //     className="bg-white rounded-lg shadow-md border-[1px] border-[#E5E5E5]"
//         //   >
//         //     {displayedData.map(({ year, items }) => (
//         //       <div key={year} className="mb-6">
//         //         <div className="flex flex-row justify-between items-center bg-white p-4 ">
//         //           <div className=" font-semibold text-5xl text-[#D5AE78]">
//         //             {year}
//         //           </div>
//         //           <div className="text-lg  h-8 font-semibold bg-[#757575] text-white rounded-lg px-3 ">
//         //             {items.length}
//         //           </div>
//         //         </div>
//         //         {items.map((item, index) => (
//         //           <div
//         //             key={index}
//         //             className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
//         //           >
//         //             <div className="flex flex-col items-center justify-center w-32 border-r-2 border-[#C7C7C7]">
//         //               <div className="font-black text-[#D5AE78] text-xl">
//         //                 {item.year} {item.year}
//         //               </div>
//         //             </div>
//         //             <div className="text-gray-800 sm:line-clamp-2 md:line-clamp-1 text-start mr-1 text-xl w-full font-medium">
//         //               {item.archive[0].ar_title}
//         //             </div>
//         //           </div>
//         //         ))}
//         //       </div>
//         //     ))}
//         //   </div>

//         //   {displayedCount < filteredData.length && (
//         //     <div className="flex justify-center mt-6">
//         //       <button
//         //         onClick={handleShowMore}
//         //         className="bg-[#D5AE78] text-white text-lg font-black px-4 py-2 rounded-md"
//         //       >
//         //         show more
//         //       </button>
//         //     </div>
//         //   )}
//         // </div>
//         <div className="min-h-[150vh] mt-10 p-6">
//           <div className="bg-white rounded-lg p-4 mb-6">
//             <div className="grid grid-cols-4 gap-3 mt-3">
//               <div className="col-span-4 md:col-span-1 flex justify-between gap-4">
//                 <Select dir="ltr">
//                   <SelectTrigger className="w-[48%] float-start rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
//                     <SelectValue placeholder="Filter by Year" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white">
//                     <SelectItem value="all">All</SelectItem>
//                     <SelectItem value="publish">Publish</SelectItem>
//                     <SelectItem value="news">News</SelectItem>
//                     <SelectItem value="analysis">Analysis</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="col-span-4 md:col-span-2">
//                 {/* Search Input (removed for brevity) */}
//               </div>
//             </div>
//           </div>

//           <div
//             dir="ltr"
//             className="bg-white rounded-lg shadow-md border-[1px] border-[#E5E5E5]"
//           >
//             {sortedGroupedArchives.map(([year, archives]) => (
//               <div key={year} className="mb-6">
//                 <div className="flex flex-row justify-between items-center bg-white p-4">
//                   <div className="font-semibold text-5xl text-[#D5AE78]">
//                     {year}
//                   </div>
//                   <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
//                     {archives.length}
//                   </div>
//                 </div>
//                 {archives.map((archiveItem, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
//                   >
//                     <div className="flex flex-col items-center justify-center w-32 border-r-2 border-[#C7C7C7]">
//                       <div className="font-black text-[#D5AE78] text-xl">
//                         {archiveItem.date_of_publish.toDateString()}
//                       </div>
//                     </div>
//                     <div className="text-gray-800 sm:line-clamp-2 md:line-clamp-1 text-start ml-1 text-xl w-full font-medium">
//                       {archiveItem.en_title}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* Show More Button */}
//           {displayedCount < allArchives.length && (
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={handleShowMore}
//                 className="bg-[#D5AE78] text-white text-lg font-black px-4 py-2 rounded-md"
//               >
//                 show more
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="min-h-[150vh] mt-10 p-6">
//           <div className="bg-white rounded-lg p-4 mb-6">
//             <div className="grid grid-cols-4 gap-3 mt-3">
//             <div className="col-span-4 md:col-span-3">
//                 {/* Search Input (removed for brevity) */}
//               </div>
//               <div className="col-span-4 md:col-span-1 flex  justify-end gap-4">
//                 <Select dir="rtl">
//                   <SelectTrigger className="w-[48%] float-end  rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
//                     <SelectValue placeholder="Filter by Year" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white">
//                     <SelectItem value="all">All</SelectItem>
//                     <SelectItem value="publish">Publish</SelectItem>
//                     <SelectItem value="news">News</SelectItem>
//                     <SelectItem value="analysis">Analysis</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-md border-[1px] border-[#E5E5E5]">
//             {sortedGroupedArchives.map(([year, archives]) => (
//               <div key={year} className="mb-6">
//                 {/* Year Header */}
//                 <div className="flex flex-row justify-between items-center bg-white p-4">
//                   <div className="font-semibold text-5xl text-[#D5AE78]">
//                     {year}
//                   </div>
//                   <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
//                     {archives.length}
//                   </div>
//                 </div>

//                 {/* Archives for the Year */}
//                 {archives.map((archiveItem) => (
//                   <div
//                     key={archiveItem.id}
//                     className="flex flex-row items-center justify-between border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b mb-4"
//                   >
//                     {/* Date of Publish */}
//                     <div className="flex flex-col items-center justify-center w-32 border-l-2 border-[#C7C7C7]">
//                       <div className="font-black text-[#D5AE78] text-xl">
//                         {archiveItem.date_of_publish.toDateString()}
//                       </div>
//                     </div>

//                     {/* Arabic and English Titles */}
//                     <div className="text-gray-800 text-start mr-1 text-xl w-full font-medium">
//                       <p>{archiveItem.ar_title}</p>
//                       <p className="text-gray-500">{archiveItem.en_title}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* Show More Button */}
//           {displayedCount < allArchives.length && (
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={handleShowMore}
//                 className="bg-[#D5AE78] text-white text-lg font-black px-4 py-2 rounded-md"
//               >
//                 عرض المزيد
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//       <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
//         <Footer />
//       </footer>
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";
import { getApi } from "src/lib/http";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/ui/select";
import { useTranslation } from "react-i18next";
import formattedDate from "src/utilities/formattedDate";
import formattedDateEn from "src/utilities/formattedDateEn";
import { Link } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
export interface archiveResp {
  total: number;
  archive: Archive[];
}

export interface archiveRespByYear {
  year: number;
  total: number;
  archive: Archive[];
}
export interface Archive {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  date_of_publish: Date;
}
// interface YearItem {
//   year: string;
//   date: string;
//   content: string;
// }
// const data: YearItem[] = [
//   {
//     year: "2024",
//     date: "3 مايو",
//     content:
//       "دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... ",
//   },
//   {
//     year: "2023",
//     date: "3 مايو",
//     content:
//       "دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... ",
//   },
//   // Add more items to make it 30 objects
//   ...Array.from({ length: 28 }).map((_, index) => ({
//     year: index % 2 === 0 ? "2024" : "2023",
//     date: `3 مايو`,
//     content: `دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية...  دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... دراﺴﺔ أهمية خصوصية البيانات الشخصية... - ${
//       index + 3
//     }`,
//   })),
// ];
export default function ArchiveIndex() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [selectedYear, setSelectedYear] = useState("");
  const selectYearNumber = Number(selectedYear);

  const { data, isPending, isLoading, isError, error } = useQuery<archiveResp>({
    queryKey: ["archive"],
    queryFn: async () => {
      const response: AxiosResponse<archiveResp> = await getApi(
        `/api/website/Archive/GetAll`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes to reduce redundant requests
  });

  const {
    data: byYear,
    isLoading: isLoadingByYear,
    isError: isErrorByYear,
    error: ErrorByYear,
    isPending: isPendingByYear,
  } = useQuery<archiveResp>({
    queryKey: ["archiveByYear", selectYearNumber], // Use selectYearNumber as part of the query key to refetch only when it changes
    queryFn: async () => {
      const response: AxiosResponse<archiveRespByYear> = await getApi(
        `/api/website/Archive/${selectYearNumber}`
      );
      return response.data;
    },
    enabled: !!selectYearNumber, // Only run this query when selectYearNumber is defined
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes if data is not highly dynamic
  });

  // console.log("selectedYear", selectedYear);
  // console.log("byYear", byYear);
  const [filterYear, setFilterYear] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedCount, setDisplayedCount] = useState(10);
  const handleYearFilterChange = (year: string) => {
    setFilterYear(year);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle "Show More"
  const handleShowMore = () => {
    setDisplayedCount((prevCount) => prevCount + 5);
  };

  // Filtered data to show only up to the current displayed count
  const displayedData = data?.archive.slice(0, displayedCount);
  const displayedByYearData = byYear?.archive.slice(0, displayedCount);

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full ">
        <LoaderIcon className="mt-12 flex animate-spin items-center justify-end duration-1000" />
      </div>
    );
  }
  return (
    <div>
      <div className="w-full lg:h-[8vh] md:h-[8vh] sm:h-[11vh]">
        <Navbar />
      </div>
      {dir === "ltr" ? (
        <>
          {selectedYear === "" ? (
            <div dir="ltr" className="min-h-[150vh] bg-white mt-10 p-6">
              <div className="bg-white rounded-lg  p-4 mb-6">
                <div className="grid grid-cols-4  gap-3 mt-3">
                  <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>

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
         />  */}
                  </div>
                  <div className="col-span-4 md:col-span-1">
                    <Select
                      dir="ltr"
                      value={selectedYear}
                      onValueChange={(value) => setSelectedYear(value)} // Updated for clarity
                    >
                      <SelectTrigger className="w-[48%] float-end rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <SelectValue placeholder="Filter by Year" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md border-[1px] border-[#E5E5E5]">
                <div className="mb-6">
                  <div className="flex flex-row justify-end items-center bg-white p-4">
                    <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
                      {data?.total}
                    </div>
                  </div>

                  {displayedData?.map((item, index) => (
                    <Link
                      to={
                        item.type === "publish"
                          ? `/publish-details/${item.id}`
                          : item.type === "news"
                          ? `/news-details/${item.id}`
                          : item.type === "analysis"
                          ? `/Analysis-details/${item.id}`
                          : `/report-details/${item.id}`
                      }
                      target="_blank"
                      key={item.id}
                      className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                    >
                      <div className="flex flex-col items-center justify-center w-32 border-r-2 border-[#C7C7C7]">
                        <div className="font-black text-[#D5AE78] text-xl">
                          {formattedDateEn(new Date(item.date_of_publish))}
                        </div>
                      </div>
                      <div className="text-gray-800  text-start ml-1 text-xl w-full font-medium">
                        <p
                          className={
                            item.type === "publish"
                              ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#CEA461] mt-2"
                              : item.type === "news"
                              ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#69DB57] mt-2"
                              : item.type === "analysis"
                              ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#979797] mt-2"
                              : ""
                          }
                        >
                          {item.type}
                        </p>
                        <p className="sm:line-clamp-2 md:line-clamp-1">
                          {item.en_Title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {displayedCount < (data?.archive?.length ?? 0) && (
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
            <div dir="ltr" className="min-h-[150vh] bg-white mt-10 p-6">
              <div className="bg-white rounded-lg  p-4 mb-6">
                <div className="grid grid-cols-4  gap-3 mt-3">
                  <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>

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
         />  */}
                  </div>
                  <div className="col-span-4 md:col-span-1">
                    <Select
                      dir="ltr"
                      value={selectedYear}
                      onValueChange={(value) => setSelectedYear(value)} // Updated for clarity
                    >
                      <SelectTrigger className="w-[48%] float-end rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <SelectValue placeholder="Filter by Year" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md border-[1px] border-[#E5E5E5]">
                <div className="mb-6">
                  <div className="flex flex-row justify-end items-center bg-white p-4">
                    <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
                      {byYear?.total}
                    </div>
                  </div>

                  {displayedByYearData?.map((item, index) => (
                    <Link
                      to={
                        item.type === "publish"
                          ? `/publish-details/${item.id}`
                          : item.type === "news"
                          ? `/news-details/${item.id}`
                          : item.type === "analysis"
                          ? `/Analysis-details/${item.id}`
                          : `/report-details/${item.id}`
                      }
                      target="_blank"
                      key={item.id}
                      className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                    >
                      <div className="flex flex-col items-center justify-center w-32 border-r-2 border-[#C7C7C7]">
                        <div className="font-black text-[#D5AE78] text-xl">
                          {formattedDateEn(new Date(item.date_of_publish))}
                        </div>
                      </div>
                      <div className="text-gray-800  text-start ml-1 text-xl w-full font-medium">
                        <p
                          className={
                            item.type === "publish"
                              ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#CEA461] mt-2"
                              : item.type === "news"
                              ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#69DB57] mt-2"
                              : item.type === "analysis"
                              ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#979797] mt-2"
                              : ""
                          }
                        >
                          {item.type}
                        </p>
                        <p className="sm:line-clamp-2 md:line-clamp-1">
                          {item.en_Title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {(displayedByYearData?.length ?? 0) <
                (byYear?.archive?.length ?? 0) && (
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
          )}
        </>
      ) : (
        <>
          {selectedYear === "" ? (
            <div className="min-h-[150vh] bg-white mt-10 p-6">
              <div className="bg-white rounded-lg  p-4 mb-6">
                <div className="grid grid-cols-4  gap-3 mt-3">
                  <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>

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
         />  */}
                  </div>
                  <div className="col-span-4 md:col-span-1">
                    <Select
                      dir="rtl"
                      value={selectedYear}
                      onValueChange={(value) => setSelectedYear(value)} // Updated for clarity
                    >
                      <SelectTrigger className="w-[48%] float-end rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <SelectValue placeholder="اختار السنة" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end items-center bg-white p-4">
                <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
                  {data?.total}
                </div>
              </div>

              {displayedData?.map((item, index) => (
                <Link
                  to={
                    item.type === "publish"
                      ? `/publish-details/${item.id}`
                      : item.type === "news"
                      ? `/news-details/${item.id}`
                      : item.type === "analysis"
                      ? `/Analysis-details/${item.id}`
                      : `/report-details/${item.id}`
                  }
                  target="_blank"
                  key={item.id}
                  className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                >
                  <div className="flex flex-col items-center justify-center w-32 border-l-2 border-[#C7C7C7]">
                    <div className="font-black text-[#D5AE78] text-xl">
                      {formattedDate(new Date(item.date_of_publish))}
                    </div>
                  </div>
                  <div className="text-gray-800 text-start mr-1 text-xl w-full font-medium">
                    <p
                      className={
                        item.type === "publish"
                          ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#CEA461] mt-2"
                          : item.type === "news"
                          ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#69DB57] mt-2"
                          : item.type === "analysis"
                          ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#979797] mt-2"
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
                    </p>
                    <p className="sm:line-clamp-2 md:line-clamp-1">
                      {item.ar_Title}
                    </p>
                  </div>
                </Link>
              ))}

              {displayedCount < (data?.archive?.length ?? 0) && (
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
          ) : (
            <div className="min-h-[150vh] bg-white mt-10 p-6">
              <div className="bg-white rounded-lg  p-4 mb-6">
                <div className="grid grid-cols-4  gap-3 mt-3">
                  <div className="col-span-4 md:col-span-1 flex justify-between gap-4"></div>

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
         />  */}
                  </div>
                  <div className="col-span-4 md:col-span-1">
                    <Select
                      dir="rtl"
                      value={selectedYear}
                      onValueChange={(value) => setSelectedYear(value)} // Updated for clarity
                    >
                      <SelectTrigger className="w-[48%] float-end rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <SelectValue placeholder="اختار السنة" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end items-center bg-white p-4">
                <div className="text-lg h-8 font-semibold bg-[#757575] text-white rounded-lg px-3">
                  {byYear?.total}
                </div>
              </div>

              {displayedByYearData?.map((item, index) => (
                <Link
                  to={
                    item.type === "publish"
                      ? `/publish-details/${item.id}`
                      : item.type === "news"
                      ? `/news-details/${item.id}`
                      : item.type === "analysis"
                      ? `/Analysis-details/${item.id}`
                      : `/report-details/${item.id}`
                  }
                  target="_blank"
                  key={item.id}
                  className="flex flex-row items-center justify-center border-[1px] border-[#E5E5E5] bg-[#F2F2F2] hover:bg-white min-h-[15vh] p-6 cursor-pointer border-b"
                >
                  <div className="flex flex-col items-center justify-center w-32 border-l-2 border-[#C7C7C7]">
                    <div className="font-black text-[#D5AE78] text-xl">
                      {formattedDate(new Date(item.date_of_publish))}
                    </div>
                  </div>
                  <div className="text-gray-800 text-start mr-1 text-xl w-full font-medium">
                    <p
                      className={
                        item.type === "publish"
                          ? "inline-block bg-[#FFDAA0]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#CEA461] mt-2"
                          : item.type === "news"
                          ? "inline-block bg-[#C5FFBC]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#69DB57] mt-2"
                          : item.type === "analysis"
                          ? "inline-block bg-[#DBDBDB]/[.35] rounded-[5px] px-3 text-sm font-semibold text-[#979797] mt-2"
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
                    </p>
                    <p className="sm:line-clamp-2 md:line-clamp-1">
                      {item.ar_Title}
                    </p>
                  </div>
                </Link>
              ))}

              {(displayedByYearData?.length ?? 0) <
                (byYear?.archive?.length ?? 0) && (
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
        </>
      )}
      <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
