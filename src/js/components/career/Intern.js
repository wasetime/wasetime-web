import React, { useState, useEffect } from "react";

import { RowWrapper } from "../../styled-components/Wrapper";
import CareerCard from "./CareerInternCard";
import InternFilter from "./InternFilter";
import InternFilterModal from "./InternFilterModal";

const companyList = [
  {
    Title: "【面向工程师的医疗行业实习】",
    Request: "AWS/PHP技能",
    Field: 1,
    Language: 0,
    URL: "https://bit.ly/2YzPmUS",
    DEADLINE: "NONE",
    Corporation: "株式会社Precal",
    Payment: 0,
    Description:
      "【面向工程师的医疗行业实习】 【时薪1,300~1,800日元】 【可远程工作】【面向工程师的医疗行业实习】 【时薪1,300~1,800日元】 【可远程工作】",
  },
  {
    company: "株式会社ライジングコーポレーション",
    area: "福岡県 天神2分",
    pay: "時給1,200円～2,000円",
    worktime: "平日1日～",
    title:
      "【未経験者歓迎】【就活支援あり】実績2万件を有する事業でトップセールスを目指せるインターン!",
    description:
      "自由な働き方と整った環境でセールス力が身につく実践型インターン",
    type: ["不動産/建築", "商社"],
    category: "営業",
    image:
      "https://static.careerbaito.com/picture/corporation/2796/708_472/ZpKQ0P4d.jpg",
  },
  {
    company:
      "株式会社ライジングコーポレーション1株式会社ライジングコーポレーション11111111111111111111111",
    area: "福岡県 天神2分",
    pay: "時給1,200円～2,000円",
    worktime: "平日1日～",
    title:
      "【未経験者歓迎】【就活支援あり】実績2万件を有する事業でトップセールスを目指せるインターン!12312312312312312312",
    description:
      "自由な働き方と整った環境でセールス力が身につく実践型インターン",
    type: ["不動産/建築", "商社"],
    category: "営業",
    image:
      "https://static.careerbaito.com/picture/corporation/2796/708_472/ZpKQ0P4d.jpg",
  },
  {
    company: "株式会社ライジングコーポレーション3",
    area: "福岡県 天神2分",
    pay: "時給1,200円～2,000円",
    worktime: "平日1日～",
    title:
      "【未経験者歓迎】【就活支援あり】実績2万件を有する事業でトップセールスを目指せるインターン!",
    description:
      "自由な働き方と整った環境でセールス力が身につく実践型インターン",
    type: ["不動産/建築", "商社"],
    category: "営業",
    image:
      "https://static.careerbaito.com/picture/corporation/2796/708_472/ZpKQ0P4d.jpg",
  },
];

//Field: 1. MAKER 2. SERVICE  3. FINANCE  4. OFFICE   5. IT    6. CONSULTING
//Language: 1.JP  2.EN  3. Bilingual
//DEADLINE: in the form of DD/MM/YY
//Payment: 1. OVER 1000    2. OVER 2000    3. OVER 3000      4. OTHERS

const InternList = () => {
  const [browserWidth, setBrowserWidth] = useState(document.body.clientWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleBrowserWidth);
    return () => {
      window.removeEventListener("resize", handleBrowserWidth);
    };
  }, [browserWidth]);

  const handleBrowserWidth = () => {
    setBrowserWidth(document.body.clientWidth);
  };

  const lists = companyList.map((company) => {
    return <CareerCard careerInformation={company} key={company.company} />;
  });

  return (
    <RowWrapper>
      <div>
        <div>{lists}</div>
      </div>
      {browserWidth > 1220 ? <InternFilter /> : <InternFilterModal />}
    </RowWrapper>
  );
};

export default InternList;
