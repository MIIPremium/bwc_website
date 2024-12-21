import { useTranslation } from "react-i18next";
import Breadcrumb from "src/ui/breadcrumb";
import EnBreadcrumb from "src/ui/en-breadcrumb";
import ResetPasswordForm from "./form";
export default function ResetPassWordIndex() {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <main>
      <div className=" min-h-screen  w-[100%] text-right bg-[#f2f2f2]">
        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-2 mt-4 h-auto  rounded-lg">
            {dir === "ltr" ? (
              <EnBreadcrumb
                tilte1="reset-Password"
                path1="/admin-dashboard/reset-password"
                tilte2="reset-Password"
                path2="/admin-dashboard/reset-password"
              />
            ) : (
              <Breadcrumb
                tilte1="إعادة تعيين كلمة المرور"
                path1="/admin-dashboard/reset-password"
                tilte2="إعادة تعيين كلمة المرور"
                path2="/admin-dashboard/reset-password"
              />
            )}
          </div>
        </div>

        <ResetPasswordForm />
      </div>
    </main>
  );
}
