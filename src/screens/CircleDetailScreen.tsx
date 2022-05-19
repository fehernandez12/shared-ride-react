import React from "react";
import { CircleDetail } from "../components/Circles/CircleDetail";

function CircleDetailScreen(props: any) {
  const {
    navigation,
    route: { params },
  } = props;

  return <CircleDetail slug={params.slug} />;
}

export { CircleDetailScreen };
