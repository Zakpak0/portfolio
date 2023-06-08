import type { Metadata } from 'next'
import { withProviders } from 'lib/v1/Providers'
import { LayoutParams } from "app/layout"
import { CmsHomePage } from 'app/[lang]/cms/cms-home-page'
import { fields } from 'lib/v1/Cms'

const CmsHome = async function ({ params, dictionary }: { params: LayoutParams, dictionary: any }) {
    return (
        <CmsHomePage {...{ fields }} />
    )
}
export default withProviders(CmsHome)

export const metadata: Metadata = {
    title: 'Zakhary Oliver | Software Developer',
    icons: '/favicon.ico'
}