import "server-only";
import { LayoutParams } from "app/layout";
import { Dictionary } from "lib/v1/Dictionary";
import { ChakraUI } from "lib/v1/Theme";
export const withProviders = function (Component: any) {
  return async function ({ params }: { params: LayoutParams }) {
    const dictionary = Dictionary({ params })
    return (
      <ChakraUI>
        <Component {...{ ...params, dictionary }} />
      </ChakraUI>
    )
  }
};
