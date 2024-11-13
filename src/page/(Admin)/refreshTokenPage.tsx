import React, { useState, useEffect } from "react";
import axios from "axios";
import login from "../../assets/img/8H4A08688.jpg(1).jpg";
import login1 from "../../assets/img/عالم الأعمال خلفية أبيض 21.png";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
// Qwerty_123456789
export default function RefreshTokenPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // استخدام useEffect لجلب refreshToken والتحقق من حالة التوكنات
  useEffect(() => {
    const refreshTokenFromCookies = Cookies.get("refreshToken");
    const accessToken = Cookies.get("accessToken");

    // تحديد refreshToken فقط إذا كان موجوداً في الكوكيز
    if (refreshTokenFromCookies) {
      setRefreshToken(refreshTokenFromCookies);
    }

    // إعادة التوجيه حسب حالة التوكنات
    if (!refreshTokenFromCookies && !accessToken && location.pathname !== "/login") {
      navigate("/login");
    } else if (refreshTokenFromCookies && !accessToken && location.pathname !== "/RefreshToken") {
      navigate("/RefreshToken");
    }
    // إذا كان accessToken موجود، نستمر ولا نحتاج لإعادة التوجيه
  }, [navigate, location]);

  // دالة إرسال التوكن لتحديث الـ accessToken
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // منع التحديث الافتراضي للنموذج

    if (isSubmitting || !refreshToken) return; // منع الإرسال المتكرر وللتأكد من وجود refreshToken

    setIsSubmitting(true);

    try {
      const response = await axios({
        url: "/refresh",
        method: "post",
        baseURL: "https://bwc-api-testing.runasp.net/",
        data: {
          refreshToken: refreshToken,
        },
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });

      if (response?.status === 200 && response.data.accessToken) {
        // تعيين accessToken في الكوكيز مع تعيين وقت الانتهاء
        const accessTokenExpiration = new Date(new Date().getTime() + 3600 * 1000);
        Cookies.set("accessToken", response.data.accessToken, {
          expires: accessTokenExpiration,
        });

        // تحديث refreshToken إذا كان متوفراً في الاستجابة
        if (response.data.refreshToken) {
          Cookies.set("refreshToken", response.data.refreshToken, {
            expires: 7, // انتهاء صلاحية لمدة 7 أيام
          });
        }

        toast.success("تم تحديث الجلسة بنجاح. مرحبا بك مجدداً!", {
          style: {
            border: "1px solid #4FFFB0",
            padding: "16px",
            color: "#4FFFB0",
          },
          iconTheme: {
            primary: "#4FFFB0",
            secondary: "#FFFAEE",
          },
        });

        // إعادة التوجيه إلى صفحة admin-dashboard بعد نجاح التحديث
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
      } else {
        toast.error("تعذر تحديث الجلسة. يرجى المحاولة مجدداً.");
      }
    } catch (error: any) {
      toast.error("حدث خطأ أثناء محاولة تحديث الجلسة. يرجى تسجيل الدخول مجدداً.");
      navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[100vh] w-full flex">
      <div className="w-[60%] h-full flex justify-center items-center">
        <img src={login} alt="" className="h-[100%] w-[100%]" />
      </div>
      <div className="w-[40%] h-full flex justify-center items-center">
        <div className="w-[70%] h-[70%]">
          {/* Logo Section */}
          <div className="w-full h-[50%] flex justify-center">
            <img src={login1} alt="" className="h-[100%] w-[100]" />
          </div>
          {/* Form Section */}
          <div className="text-center mt-10">
            <h1 className="text-3xl mb-5">تحديث الجلسة</h1>
            <form onSubmit={handleSubmit} className="px-10 text-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-10 w-full text-white block shadow-[0_05px_20px_5px_rgba(204,169,114,0.3)] bg-black hover:bg-[#cca972] focus:bg-gray-100 text font-semibold rounded-lg px-4 py-3 outline-2 outline-gray-500"
              >
                {isSubmitting ? "جاري تحديث الجلسة..." : "تحديث الجلسة"}
              </button>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
