import "server-only";
import { headers } from "next/headers";
import { ApiRequest } from "lib/v1/ApiRequest";
import { LayoutParams } from "app/layout";
let path: string | null = "";
export const Dictionary = async function ({
  params,
}: {
  params: LayoutParams;
}) {
  try {
    path = headers()?.get("x-invoke-path");
  } catch (e) {
    console.log(e);
  }
  if (path && path.length > 0) {
    const segments = path
      .split("/")
      .filter((segment) => segment.length > 0 && segment != params?.lang)
      .join("/");
    const dictionary = await new ApiRequest({
      method: "GET",
      route: "dictionary",
      params: { segments },
    }).makeRequest();
    try {
      const json = await dictionary.json();
      return json?.content;
    } catch (e) {
      return null;
    }
  }
  return null;
};
