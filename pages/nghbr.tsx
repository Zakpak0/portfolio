import { NextPage } from "next";
import Image from "next/image";
import { useNavLinks } from "internals/hooks";
import {BackArrow, Login, SignUp, Aroundme} from "internals/images"
import Head from "next/head";
import Link from "next/link";

const NGHBR: NextPage = () => {
    //@ts-ignore
    const { homeLink } = useNavLinks()

    const gallery = [Login, SignUp, Aroundme]

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginRight: "auto",
                flexDirection: "row"
            }}
        >
            <Head>
                <title>Zakhary Oliver | Software Developer</title>
                <link rel="icon" href="/Zak_Icon.ico" />
            </Head>
            <Link
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
                Back</Link>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <h1
                        className="font-bold text-2xl text-center"
                    >Try it out</h1>
                    <div
                        style={{ display: "flex", flexDirection: "row", padding: 30, width: "100%", alignItems: "center", justifyContent: "space-evenly" }}
                    >
                        <p className="font-semibold text-lg pr-10">
                            Login Credentials :
                        </p>
                        <div className="h-20 flex flex-col justify-around">
                            <p>Username: Mockuser1@gmail.com</p>
                            <p>Password: 123Mockuser!</p>
                        </div>
                    </div>
                </div>
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
            </div>
            <iframe
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 29,
                }}
                src="https://appetize.io/embed/zwvlwx7mppljbkr3gduk776usq?device=iphone8"
                //@ts-ignore
                width="378px" height="800px" frameborder="0" scrolling="no"></iframe>
        </div>
    )
}

export default NGHBR