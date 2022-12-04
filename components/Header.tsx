import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import React, { ReactElement, useState } from "react"
import Job from "../images/job.png"
import Location from "../images/location.png"
type thisType = ({ image, name, occupation, location, skills, resume }: { image: StaticImageData, name: string, occupation: string, location: string, skills: [], resume: Function, socials: [] }) => JSX.Element

const Header: thisType = ({ image, name, occupation, location, skills, resume, socials }) => {
    const meta = [{ icon: Job, label: occupation }, { icon: Location, label: location }]
    const MetaTag = ({ icon, label }: { icon: StaticImageData, label: string }) => {
        return (
            <div
                style={{
                    height: 16,
                    width: "max-content",
                    marginLeft: 15,
                    display: "flex",
                    flexDirection: "row"
                }}
            >
                <Image
                    height={16}
                    width={16}
                    src={icon}
                />
                <p
                    style={{
                        marginLeft: 5,
                        color: "#A0ABB8",
                        fontSize: "12px",
                        fontWeight: 1000,
                        lineHeight: "16px",
                    }}>
                    {label}
                </p>
            </div>
        )
    }
    const ChipTag = ({ label }: { label: string }) => {
        return (
            <div
                style={{
                    height: 32, width: "max-content",
                    padding: 18,
                    marginLeft: 10,
                    backgroundColor: "rgba(81, 146, 255, 0.12)",
                    borderRadius: "50px",
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <p
                    style={{
                        color: "#727272",
                        fontSize: "14px",
                        lineHeight: "12px",
                        fontWeight: 500
                    }}
                >
                    {label}
                </p>
            </div>
        )
    }
    const SocialTag = ({ link, icon }: { link: string, icon: StaticImageData }) => {
        return (
            <Link

                href={link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image src={icon} height={18} width={18} />
            </Link>
        )
    }
    return (
        <div
            style={{
                zIndex: 20,
                height: 173,
                width: 867,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: 'center'
                }}
            >
                <Image
                    height={130}
                    width={130}
                    style={{
                        borderRadius: "100%"
                    }}
                    src={image}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 10,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: "center",
                        }}
                    >
                        <h3
                            className='font-bold text-lg'
                            style={{
                                fontSize: "18px",
                                lineHeight: "22px",
                                color: "#37404E",
                                textShadow: "2px 2px #0000",
                                marginLeft: 10
                            }}
                        >{name}</h3>
                        <div
                            style={{
                                marginLeft: 2,
                                marginBottom: -6,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                width: "20%",
                                alignItems: "center"
                            }}
                        >
                            {socials.map(social => <SocialTag {...social} />)}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10
                        }}
                    >
                        {
                            meta.map(tag => <MetaTag {...tag} />)
                        }
                    </div>
                    <div
                        style={{
                            width: 700,
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: 10,
                                alignItems: "center"
                            }}
                        >
                            {
                                skills.map(label => <ChipTag label={label} />)
                            }
                        </div>
                        <div
                            className="cursor-pointer"
                            style={{

                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <button
                                onClick={resume}
                                className="hover:text-green-500 hover:bg-white bg-green-500 text-white"
                                style={{
                                    border: "1px solid rgba(1, 128, 0, 0.5)",
                                    borderRadius: "10px",
                                    width: 169,
                                    height: 49,
                                }}
                            >Download Resume</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header