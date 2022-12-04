import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react'
import {Zakhary, Discord, Github, Linkedin} from "internals/images"
import { useNavLinks, useProjects } from "internals/hooks"
import {ProjectThumbnail, CourseThumbnail} from "components/elements"
import {Header, Overview} from "components/sections"
import Link from 'next/link'

type SSR = {
  pluralsight: []

}

const Home: NextPage<SSR> = ({ pluralsight }) => {
  // Hook for grabbing URLs for use
  //@ts-ignore
  const { downloadLink, NGHBRLink } = useNavLinks()
  const projects = useProjects()
  const downloadResumeRef = useRef(null)
  const downloadResume = () => {
    if (downloadResumeRef.current) {
      //@ts-ignore
      downloadResumeRef.current.click()
    } else {
      null
    }
  }
  const me = {
    name: "Zakhary Oliver",
    skills: ["React", "React Native", "Node.js"],
    image: Zakhary,
    occupation: "Software Developer",
    location: "Maui, Hawai'i",
    resume: downloadResume,
    socials: [
      { link: 'https://github.com/Zakpak0', icon: Github },
      { link: 'https://discord.com/users/Zakpak0#5264', icon: Discord },
      { link: 'https://www.linkedin.com/in/zakhary-oliver-81141b211/', icon: Linkedin },
    ]
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        position: "relative"
      }}
    >
      <Overview />
      <Head>
        <title>Zakhary Oliver | Software Developer</title>
        <link rel="icon" href="/Zak_Icon.ico" />
      </Head>
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          download='Zakhary Oliver Resume'
          href={downloadLink}
          ref={downloadResumeRef}
          style={{ display: "hidden" }}
        >
        </Link>
        <Header {...me} />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
            margin: 10,
            marginTop: 0,
            boxSizing: "border-box",
            backgroundColor: "whitesmoke",
            boxShadow: "0px 8.76px 26.28px rgba(31, 31, 51, 0.06)",
          }}
        >
          <div
            className='font-bold text-2xl'
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex"
            }}>
            <h3>
              My Projects
            </h3>
          </div>
          <div
            style={{
              width: "100%",
              alignItems: 'center',
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              padding: 20,
              boxSizing: "border-box",
            }}
          >
            {
              projects.map(project => <ProjectThumbnail {...project} />)
            }
          </div>
        </div>
        <div
          className='font-bold text-2xl'
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex"
          }}>
          <h3
            style={{
              fontWeight: "bold",
              width: "100%",
              textAlign: "center",
            }}
          >Some of the Courses I've completed</h3>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr",
            gap: "10px 10px",
            maxHeight: 500,
            width: "100%",
            overflowY: "scroll",
            alignItems: "center",
            justifyItems: "center",
            padding: 30
          }}
        >
          {pluralsight.map((course) => <CourseThumbnail {...course} />)}
        </div>
      </div>

    </div>
  )
}
export default Home
export const getServerSideProps: GetServerSideProps<SSR> = async (context) => {
  const pluralsight = await (async () => {
    return await fetch("https://app.pluralsight.com/profile/data/completedcourses/83b81959-5219-4864-a1f6-00bfa47c976f").then(res => res.json()).then((courses) => {
      return courses.map((course: { level: string, authors: [{ displayName: string }], title: string, timeCompleted: string, slug: string }) => {
        let { level, authors, title, timeCompleted, slug } = course;
        let { displayName } = authors[0];
        return {
          level,
          displayName,
          title,
          timeCompleted,
          slug,
          site: { name: "Pluralsight", website: "https://www.pluralsight.com/" }
        }
      });
    })
  })()
  return {
    props: {
      pluralsight
    }
  }
}
