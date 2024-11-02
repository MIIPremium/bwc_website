import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  title: string;
  email: string;
  details: string;
}

interface FormErrors {
  name?: string;
  title?: string;
  email?: string;
  details?: string;
}

export default function ContectUs() {
  const initialFormData: FormData = {
    name: "",
    title: "",
    email: "",
    details: "",
  };

  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const [widthScreen, setWidthScreen] = useState({
    winWidth: window.innerWidth,
    winHight: window.innerHeight,
  });

  const detectSize = () => {
    setWidthScreen({
      winWidth: window.innerWidth,
      winHight: window.innerHeight,
    });
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error message as the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.details.trim()) {
      newErrors.details = "Details are required.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const { name, title, email, details } = formData;
    const mailtoLink = `mailto:hamod2131.a@gmail.com?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nDetails:\n${details}`
    )}`;

    window.location.href = mailtoLink;

    // Reset the form fields after submission
    setFormData(initialFormData);
    setErrors({});
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [widthScreen]);
  return (
    <>
      {widthScreen.winWidth <= 980 ? (
        <div className=" w-full h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          <div className="flex-1 w-[100%] h-[100vh]">
            {dir === "ltr" ? (
              <form
                onSubmit={handleSubmit}
                className="lg:px-10 sm:px-1 text-end"
              >
                <div>
                  <label className="block text-balck font-black text-lg mb-2 mt-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id=""
                    value={formData.name}
                    onChange={handleChange}
                    dir="ltr"
                    placeholder="Enter Name ... "
                    className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                      errors.name ? "border-red-500" : "border-[#CCA972]"
                    } focus:bg-white placeholder:text-start focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                  <div>
                    <label className="block text-balck font-black text-lg mb-2 mt-1">
                      Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      id=""
                      dir="ltr"
                      placeholder="Enter Title ..."
                      className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                        errors.title ? "border-red-500" : "border-[#CCA972]"
                      } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-balck font-black text-lg mb-2 mt-1">
                      Email Address
                    </label>

                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      id=""
                      dir="ltr"
                      placeholder="Email Address ..."
                      className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                        errors.email ? "border-red-500" : "border-[#CCA972]"
                      } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-balck font-black text-lg mb-2 mt-1">
                    Details
                  </label>

                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    id=""
                    rows={10}
                    cols={40}
                    dir="ltr"
                    placeholder="Enter Details ..."
                    className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                      errors.details ? "border-red-500" : "border-[#CCA972]"
                    } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                  />
                  {errors.details && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.details}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full block mt-3 shadow-[0_05px_20px_5px_rgba(204,169,114,0.3)] bg-black hover:bg-[#cca972] focus:bg-gray-100 text font-semibold rounded-lg px-4 py-3 outline-2 outline-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <span className="ml-4 text-white">Send</span>
                  </div>
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="lg:px-10 sm:px-1 text-start"
              >
                <div>
                  <label className="block text-balck font-black text-lg mb-2 mt-1">
                    الاسم
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    id=""
                    dir="rtl"
                    placeholder="ادخل الاسم ..."
                    className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                      errors.name ? "border-red-500" : "border-[#CCA972]"
                    } focus:bg-white placeholder:text-start focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}

                  <div>
                    <label className="block text-balck font-black text-lg mb-2 mt-1">
                      الموضوع
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      id=""
                      dir="rtl"
                      placeholder="ادخل الموضوع ..."
                      className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                        errors.title ? "border-red-500" : "border-[#CCA972]"
                      } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-balck font-black text-lg mb-2 mt-1">
                      البريد الإلكتروني
                    </label>

                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      id=""
                      dir="rtl"
                      placeholder="البريد الإلكتروني ..."
                      className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                        errors.email ? "border-red-500" : "border-[#CCA972]"
                      } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-balck font-black text-lg mb-2 mt-1">
                    التفاصيل
                  </label>

                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    id=""
                    rows={10}
                    cols={40}
                    dir="rtl"
                    placeholder="ادخل التفاصيل ..."
                    className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                      errors.details ? "border-red-500" : "border-[#CCA972]"
                    } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                  />
                  {errors.details && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.details}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full mt-3 block shadow-[0_05px_20px_5px_rgba(204,169,114,0.3)] bg-black hover:bg-[#cca972] focus:bg-gray-100 text font-semibold rounded-lg px-4 py-3 outline-2 outline-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <span className="ml-4 text-white">إرسـال</span>
                  </div>
                </button>
              </form>
            )}
          </div>

          {/*  */}

          <div className="flex-1 w-[100%] h-[100vh] flex justify-center items-center relative">
            <div
              className={
                dir === "ltr"
                  ? "absolute lg:w-[30%] sm:w-[30%] lg:h-[65%] sm:h-[50%] bg-[#E4C189] -z-[10] lg:top-[20px] sm:top-[100px] lg:left-[10px] sm:right-[0px]"
                  : "absolute lg:w-[30%] sm:w-[30%] lg:h-[65%] sm:h-[50%] bg-[#E4C189] -z-[10] lg:top-[20px] sm:top-[100px] lg:left-[10px] sm:left-[0px]"
              }
            ></div>
            <div className=" lg:w-[80%] lg:h-[80%] sm:w-[90%] sm:h-[60%]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d634.0013811751327!2d49.12067139261173!3d14.532088105942686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3de8e7a7ef4a3659%3A0x805ca06a13dfebf5!2z2YXYudmH2K8g2KjYsdmK2YXZitmI2YUgTUlJIFByZW1pdW0!5e0!3m2!1sar!2s!4v1719749824322!5m2!1sar!2s"
                width="600"
                height="450"
                className="border-0 w-full h-full shadow-[0_05px_20px_0px_rgba(0,0,0,0.3)]"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <>
          {dir === "ltr" ? (
            <>
              <div className=" w-full h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                <div className="flex-1 w-[100%] h-full flex justify-center items-center relative">
                  <div className="absolute w-[30%] h-[65%] bg-[#E4C189] -z-[10] top-[20px] right-[10px]"></div>
                  <div className="w-[80%] h-[80%]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d634.0013811751327!2d49.12067139261173!3d14.532088105942686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3de8e7a7ef4a3659%3A0x805ca06a13dfebf5!2z2YXYudmH2K8g2KjYsdmK2YXZitmI2YUgTUlJIFByZW1pdW0!5e0!3m2!1sar!2s!4v1719749824322!5m2!1sar!2s"
                      width="600"
                      height="450"
                      className="border-0 w-full h-full shadow-[0_05px_20px_0px_rgba(0,0,0,0.3)]"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
                <div className="flex-1 w-[100%] h-full">
                  {dir === "ltr" ? (
                    <form onSubmit={handleSubmit} className="px-10 text-end">
                      <div>
                        <label className="block text-balck font-black text-lg mb-2 mt-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          id=""
                          dir="ltr"
                          placeholder="Enter Name ..."
                          className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                            errors.name ? "border-red-500" : "border-[#CCA972]"
                          } focus:bg-white placeholder:text-start focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}

                        <div>
                          <label className="block text-balck font-black text-lg mb-2 mt-1">
                            Title
                          </label>

                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            id=""
                            dir="ltr"
                            placeholder="Enter Title ..."
                            className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                              errors.title
                                ? "border-red-500"
                                : "border-[#CCA972]"
                            } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                          />
                          {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.title}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-balck font-black text-lg mb-2 mt-1">
                            Email Address
                          </label>

                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            id=""
                            dir="ltr"
                            placeholder="Email Address ... "
                            className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                              errors.email
                                ? "border-red-500"
                                : "border-[#CCA972]"
                            } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-balck font-black text-lg mb-2 mt-1">
                          Details
                        </label>

                        <textarea
                          name="details"
                          value={formData.details}
                          onChange={handleChange}
                          id=""
                          rows={10}
                          cols={40}
                          dir="ltr"
                          placeholder="Enter Details ... "
                          className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                            errors.details
                              ? "border-red-500"
                              : "border-[#CCA972]"
                          } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                        />
                        {errors.details && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.details}
                          </p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full block mt-3 shadow-[0_05px_20px_5px_rgba(204,169,114,0.3)] bg-black hover:bg-[#cca972] focus:bg-gray-100 text font-semibold rounded-lg px-4 py-3 outline-2 outline-gray-500"
                      >
                        <div className="flex items-center justify-center">
                          <span className="ml-4 text-white">Send</span>
                        </div>
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit} className="px-10 text-start">
                      <div>
                        <label className="block text-balck font-black text-lg mb-2 mt-1">
                          الاسم
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          id=""
                          dir="rtl"
                          placeholder="ادخل الاسم ..."
                          className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                            errors.name ? "border-red-500" : "border-[#CCA972]"
                          } focus:bg-white placeholder:text-start focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}

                        <div>
                          <label className="block text-balck font-black text-lg mb-2 mt-1">
                            الموضوع
                          </label>

                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            id=""
                            dir="rtl"
                            placeholder="ادخل الموضوع ..."
                            className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                              errors.title
                                ? "border-red-500"
                                : "border-[#CCA972]"
                            } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                          />
                          {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.title}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-balck font-black text-lg mb-2 mt-1">
                            البريد الإلكتروني
                          </label>

                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            id=""
                            dir="rtl"
                            placeholder="البريد الإلكتروني ..."
                            className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                              errors.email
                                ? "border-red-500"
                                : "border-[#CCA972]"
                            } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-balck font-black text-lg mb-2 mt-1">
                          التفاصيل
                        </label>

                        <textarea
                          name="details"
                          value={formData.details}
                          onChange={handleChange}
                          id=""
                          rows={10}
                          cols={40}
                          dir="rtl"
                          placeholder="ادخل التفاصيل ..."
                          className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                            errors.details
                              ? "border-red-500"
                              : "border-[#CCA972]"
                          } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                        />
                        {errors.details && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.details}
                          </p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full block shadow-[0_05px_20px_5px_rgba(204,169,114,0.3)] bg-black hover:bg-[#cca972] focus:bg-gray-100 text font-semibold rounded-lg px-4 py-3 outline-2 outline-gray-500"
                      >
                        <div className="flex items-center justify-center">
                          <span className="ml-4 text-white">إرسـال</span>
                        </div>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className=" w-full h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                <div className="flex-1 w-[100%] h-full">
                  <form onSubmit={handleSubmit} className="px-10 text-start">
                    <div>
                      <label className="block text-balck font-black text-lg mb-2 mt-1">
                        الاسم
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        id=""
                        dir="lrt"
                        placeholder="ادخل الاسم ..."
                        className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                          errors.name ? "border-red-500" : "border-[#CCA972]"
                        } focus:bg-white placeholder:text-start focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}

                      <div>
                        <label className="block text-balck font-black text-lg mb-2 mt-1">
                          الموضوع
                        </label>

                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          id=""
                          dir="lrt"
                          placeholder="ادخل الموضوع ..."
                          className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                            errors.title ? "border-red-500" : "border-[#CCA972]"
                          } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                        />
                        {errors.title && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-balck font-black text-lg mb-2 mt-1">
                          البريد الإلكتروني
                        </label>

                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          id=""
                          dir="lrt"
                          placeholder="البريد الإلكتروني ... "
                          className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                            errors.email ? "border-red-500" : "border-[#CCA972]"
                          } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-balck font-black text-lg mb-2 mt-1">
                        التفاصيل
                      </label>

                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        id=""
                        rows={10}
                        cols={40}
                        dir="lrt"
                        placeholder="التفاصيل ... "
                        className={`w-full px-4 py-3 rounded-lg bg-white mt-2 border-2 ${
                          errors.details ? "border-red-500" : "border-[#CCA972]"
                        } focus:bg-white focus:outline-none focus:text-[#818080] placeholder:text-[#818080]`}
                      />
                      {errors.details && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.details}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full block mt-3 shadow-[0_05px_20px_5px_rgba(204,169,114,0.3)] bg-black hover:bg-[#cca972] focus:bg-gray-100 text font-semibold rounded-lg px-4 py-3 outline-2 outline-gray-500"
                    >
                      <div className="flex items-center justify-center">
                        <span className="ml-4 text-white">إرسـال</span>
                      </div>
                    </button>
                  </form>
                </div>
                <div className="flex-1 w-[100%] h-full flex justify-center items-center relative">
                  <div className="absolute w-[30%] h-[65%] bg-[#E4C189] -z-[10] top-[20px] left-[10px]"></div>
                  <div className="w-[80%] h-[80%]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d634.0013811751327!2d49.12067139261173!3d14.532088105942686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3de8e7a7ef4a3659%3A0x805ca06a13dfebf5!2z2YXYudmH2K8g2KjYsdmK2YXZitmI2YUgTUlJIFByZW1pdW0!5e0!3m2!1sar!2s!4v1719749824322!5m2!1sar!2s"
                      width="600"
                      height="450"
                      className="border-0 w-full h-full shadow-[0_05px_20px_0px_rgba(0,0,0,0.3)]"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
