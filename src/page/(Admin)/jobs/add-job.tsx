import React from "react";
import { useTranslation } from "react-i18next";
import AddJobForm from "src/components/form/add-job-form";
import Breadcrumb from "src/ui/breadcrumb";
import EnBreadcrumb from "src/ui/en-breadcrumb";

export default function AddJob() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <main>
      <div className="min-h-screen  w-[100%] text-right bg-[#f2f2f2]">
        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
            {dir === "ltr" ? (
              <EnBreadcrumb
                tilte1="Features"
                path1="/admin-dashboard/jobs"
                tilte2=" Jobs"
                path2="/admin-dashboard/jobs"
                tilte3="Add Job"
                path3="/admin-dashboard/jobs/add-job"
              />
            ) : (
              <Breadcrumb
                tilte1="المزايا"
                path1="/admin-dashboard/jobs"
                tilte2=" الوظائف"
                path2="/admin-dashboard/jobs"
                tilte3="إضافة وظيفة"
                path3="/admin-dashboard/jobs/add-job"
              />
            )}
          </div>
        </div>

        <AddJobForm />
      </div>
    </main>
  );
}
