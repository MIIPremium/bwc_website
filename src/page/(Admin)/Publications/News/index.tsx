import { useTranslation } from "react-i18next";
import NewsTable from "src/components/table/new-table";
import Breadcrumb from "src/ui/breadcrumb";
import EnBreadcrumb from "src/ui/en-breadcrumb";

export default function NewsIndex() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <main>
      <div className="fixed h-screen  w-[83.5%] text-right bg-[#f2f2f2]">
        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
            {dir === "ltr" ? (
              <EnBreadcrumb
                tilte1="Publications"
                path1="/admin-dashboard/news"
                tilte2="news"
                path2="/admin-dashboard/news"
              />
            ) : (
              <Breadcrumb
                tilte1="المنشورات"
                path1="/admin-dashboard/news"
                tilte2="الاخبار"
                path2="/admin-dashboard/news"
              />
            )}
          </div>
        </div>

        <NewsTable />
      </div>
    </main>
  );
}
