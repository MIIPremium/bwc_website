import React from "react";
import authorImgUrl from "../../assets/img/Profile.png";
export default function AuthorCard() {
  return (
    <div className="flex items-center gap-x-2  p-4 rounded-lg border border-[#D2D2D2] ">
      <div className=" flex flex-col items-center gap-y-2">
        <img
          src={authorImgUrl} // Replace with actual image path
          alt="Report cover"
          className=" object-contain "
        />
        <span className="text-xs font-bold text-[#D5AE78] text-nowrap">
          حمود العطاس
        </span>
        <span className="text-[10px] font-bold text-nowrap">كاتب صحفي</span>
      </div>
      <p className="p-6">
        حمود سيف العطاس هو كاتب ومعلم متعاقدة ونائب شعب الرجل في نادي الشحر
        الأدبي. أصدر مجموعة قصصية فازت بجائزة رئيس الجمهورية وجائزة الشيخة حنان
        باحمدان للإبداع.
      </p>
    </div>
  );
}
