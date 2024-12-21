import React from "react";
import AllDepertments from "src/components/(user)/all-depertments";
import Footer from "src/components/footer";
import Navbar from "src/components/navbar";

export default function Departments() {
  return (
    <div>
      <div className="w-full lg:h-[8vh] md:h-[8vh]  sm:h-[11vh]">
        <Navbar />
      </div>
      <div className="w-full lg:h-[80vh] md:min-h-[250vh] sm:min-h-[150vh] md:mt-11 sm:mt-8">
        <AllDepertments />
      </div>

      <footer className="min-h-[65vh] p-2 overflow-hidden relative bg-black mt-10">
        <Footer />
      </footer>
    </div>
  );
}
