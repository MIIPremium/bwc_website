import React from "react";
import { useTranslation } from "react-i18next";
import ReportTable from "src/components/table/reports-table";
import Breadcrumb from "src/ui/breadcrumb";
import EnBreadcrumb from "src/ui/en-breadcrumb";
export default function ReportIndex() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <main>
      <div className=" min-h-[100vh]  w-[100%] text-right bg-[#f2f2f2]">
        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
            {dir === "ltr" ? (
              <EnBreadcrumb
                tilte1="Publications"
                path1="/admin-dashboard/reports"
                tilte2=" Reports"
                path2="/admin-dashboard/reports"
                tilte3=""
                path3=""
              />
            ) : (
              <Breadcrumb
                tilte1="المنشورات"
                path1="/admin-dashboard/reports"
                tilte2=" التقارير"
                path2="/admin-dashboard/reports"
                tilte3=""
                path3=""
              />
            )}
          </div>
        </div>

        <ReportTable />
      </div>
    </main>
  );
}
