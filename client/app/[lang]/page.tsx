import { Pluralsight, } from "internals/utilities/api"
import type { Metadata } from 'next'
import { HomePage } from 'app/[lang]/home-page'
import { LayoutParams } from "app/layout"
import { withProviders } from "lib/v1/Providers"

const Home = async function ({ params, dictionary }: { params: LayoutParams, dictionary: any }) {
  const courses = await Pluralsight.get.courses.completed()
  return (
    <HomePage pluralsight={courses} />
  )
}
export default withProviders(Home)

export const metadata: Metadata = {
  title: 'Zakhary Oliver | Software Developer',
  icons: '/favicon.ico'
}