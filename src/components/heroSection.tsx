import React from "react";
import CarouselsHeroSection from "./carouselsHeroSection";
import sliderImagePlaceholder from "../assets/img/news_1.jpg";
import sliderImagePlaceholder1 from "../assets/img/news_2.jpg";

interface publish {
  imgs : string;
  title: string;
  publish_date: Date;
  writers?: {
    name?: string | undefined;
    img?: string | undefined;
  } | undefined;
}
const publishes: publish[] = [
  {
    imgs: sliderImagePlaceholder,
    title: "تعمل شركة عالم الأعمال للاستثمار والدراسات على تمكين المستثمرين وأصحاب الأعمال لإدارة وتشغيل مشاريعهم الاستثمارية في حضرموت وفق أحدث النظم والأساليب الإدارية الحديثة والمبتكرة",
    publish_date: new Date("2024-03-9"),
    // writers: { name: "حمود احمد سيف العطاس", img: writerImagePlaceholder },
  },
  {
    imgs: sliderImagePlaceholder1,
    title: "مدير عام بنك بن دول للتمويل الأصغر الإسلامي يزور شركة عالم الأعمال للاستثمار والدراسات وأكاديمية بريميوم للقيادة والإدارة. ",
    publish_date:new Date("2024-03-1"),
    // writers: { name: "حمود احمد سيف العطاس", img: writerImagePlaceholder },
  },
];
export default function HeroSection() {
  return (
    <div className="w-full  text-white text-center">
      <CarouselsHeroSection publishes={publishes} />
    </div>
  );
}
