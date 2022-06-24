import Image, { StaticImageData } from "next/image"
import React, { ReactElement, useState } from "react"
type thisType = ({ displayName, level, timeCompleted, title, slug, site: { name, website } }: { displayName: string, level: string, timeCompleted: string, title: string, slug: string, site: { name: string, website: string } }) => JSX.Element

const CourseThumbnail: thisType = ({ displayName, level, timeCompleted, title, slug, site: { name, website } }) => {
    const [error, setError] = useState(false)
    const image = !error ? `https://pluralsight.imgix.net/course-images/${slug}-v1.jpg` : `https://pluralsight.imgix.net/course-images/${slug}-v1.png`
    const link = `https://www.pluralsight.com/courses/${slug}`
    const date = new Date(timeCompleted).toDateString()
    const meta = [{ label: "Instructor", title: displayName }, { label: "Course Level", title: level }, { label: "Date Completed", title: date }]
    const MetaTag = ({ label, title }: { label: string, title: string }) => {
        return (
            <div
                style={{
                    height: 16,
                    width: "max-content",
                    marginLeft: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <p
                    style={{
                        marginLeft: 3,
                        color: "#A0ABB8",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16px"
                    }}
                >
                    {label}:
                </p>
                <p
                    style={{
                        marginLeft: 5,
                        color: "#A0ABB8",
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px"
                    }}>
                    {title}
                </p>
            </div>
        )
    }
    return (
        <div
            className="p-2 group transition duration-200
        ease-in transform sm:hover:scale-105 hover:z-50 rounded-lg"
            style={{
                height: 230,
                width: 642,
                borderRadius: "10px",
                padding: 15,
                border: "1px solid rgba(1, 128, 0, 0.5)",
                boxShadow: "0px 8.76px 26.28px rgba(31, 31, 51, 0.06)"
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
                    height={72}
                    width={72}
                    style={{
                        borderRadius: "100%"
                    }}
                    src={image}
                    onError={() => setError(true)}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 10
                    }}
                >
                    <h3
                        className='font-bold text-lg'
                        style={{
                            fontSize: "18px",
                            lineHeight: "22px",
                            color: "#37404E"
                        }}
                    >{title}</h3>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10
                        }}
                    >
                        <a
                            style={{
                                color: "rgba(1, 128, 0, 0.5)",
                                fontWeight: "bold",
                                fontSize: "15px",
                                lineHeight: "16px"
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={website}>{name}</a>
                    </div>
                </div>

            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10
                }}
            >
                {
                    meta.map(tag => <MetaTag {...tag} />)
                }
            </div>
            <div
                className="cursor-pointer"
                style={{

                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "column",

                    marginTop: 40
                }}
            >
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        open(link, "_blank")
                    }}
                    className="text-green-500 hover:bg-green-500 hover:text-white"
                    style={{
                        border: "1px solid rgba(1, 128, 0, 0.5)",
                        borderRadius: "10px",
                        width: "50%",
                        height: 48,
                    }}
                >View</button>
            </div>
        </div>
    )
}

export default CourseThumbnail