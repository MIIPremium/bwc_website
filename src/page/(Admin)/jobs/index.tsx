import React from "react";
import { useTranslation } from "react-i18next";
import JobsTable from "src/components/table/jobs-table";
import Breadcrumb from "src/ui/breadcrumb";
import EnBreadcrumb from "src/ui/en-breadcrumb";
export default function JobsIndex() {
  const {  i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <main>
      <div className=" min-h-screen  w-[100%] text-right bg-[#f2f2f2]">
        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
            {dir === "ltr" ? (
              <EnBreadcrumb
                tilte1="Features"
                path1="/admin-dashboard/jobs"
                tilte2=" Jobs"
                path2="/admin-dashboard/jobs"
                tilte3=""
                path3=""
              />
            ) : (
              <Breadcrumb
                tilte1="المزايا"
                path1="/admin-dashboard/jobs"
                tilte2=" وظائف"
                path2="/admin-dashboard/jobs"
                tilte3=""
                path3=""
              />
            )}
          </div>
        </div>

        <JobsTable />
      </div>
    </main>
  );
}
