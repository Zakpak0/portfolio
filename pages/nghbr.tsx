import { NextPage } from "next";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { useNavLinks } from "../Ultilities/hooks";
import BackArrow from "../images/chevron-left-solid.svg"
import Login from "../images/Login.png"
import SignUp from "../images/Signup.png"
import Aroundme from "../images/Aroundme.png"
import Head from "next/head";

const NGHBR: NextPage = () => {
    //@ts-ignore
    const { homeLink } = useNavLinks()

    const gallery = [Login, SignUp, Aroundme]

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {gallery.map((image, index) => {
                    return (
                        <div style={{
                            marginLeft: index > 0 && 20
                        }}>
                            <Image

                                src={image}
                                height={406}
                                width={190}
                            />
                        </div>

                    )
                })}
            </div>
            <iframe
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: "solid"
                }}
                src="https://appetize.io/embed/3sjww6tlle5zdwgcstw5bf3ini?device=iphone8"
                //@ts-ignore
                width="378px" height="800px" frameborder="0" scrolling="no"></iframe>
        </div>
    )
}

export default NGHBR