import { Pluralsight, } from "internals/utilities/api"
import type { Metadata } from 'next'
import { HomePage } from './home-page'
import { getDictionary } from "dictionaries"
import { LayoutParams } from "./layout"

const Home = async function ({ params }: { params: LayoutParams }) {
  const dictionary = await getDictionary(params?.lang)
  const courses = await Pluralsight.get.courses.completed()
  return (
    <HomePage pluralsight={courses} />
  )
}
export default Home

export const metadata: Metadata = {
  title: 'Zakhary Oliver | Software Developer',
  icons: '/Zak_Icon.ico'
}