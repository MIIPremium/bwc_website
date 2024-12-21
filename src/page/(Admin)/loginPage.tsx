import React, { useState } from "react";
import axios from "axios";
import login from "../../assets/img/8H4A08688.jpg(1).jpg";
import login1 from "../../assets/img/عالم الأعمال خلفية أبيض 21.png";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";


export default function LoginPage() {
  const navigate = useNavigate();
  const {  i18n } = useTranslation();
  const dir = i18n.dir();

  const [loginPassword, setLoginPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePassword = (value: string) => {
    setLoginPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return; // لمنع إرسال نفس الطلب عدة مرات

    setIsSubmitting(true);

    try {
      // إرسال طلب تسجيل الدخول
      const response = await axios.post(
        "https://bwc.runasp.net/login",
        {
          email: "hamoud@gmail.com",
          password: loginPassword,
        },
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      );

      if (response?.status === 200 && response.data.accessToken) {
        // حفظ الـ accessToken في الكوكيز
        Cookies.set("accessToken", response.data.accessToken, {
          expires: new Date(new Date().getTime() + 3600 * 1000),
        });

        // حفظ الـ refreshToken في الكوكيز
        if (response.data.refreshToken) {
          Cookies.set("refreshToken", response.data.refreshToken, {
            expires: 7, // صلاحية لـ 7 أيام
          });
        }

        toast.success("مرحبا بك مجدداً.", {
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

        // إعادة توجيه المستخدم إلى صفحة الـ admin-dashboard بعد النجاح
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
      } else {
        toast.error("كلمة المرور غير صحيحة.");
      }
    } catch (error: any) {
      toast.error("تاكد من ادخال كلمة المرور الصحيحة");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="h-[100vh] w-full flex">
      <div className="w-[60%] h-full flex justify-center items-center">
        <img src={login} alt="" className=" h-[100%] w-[100%]" />
      </div>
      <div className="w-[40%] h-full flex justify-center items-center">
        <div className="w-[70%] h-[70%]">
          {/*  */}
          <div className="w-full h-[50%] flex justify-center">
            <img src={login1} alt="" className=" h-[100%] w-[100]" />
          </div>
          {/*  */}
          <div className="text-center mt-10">
            <h1 className="text-3xl mb-5">مرحبا بعودتك</h1>
            <form action="" className="px-10 text-end" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className={
                    dir === "ltr"
                      ? "block text-black text-start font-black text-lg  mt-1"
                      : "block text-start text-black font-black text-lg  mt-1"
                  }
                >
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name=""
                  id=""
                  dir="rtl"
                  placeholder="ادخل كلمة المرور ..."
                  required
                  value={loginPassword}
                  onChange={(e) => handlePassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white mt-2 border-2 border-[#797B7D] focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]"
                />
              </div>
              <button
                type="button"
                className=" mt-10 w-full block shadow-[0_05px_20px_5px_rgba(204,169,114,0.3)] bg-black hover:bg-[#cca972] focus:bg-gray-100 text font-semibold rounded-lg px-4 py-3 outline-2 outline-gray-500"
              >
                <div className="flex items-center justify-center">
                  <button type="submit" className="ml-4 text-white">
                    {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
                  </button>
                  <Toaster />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
