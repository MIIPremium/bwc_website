import React from "react";
import OrganizationsUnderBwcTable from "src/components/table/organizations-under-bwc-table";
import Breadcrumb from "src/ui/breadcrumb";
import { useTranslation } from "react-i18next";
import EnBreadcrumb from "src/ui/en-breadcrumb";

export default function Page() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <main>
      <div className="min-h-[100vh]  w-[100%] text-right bg-[#f2f2f2]">
        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
            {dir === "ltr" ? (
              <EnBreadcrumb
                tilte1="Organizations and Employees"
                path1="/admin-dashboard/organization"
                tilte2="The institutions we manage"
                path2="/admin-dashboard/organization"
                tilte3=""
                path3=""
              />
            ) : (
              <Breadcrumb
                tilte1="المؤسسات و الموظفين"
                path1="/admin-dashboard/organization"
                tilte2=" المؤسسات التي نديرها"
                path2="/admin-dashboard/organization"
                tilte3=""
                path3=""
              />
            )}
          </div>
        </div>

        <OrganizationsUnderBwcTable />
      </div>
    </main>
  );
}
