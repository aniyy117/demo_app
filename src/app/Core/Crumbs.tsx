import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface CrumbsProps {
  breadcrumbData: any
}
const Crumbs = (props: CrumbsProps) => {
  const { breadcrumbData } = props;
  const [breadcrumbs, setBreadCrumbs] = useState<any>();

  useEffect(() => {
    const crumbs = breadcrumbData.map((data: any, index: any) => (
      <Link underline={data.underline} key={index} href={data.href}>
        {data.name}
      </Link>
    ));
    setBreadCrumbs(crumbs);
  }, [breadcrumbData]);

  // const { onClick } = props;
  return (
    <div className="Crumbs">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default Crumbs;
