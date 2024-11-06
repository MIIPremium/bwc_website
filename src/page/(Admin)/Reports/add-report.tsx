import React from "react";
import { useTranslation } from "react-i18next";
import AddReportsForm from "src/components/form/add-reports";
import Breadcrumb from "src/ui/breadcrumb";
import EnBreadcrumb from "src/ui/en-breadcrumb";
export default function AddReport() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <main>
      <div className=" min-h-screen  w-[100%] text-right bg-[#f2f2f2]">
        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
            {dir === "ltr" ? (
              <EnBreadcrumb
                tilte1="Publications"
                path1="/admin-dashboard/reports"
                tilte2="Reports"
                path2="/admin-dashboard/reports"
                tilte3="Add Reports"
                path3="/admin-dashboard/reports/add-report"
              />
            ) : (
              <Breadcrumb
                tilte1="المنشورات"
                path1="/admin-dashboard/reports"
                tilte2=" التقارير"
                path2="/admin-dashboard/reports"
                tilte3="إضافة تقرير"
                path3="/admin-dashboard/reports/add-report"
              />
            )}
          </div>
        </div>

        <AddReportsForm />
      </div>
    </main>
  );
}
