import { Metadata } from "next"
import { NghbrPage } from "./nghbr-page"



const Nghbr = async function () {
    return (
        <NghbrPage />
    )
}
export default Nghbr

export const metadata: Metadata = {
    title: 'Zakhary Oliver | Software Developer',
    icons: '/Zak_Icon.ico'
}