import React from "react";
import ServicesTable from "src/components/table/services-table";
import Breadcrumb from "src/ui/breadcrumb";
import { useTranslation } from "react-i18next";
import EnBreadcrumb from "src/ui/en-breadcrumb";

export default function ServicesIndex() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <main>
      <div className="fixed h-screen  w-[83.5%] text-right bg-[#f2f2f2]">
        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
            {dir === "ltr" ? (
              <EnBreadcrumb
                tilte1="Features"
                path1="/admin-dashboard/services"
                tilte2=" Services"
                path2="/admin-dashboard/services"
                tilte3=""
                path3=""
              />
            ) : (
              <Breadcrumb
                tilte1="المزايا"
                path1="/admin-dashboard/services"
                tilte2=" خدماتنا"
                path2="/admin-dashboard/services"
                tilte3=""
                path3=""
              />
            )}
          </div>
        </div>

        <ServicesTable />
      </div>
    </main>
  );
}
