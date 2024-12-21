
import React from "react";
import authorImgUrl from "../../assets/img/Profile.png";
export default function Author() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="">
        <img
          src={authorImgUrl} // Replace with actual image path
          alt="Report cover"
          className=" object-contain "
        />
      </div>
      <span className="text-base font-bold">حمود عبدالرقيب احمد سيف</span>
    </div>
  );

}
