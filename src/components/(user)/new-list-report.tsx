import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "src/lib/http";
import NewsCardReports from "./newCards-report";
export interface sidInfo {
  id: number;
  ar_Title: string;
  en_Title: string;
  img: string;
  date_of_publish: Date;
}
export default function NewsListReport() {
  const { data: sideInfos } = useQuery({
    queryKey: ["sideInfosREpostsInfoList"],
    queryFn: () => getApi<sidInfo[]>(`/api/website/Reports/ReadMore/5`),
  });
  return (
    <div className="rounded-lg border m-2  divide-y-2">
      {sideInfos?.data.map((item) => (
        <NewsCardReports key={item.ar_Title} {...item} />
      ))}
    </div>
  );
}

export const dataNews = [
  {
    title: "إطلاق تقنية جديدة للذكاء الاصطناعي",
    description:
      "شركة عالمية تعلن عن إطلاق تقنية جديدة تعتمد على الذكاء الاصطناعي لتحسين الخدمات.",
    imgUrl: require("../../assets/img/news_1.jpg"),
  },
  {
    title: "زيادة في أسعار النفط العالمية",
    description:
      "شهدت أسعار النفط ارتفاعاً كبيراً نتيجة لتوترات جيوسياسية في المنطقة.",
    imgUrl: require("../../assets/img/news_1.jpg"),
  },
  {
    title: "اكتشاف أدوية جديدة لعلاج الأمراض النادرة",
    description:
      "علماء يعلنون عن اكتشاف أدوية مبتكرة لعلاج الأمراض النادرة والمزمنة.",
    imgUrl: require("../../assets/img/news_1.jpg"),
  },
  {
    title: "ارتفاع كبير في مبيعات الهواتف الذكية",
    description:
      "الشركات التقنية تسجل زيادة في مبيعات الهواتف الذكية خلال الربع الأخير من العام.",
    imgUrl: require("../../assets/img/news_1.jpg"),
  },
];
