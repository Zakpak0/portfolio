'use client'
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme, useMediaQuery, AspectRatioProps } from "@chakra-ui/react";
import { Lato } from 'next/font/google'
import { Fragment } from "react";

type TMediaQuery<V> = {
  mobile: V;
  tablet: V;
  web: V;
  tv: V;
};
export const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ['latin'],
});

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-lato)",
    body: "var(--font-lato)",
  },
});

export const Style = <style jsx global>
  {`
:root {
--font-lato: ${lato.style.fontFamily};
}
`}
</style>

export function ChakraUI({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      {Style}
      <CacheProvider>
        <ChakraProvider theme={theme} >
          {children}
        </ChakraProvider>
      </CacheProvider>
    </Fragment>
  )
}

export interface MediaQueryState {
  mobile: boolean[];
  tablet: boolean[];
  web: boolean[];
  tv: boolean[];
}

export interface MediaQueryHook {
  queries: MediaQueryState;
  enumX<P>(x: TMediaQuery<P>): P;
  enumCss<P = CSS>(x: TMediaQuery<P>): P;
  enumQuery(): keyof MediaQueryState | "";
}

export type CSS = React.CSSProperties

export function useMQ(): MediaQueryHook {
  const mobile = useMediaQuery(`(max-width: 640)`);
  const tablet = useMediaQuery([`(min-width: 641)`, `(max-width: 739)`]);
  const web = useMediaQuery([`(minWidth: 740)`, `(maxWidth: 1110)`]);
  const tv = useMediaQuery(`(minWidth: 1111)`);
  const queries = {
    mobile: mobile,
    tablet: tablet,
    web: web,
    tv: tv,
  };
  function runQuery<P>(x: TMediaQuery<P>): P {
    for (const [key, value] of Object.entries(queries)) {
      if (value[0] == true) {
        return x[key as keyof typeof x];
      }
    }
    return x.mobile;
  }
  function enumQuery() {
    for (const [key, value] of Object.entries(queries)) {
      if (value[0] == true) {
        return key as keyof MediaQueryState;
      }
    }
    return "";
  }
  function enumX<P>(x: TMediaQuery<P>): P {
    return runQuery<P>(x);
  }
  function enumCss<P = CSS>(x: TMediaQuery<P>): P {
    return runQuery<P>(x);
  }

  return {
    queries,
    enumX,
    enumCss,
    enumQuery,
  };
}

