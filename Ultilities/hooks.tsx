import { useLayoutEffect, useState } from "react"

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