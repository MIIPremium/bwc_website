import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { TbBrandX } from "react-icons/tb";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addWriterSchema } from "src/types/validation";
import { z } from "zod";
import Label from "src/ui/label";
import { Input } from "src/ui/input";
import { Button } from "../../ui/button";
import { useMutation } from "@tanstack/react-query";
import { patchApi, postApi } from "src/lib/http";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Textarea } from "src/ui/textarea";
import { useTranslation } from "react-i18next";

import { MultiSelect } from "primereact/multiselect";

type WriterFormValue = z.infer<typeof addWriterSchema>;

interface WriterResponse {
  data: {
    id: number; // Define the type of the id
    ar_fullName: string;
    en_fullName: string;
    ar_description: string;
    en_description: string;
    ar_role: string;
    en_role: string;
    soicalmedia: { id: number; name: string; url: string; writerId: number }[];
  };
}
interface City {
  name: string;
  code: string;
}
export default function AddWriterForm() {
  const [selectedCities, setSelectedCities] = useState<City[]>([]);

  const cities: City[] = [
    { name: "Instagram", code: "instagram" },
    { name: "WhatsApp", code: "whatsapp" },
    { name: "X (Twitter)", code: "X" },
    { name: "LinkedIn", code: "linkedin" },
    { name: "Facebook", code: "facebook" },
  ];

  const getIconByCode = (code: string) => {
    switch (code) {
      case "instagram":
        return <FaInstagram className="text-pink-500" size={20} />;
      case "whatsapp":
        return <FaWhatsapp className="text-green-500" size={20} />;
      case "X":
        return <TbBrandX className="text-black" size={20} />;
      case "linkedin":
        return <FaLinkedin className="text-blue-600" size={20} />;
      case "facebook":
        return <FaFacebook className="text-blue-500" size={20} />;
      default:
        return null;
    }
  };

  const isSelected = (code: string): boolean => {
    return selectedCities.some((city) => city.code === code);
  };
  const {  i18n } = useTranslation();
  const dir = i18n.dir();
  const navigate = useNavigate();
  const [_preview, setPreview] = useState<string | null>(null);

  const [socialMediaFields, setSocialMediaFields] = useState<
    { name: string; url: string }[]
  >([]);
 
  const handleSocialMediaChange = (name: string, url: string) => {
    setSocialMediaFields((prev) => {
      const updatedFields = prev.map((item) =>
        item.name === name ? { name, url } : item
      );
      return updatedFields.some((item) => item.name === name)
        ? updatedFields
        : [...updatedFields, { name, url }];
    });
  };

  const form = useForm<z.infer<typeof addWriterSchema>>({
    resolver: zodResolver(addWriterSchema),
  });

  const {
    mutate: firstMutate,
    isError: _firstIsError,
    isSuccess: _firstIsSuccess,
    isPending: _firstIsPending,
  } = useMutation<WriterResponse, Error, WriterFormValue>({
    mutationKey: ["AddWriter"],
    mutationFn: async (datas: WriterFormValue) => {
      const formData = new FormData();
      formData.append("Ar_fullName", datas.Ar_fullName);
      formData.append("En_fullName", datas.En_fullName);
      formData.append("Ar_description", datas.Ar_description);
      formData.append("En_description", datas.En_description);
      formData.append("Ar_role", datas.Ar_role);
      formData.append("En_role", datas.En_role);

      if (datas.ImageFile) {
        formData.append("ImageFile", datas.ImageFile[0]);
      }

      // First API call to create a writer
      return postApi("/api/Writers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      const writerId = data.data.id;
      

      if (writerId && socialMediaFields.length > 0) {
        
        secondMutate({
          id: writerId,
          Soicalmedia: socialMediaFields,
        });
      } else {
        console.warn("Writer ID or socialMediaFields is missing.");
      }
    },
    onError: (error) => {
      toast.error("لم تتم العميله.", {
        style: {
          border: "1px solid  #FF5733 ",
          padding: "16px",
          color: " #FF5733 ",
        },
        iconTheme: {
          primary: " #FF5733 ",
          secondary: "#FFFAEE",
        },
      });
    },
  });

  const {
    mutate: secondMutate,
    isError: _secondIsError,
    isSuccess: _secondIsSuccess,
    isPending: _secondIsPending,
  } = useMutation({
    mutationKey: ["SocialMedia"],
    mutationFn: (datas: {
      id: number;
      Soicalmedia: { name: string; url: string }[];
    }) => {
      

      // Send the array of social media objects directly as the body
      return patchApi(`/api/Writers/${datas.id}`, datas.Soicalmedia);
    },
    onSuccess: (data) => {
     
      toast.success("تمت الاضافة بنجاح.", {
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
      navigate("/admin-dashboard/writer");
      window.location.reload();
    },
    onError: (error) => {
      
      toast.error("لم تتم العميله.", {
        style: {
          border: "1px solid  #FF5733 ",
          padding: "16px",
          color: " #FF5733 ",
        },
        iconTheme: {
          primary: " #FF5733 ",
          secondary: "#FFFAEE",
        },
      });
    },
  });

  const onSubmit = (datas: WriterFormValue) => {
    firstMutate(datas);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      {dir === "ltr" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]   w-[100%] bg-[#f2f2f2] "
          >
            {
              <>
                <div className=" float-start col-span-1  flex h-[70px] flex-col ml-10">
                  <label className="text-md text-left mb-2 block font-bold text-gray-950">
                    Writer Photo
                  </label>
                  <FormField
                    control={form.control}
                    name="ImageFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              handleFileChange(e); // Set the preview and form data
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-3"></div>
              </>
            }
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="الاسم الكامل " />
                <FormField
                  control={form.control}
                  name="Ar_fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"الاسم الكامل "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="ادخل الاسم الكامل ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                dir="ltr"
                className="text-end col-span-1 h-auto translate-y-10"
              >
                <Label text="المسمئ الوظيفي" />
                <FormField
                  control={form.control}
                  name="Ar_role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"المسمئ الوظيفي"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="ادخل المسمئ الوظيفي"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                dir="ltr"
                className="text-Start col-span-1 h-auto translate-y-10"
              >
                <Label text="social media" />
                <div className="card flex justify-center items-center py-6">
                  <div className="w-full p-2 -translate-y-6 max-w-md bg-white border-2 border-gray-300 rounded-lg shadow-lg">
                    <MultiSelect
                      dir="rtl"
                      value={selectedCities}
                      onChange={(e) => setSelectedCities(e.value)}
                      options={cities}
                      optionLabel="name"
                      placeholder="Select social media"
                      maxSelectedLabels={1}
                      className="w-full"
                      panelClassName="rounded-md bg-white px-2 shadow-lg border-2 translate-y-[8px] border-gray-300 translate-x-[8px] "
                      itemTemplate={(option) => {
                        // Ensure option is defined
                        if (!option) return null;

                        const isItemSelected = isSelected(option.code);

                        return (
                          <div
                            className={`flex items-center justify-between gap-2 shadow-inner shadow-gray-400/40 mb-1  w-[370px] p-2 rounded-lg cursor-pointer transition-all ${
                              isItemSelected
                                ? "bg-gray-200"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {/* Render the icon */}
                            <i>{getIconByCode(option.code)}</i>
                            <span className="text-lg">
                              {option.name.toLowerCase()}
                            </span>
                          </div>
                        );
                      }}
                      selectedItemTemplate={(option) => {
                        // Ensure option is defined
                        if (!option) return null;

                        return (
                          <div className="flex items-center gap-2">
                            {getIconByCode(option.code)}{" "}
                            {/* Render the icon in selected items */}
                            <span>{option.name.toLowerCase()}</span>
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {selectedCities.length === 0 ? (
              <></>
            ) : (
              <div className="grid grid-cols-5 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
                {/* Instagram Input Field */}
                {isSelected("instagram") && (
                  <div className="text-start col-span-1 h-auto translate-y-10">
                    <label>Instagram</label>
                    <Input
                      placeholder="Enter Instagram URL"
                      onChange={(e) =>
                        handleSocialMediaChange("Instagram", e.target.value)
                      }
                    />
                  </div>
                )}

                {/* WhatsApp Input Field */}
                {isSelected("whatsapp") && (
                  <div className="text-start col-span-1 h-auto translate-y-10">
                    <label>WhatsApp</label>
                    <Input
                      placeholder="Enter WhatsApp URL"
                      onChange={(e) =>
                        handleSocialMediaChange("WhatsApp", e.target.value)
                      }
                    />
                  </div>
                )}

                {/* X (Twitter) Input Field */}
                {isSelected("X") && (
                  <div className="text-start col-span-1 h-auto translate-y-10">
                    <label>X (Twitter)</label>
                    <Input
                      placeholder="Enter X (Twitter) URL"
                      onChange={(e) =>
                        handleSocialMediaChange("X", e.target.value)
                      }
                    />
                  </div>
                )}

                {/* LinkedIn Input Field */}
                {isSelected("linkedin") && (
                  <div className="text-start col-span-1 h-auto translate-y-10">
                    <label>LinkedIn</label>
                    <Input
                      placeholder="Enter LinkedIn URL"
                      onChange={(e) =>
                        handleSocialMediaChange("LinkedIn", e.target.value)
                      }
                    />
                  </div>
                )}

                {/* Facebook Input Field */}
                {isSelected("facebook") && (
                  <div className="text-start col-span-1 h-auto translate-y-10">
                    <label>Facebook</label>
                    <Input
                      placeholder="Enter Facebook URL"
                      onChange={(e) =>
                        handleSocialMediaChange("Facebook", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-start">
                  full name
                </label>
                <FormField
                  control={form.control}
                  name="En_fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"full name"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <label htmlFor="" className="float-start">
                  role
                </label>
                <FormField
                  control={form.control}
                  name="En_role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"role"}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter role..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* TODO:Textarea */}
            <div className="grid grid-cols-3  w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-3 h-auto translate-y-10">
                <Label text="عن الكتاب" />
                <FormField
                  control={form.control}
                  name="Ar_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"عن الكتاب"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          dir="rtl"
                          className="bg-white border-2 border-[#d1d5db] rounded-xl"
                          rows={5}
                          {...field}
                          placeholder="ادخل عن الكتاب..."
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 w-[100%] mt-10 px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-3 h-auto translate-y-10">
                <label htmlFor="" className="float-start">
                  about writer
                </label>
                <FormField
                  control={form.control}
                  name="En_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"about writer"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-white border-2 border-[#d1d5db] rounded-xl"
                          rows={5}
                          {...field}
                          placeholder="Enter about writer ..."
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full -translate-x-10 flex justify-end mt-20">
              <Button className=" mb-10 inline-flex h-10 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-lg font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Add
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-[90vh]   w-[100%] bg-[#f2f2f2] "
          >
            <div className=" grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]">
              {/* <label className="text-md mb-2 block font-bold text-gray-950">
            صورة الكاتب
          </label> */}

              <div className=" col-span-1 h-auto translate-y-10">
                <FormField
                  control={form.control}
                  name="ImageFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image</FormLabel>
                      <FormControl>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            field.onChange(e.target.files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="الاسم الكامل " />
                <FormField
                  control={form.control}
                  name="Ar_fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"الاسم الكامل "}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل الاسم الكامل ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" col-span-1 h-auto translate-y-10">
                <Label text="المسمئ الوظيفي" />
                <FormField
                  control={form.control}
                  name="Ar_role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"المسمئ الوظيفي"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل المسمئ الوظيفي" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                dir="ltr"
                className="text-Start col-span-1 h-auto translate-y-10"
              >
                <Label text="الحسابات الشخصية" />
                <div className="card flex justify-center items-center py-6">
                  <div className="w-full p-2 -translate-y-6 max-w-md  bg-white border border-gray-300 rounded-lg shadow-lg">
                    <MultiSelect
                      dir="rtl"
                      value={selectedCities}
                      onChange={(e) => setSelectedCities(e.value)}
                      options={cities}
                      optionLabel="name"
                      placeholder="اختار الحساب"
                      maxSelectedLabels={1}
                      className="w-full"
                      panelClassName="rounded-md bg-white px-2 shadow-lg border-2 translate-y-[8px] border-gray-300 -translate-x-[8px]"
                      itemTemplate={(option) => {
                        // Ensure option is defined
                        if (!option) return null;

                        const isItemSelected = isSelected(option.code);

                        return (
                          <div
                            className={`flex items-center justify-between gap-2 w-[370px] shadow-inner shadow-gray-400/40 mb-1 p-2 rounded-lg cursor-pointer transition-all ${
                              isItemSelected
                                ? "bg-gray-200"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {/* Render the icon */}
                            <i>{getIconByCode(option.code)}</i>
                            <span className="text-lg">
                              {option.name.toLowerCase()}
                            </span>
                          </div>
                        );
                      }}
                      selectedItemTemplate={(option) => {
                        // Ensure option is defined
                        if (!option) return null;

                        return (
                          <div className="flex items-center gap-2">
                            {getIconByCode(option.code)}{" "}
                            {/* Render the icon in selected items */}
                            <span>{option.name.toLowerCase()}</span>
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {selectedCities.length === 0 ? (
              <></>
            ) : (
              <div className="grid grid-cols-5 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
                {/* Instagram Input Field */}
                {isSelected("instagram") && (
                  <div className=" text-end col-span-1 h-auto translate-y-10">
                    <label>Instagram</label>
                    <Input
                      dir="ltr"
                      placeholder="Enter Instagram URL"
                      onChange={(e) =>
                        handleSocialMediaChange("Instagram", e.target.value)
                      }
                    />
                  </div>
                )}

                {/* WhatsApp Input Field */}
                {isSelected("whatsapp") && (
                  <div className="text-end col-span-1 h-auto translate-y-10">
                    <label>WhatsApp</label>
                    <Input
                      dir="ltr"
                      placeholder="Enter WhatsApp URL"
                      onChange={(e) =>
                        handleSocialMediaChange("WhatsApp", e.target.value)
                      }
                    />
                  </div>
                )}

                {/* X (Twitter) Input Field */}
                {isSelected("X") && (
                  <div className="text-end col-span-1 h-auto translate-y-10">
                    <label>X (Twitter)</label>
                    <Input
                      dir="ltr"
                      placeholder="Enter X (Twitter) URL"
                      onChange={(e) =>
                        handleSocialMediaChange("X", e.target.value)
                      }
                    />
                  </div>
                )}

                {/* LinkedIn Input Field */}
                {isSelected("linkedin") && (
                  <div className="text-end col-span-1 h-auto translate-y-10">
                    <label>LinkedIn</label>
                    <Input
                      dir="ltr"
                      placeholder="Enter LinkedIn URL"
                      onChange={(e) =>
                        handleSocialMediaChange("LinkedIn", e.target.value)
                      }
                    />
                  </div>
                )}

                {/* Facebook Input Field */}
                {isSelected("facebook") && (
                  <div className="text-end col-span-1 h-auto translate-y-10">
                    <label>Facebook</label>
                    <Input
                      dir="ltr"
                      placeholder="Enter Facebook URL"
                      onChange={(e) =>
                        handleSocialMediaChange("Facebook", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className="text-end col-span-1 h-auto translate-y-10">
                <Label text="role" />
                <FormField
                  control={form.control}
                  name="En_role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">{"role"}</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="Enter role..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-end col-span-1 h-auto translate-y-10">
                <Label text="full name" />
                <FormField
                  control={form.control}
                  name="En_fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"full name"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="Enter full name..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <div className=" col-span-1 h-auto translate-y-10">
            <Label text="instgram" />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-900">{"full name"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.instagram.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
            </div>

            {/* TODO:Textarea */}
            <div className="grid grid-cols-3 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className=" col-span-3 h-auto translate-y-10">
                <Label text="عن الكتاب" />
                <FormField
                  control={form.control}
                  name="Ar_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"عن الكتاب"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-white border-2 border-[#d1d5db] rounded-xl"
                          rows={5}
                          {...field}
                          placeholder="ادخل عن الكتاب..."
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 mt-10 w-[100%] px-10 items-start gap-4 text-right h-[20vh]  ">
              <div className="text-end col-span-3 h-auto translate-y-10">
                <Label text="about writer" />
                <FormField
                  control={form.control}
                  name="En_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-900">
                        {"about writer"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          dir="ltr"
                          className="bg-white border-2 border-[#d1d5db] rounded-xl"
                          rows={5}
                          {...field}
                          placeholder="Enter about writer ..."
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full translate-x-10 flex justify-end mt-20">
              <Button className="text-md mb-10 inline-flex h-10 items-center  justify-center whitespace-nowrap rounded-lg bg-[#000] px-10 py-2 text-sm font-bold text-white ring-offset-background transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                إضافة
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
