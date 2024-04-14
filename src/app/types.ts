// src/app/types.ts
import { ParsedUrlQuery } from "querystring";

export interface PageProps {
  data: {
    ip: string[] | string | null | undefined;
  };
}

export interface Props {
  params: PageProps;
}

export interface Params extends ParsedUrlQuery {
  // define any necessary parameters here, if applicable
}
