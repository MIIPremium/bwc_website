import React from "react";
import JobInfo from "src/components/(user)/job-info";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";

export default function JobDetails() {
  return (
    <div>
      <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
        <Navbar />
      </div>
      <div className="w-full lg:min-h-[100vh]  px-5 md:mt-11 sm:mt-8">
        <JobInfo />
      </div>
      <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
