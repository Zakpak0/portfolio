import { Metadata } from "next"
import { NghbrHomePage } from "app/[lang]/nghbr/nghbr-home-page"
import { LayoutParams } from "app/layout"
import { withProviders } from "lib/v1/Providers"



const Nghbr = async function ({ params, dictionary }: { params: LayoutParams, dictionary: any }) {
    return (
        <NghbrHomePage />
    )
}
export default withProviders(Nghbr)

export const metadata: Metadata = {
    title: 'Zakhary Oliver | Software Developer',
    icons: '/favicon.ico'
}