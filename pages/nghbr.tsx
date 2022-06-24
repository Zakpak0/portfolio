import { NextPage } from "next";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { useNavLinks } from "../Ultilities/hooks";
import BackArrow from "../images/chevron-left-solid.svg"
import Head from "next/head";

const NGHBR: NextPage = () => {
    //@ts-ignore
    const { homeLink } = useNavLinks()

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Head>
                <title>Zakhary Oliver | Software Developer</title>
                <link rel="icon" href="/Zak_Icon.ico" />
            </Head>
            <a
                href={homeLink}
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "transparent",
                    textDecoration: "none",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    color: "blue"
                }}
            >
                <Image
                    src={BackArrow}
                    height={20}
                    width={20}
                />
                Back</a>
            <iframe
                src="https://appetize.io/embed/3sjww6tlle5zdwgcstw5bf3ini?device=iphone8"
                //@ts-ignore
                width="378px" height="800px" frameborder="0" scrolling="no"></iframe>
        </div>
    )
}

export default NGHBR