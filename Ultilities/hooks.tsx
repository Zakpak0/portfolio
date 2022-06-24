import { useLayoutEffect, useState } from "react"
import NGHBR from "../images/NGHBR.jpg"


//@ts-ignore
export const useNavLinks: {
    downloadLink: URL
    NGHBRLink: URL
    homeLink: URL
} = () => {
    const [windowAvailable, setWindowAvailable] = useState(false)
    const [basePath, setBasePath] = useState('')
    useLayoutEffect(() => {
        setWindowAvailable(true)
        const pathname = window.location.pathname.replace("/", "")
        const basePath = window.location.href.replace(pathname, "")
        setBasePath(basePath)
    }, [])
    const downloadLink = windowAvailable ? new URL(basePath + "files/Resume.pdf") : null
    const NGHBRLink = windowAvailable ? new URL(basePath + "nghbr") : null
    const homeLink = windowAvailable ? new URL(basePath) : null
    return {
        downloadLink,
        NGHBRLink,
        homeLink
    }
}

export const useProjects = () => {
    const { NGHBRLink } = useNavLinks()
    return [
        {
            link: NGHBRLink,
            image: NGHBR,
            title: "NGHBR",
            caption: "A React Native app built with Expo",
            description: ""
        }
    ]
}