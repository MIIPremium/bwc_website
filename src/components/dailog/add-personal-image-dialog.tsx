import React, { useState } from "react";
import axios from "axios";
import { Button } from "./../../ui/button";
import Label from "./../../ui/label";
import uploader from "../../assets/img/uploader.png";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DraggableDialogContent,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { FileUp, User, X } from "lucide-react";
import { toast } from "../../ui/use-toast";
// import { env } from "~/env";
interface AddPersonalImageDialogProps {
  setPersonalPhoto: (name: string) => void;
  personalPhoto: string | undefined;
}
const serverUrl = "https://mahfoudsabbah-001-site1.jtempurl.com";
const filesApiUrl = "/api/Writers";

export default function AddPersonalImageDialog({
  setPersonalPhoto,
  personalPhoto,
}: AddPersonalImageDialogProps) {
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [savedImageName, setSavedImageName] = useState<string | undefined>(
    undefined
  );
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [_imagePrev, setImagePrev] = useState<string | null>(null);
  const handleRemoveClick = async () => {
    if (files) {
      const response = await axios.post(serverUrl + filesApiUrl, {
        paths: [savedImageName && savedImageName],
      });

      if (response.status === 201) {
        setImagePrev(null);
        setFiles(undefined);
        setPersonalPhoto("");

        toast({
          title: "اشعار",
          variant: "success",
          description: "تم الحذف بنجاح...",
        });
      } else
        toast({
          title: "اشعار",
          variant: "destructive",
          description: "لم يتم الحذف...",
        });
    }
  };
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    inputFiles && setFiles(inputFiles);
    setIsUploaded(false);
  };
  const renderImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePrev(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const uploadImage = async () => {
    const headers = { "Content-Type": "multipart/form-data" };
    const form = new FormData();
    if (files) {
      form.append("file", files[0] as Blob);

      const { data, status }: { data: { path: string }; status: number } =
        await axios.post(
          serverUrl + filesApiUrl + "uploads\\profileImages\\",
          form,
          {
            headers,
          }
        );

      if (status === 201) {
        setPersonalPhoto(data.path);
        setSavedImageName(data.path);
        toast({
          title: "اشعار",
          variant: "success",
          description: "تم الرفع بنجاح...",
        });

        setIsUploaded(true);
        const file = files[0];
        if (file) renderImage(file);
      }
    }
  };

  return (
    <div className="col-span-1  ">
      <div className="  flex  max-w-fit items-center justify-center rounded-lg   ">
        <Dialog>
          <DialogTrigger className=" rounded bg-white  text-red-900 hover:border hover:bg-[rgb(250,250,250)] disabled:pointer-events-none disabled:opacity-50">
            {personalPhoto ? (
              <img
                src={serverUrl + "/" + personalPhoto}
                alt={"employee image"}
                width={100}
                height={100}
                className="max-h-[100px]"
              />
            ) : (
              <User size={120} />
            )}
          </DialogTrigger>
          <DraggableDialogContent className="w-96 bg-[#f2f2f2]">
            <DialogHeader>
              <DialogTitle className="handle mr-5 text-right">
                إضافة الصورة الشخصية
              </DialogTitle>
              <div className="grid grid-cols-1 p-4 pt-10 text-right">
                <Label text=" صورة شخصية" />
                <div className="mt-4 flex  flex-col items-center justify-end gap-2 rounded-lg border-2 border-dashed border-black">
                  <img src={uploader} alt={""} width={160} height={160} />
                  <p className="text-sm">يمكنك إضافة صورة واحدة فقط</p>

                  <label
                    htmlFor="personal-image-input"
                    className=" bg-black text-white inline-flex h-10 items-center justify-center  whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow ring-offset-background transition-colors hover:cursor-pointer hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    استعراض الملفات
                  </label>

                  <div className="col-span-1 h-auto">
                    <Input
                      type="file"
                      multiple={false}
                      className="hidden"
                      id="personal-image-input"
                      onChange={(e) => {
                        handelChange(e);
                      }}
                    />
                  </div>
                </div>
                {isUploaded && files && (
                  <div className="mt-4 flex items-center justify-center gap-2  rounded-lg bg-gray-200 p-1.5 px-2 ">
                    <FileUp size={30} />
                    <div className="flex-grow">
                      <div className="flex justify-between text-sm ">
                        {files?.[0]?.name}
                      </div>
                    </div>
                    <Button
                      size={"icon"}
                      type="button"
                      className="mr-2 h-6 w-6  rounded-full bg-gray-500 p-1  text-white hover:bg-red-700"
                      // onClick={() => {
                      //   void handleRemoveClick();
                      // }}
                    >
                      <X size={20} />
                    </Button>
                  </div>
                )}
                <div className="col-span-1">
                  <div className="border-b-1 mb-5 mt-5 border border-gray-300"></div>
                  <Button
                    className="w-full bg-black text-white"
                    form="personalForm"
                    onClick={async () => {
                      files && (await uploadImage());
                    }}
                  >
                    حفظ الإضافات
                  </Button>
                </div>
              </div>
            </DialogHeader>
          </DraggableDialogContent>
        </Dialog>
      </div>
    </div>
  );
}
