import { useEffect, useState } from "react"

export default function useWindow() {
    const [window, setWindow] = useState(false)
    useEffect(() => {
        setWindow(true)
    }, [])
    return window
}