import { useEffect, useState } from "react";
import useWindow from "./useWindow";

export default function useHost() {
    const safe = useWindow()
    const [host, setHost] = useState({
        name: "",
        resolved: false
    });
    useEffect(() => {
        if (safe) {
            const pathname = window.location.pathname.replace("/", "")
            const hostname = window.location.href.replace(pathname, "")
            setHost({
                ...host,
                name: hostname,
                resolved: true
            })
        }
    }, [safe])
    return host
}