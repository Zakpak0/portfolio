import Image, { StaticImageData } from "next/image"
import React, { ReactElement } from "react"
type thisType = ({ link, image, title, caption, description }: { link: URL, image: StaticImageData, title: string, caption: string, description: string }) => JSX.Element

const ProjectThumbnail: thisType = ({ link, image, title, caption, description }: { link: URL, image: StaticImageData, title: string, caption: string, description: string }) => {
    console.log(caption)
    return (
        <div
            className="p-2 group transition duration-200
        ease-in transform sm:hover:scale-105 rounded-lg"
            style={{
                height: 537,
                width: 327,
                borderRadius: "26px",
                padding: 10,
                border: "0.875748px solid rgba(1, 128, 0, 0.5)"
            }}
        >
            <Image
                style={{
                    borderRadius: "26px",
                    height: "50%",
                    width: "50%"
                }}
                src={image}
            />
            <div className="p-2"
                style={{

                }}
            >
                <p className="truncate max-w-md">{title}</p>
                <h2 className='mt-1 text-2xl text-black transition-all
            duration-100 ease-in-out group-hover:font-bold'>
                    {caption}
                </h2>
                <p className="flex items-center">
                    {description}
                </p>
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
                        width: "100%",
                        height: 48,
                    }}
                >View</button>
            </div>
        </div>
    )
}

export default ProjectThumbnail