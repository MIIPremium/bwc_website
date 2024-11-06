import React from "react";
import TaskForceTable from "src/components/table/taskforce-table";
import Breadcrumb from "src/ui/breadcrumb";
import { useTranslation } from "react-i18next";
import EnBreadcrumb from "src/ui/en-breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { TaskForceRespTable } from "src/types/validation";
import { getApi } from "src/lib/http";

export default function TaskForceIndex() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const { data } = useQuery({
    queryKey: ["Taskforce"],
    queryFn: () => getApi<TaskForceRespTable[]>("/api/Taskforce"),
  });

  return (
    <main>
      <div className="fixed h-screen  w-[83.5%] text-right bg-[#f2f2f2]">
        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
            {dir === "ltr" ? (
              <EnBreadcrumb
                tilte1="Organizations and Employees"
                path1="/admin-dashboard/taskforce"
                tilte2="Task Force"
                path2="/admin-dashboard/taskforce"
                tilte3=""
                path3=""
              />
            ) : (
              <Breadcrumb
                tilte1="المؤسسات و الموظفين"
                path1="/admin-dashboard/taskforce"
                tilte2=" فريق العمل"
                path2="/admin-dashboard/taskforce"
                tilte3=""
                path3=""
              />
            )}
          </div>
        </div>

        <TaskForceTable data={data?.data || []} />
      </div>
    </main>
  );
}
