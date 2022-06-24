import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Zakhary from "../images/zakhary.jpg"
import Discord from "../images/discord-brands.svg"
import Github from "../images/github-brands.svg"
import Linkedin from "../images/linkedin-brands.svg"
import NGHBR from "../images/NGHBR.jpg"
import { useNavLinks, useProjects } from "../Ultilities/hooks"
import ProjectThumbnail from '../components/ProjectThumbnail'
import CourseThumbnail from '../components/CourseThumbnail'
import Header from '../components/Header'

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
      { link: 'https://www.linkedin.com/in/zakhary-oliver-81141b211/', icon: Linkedin }
    ]
  }
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center"
      }}
    >
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
        {/* <div
          style={{
            padding: 20,
            display: 'flex',
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              justifyContent: 'space-evenly',
              alignItems: "center",
              display: 'flex',
              flexDirection: 'row',
              maxWidth: 800
            }}
          >
            <div
            >
              <h1>Hi, I am Zakhary, a Full Stack Developer</h1>
              <h2>React | React Native | Node.js</h2>
              <p
                style={{
                }}
              >Diverse Software Engineer cultured in the agile process with a strong command of in demand skill sets.
                Contributed ideas and solutions that consistently impressed seniors by combining their critique with initiative
                and knowledge to create polished final products. Created internal and external tools using web programming
                technologies such as Javascript, React, HTML/HTML5, CSS/CSS3, Node.js, JSON and Mongodb. Cracked
                challenging problems for seniors by analysing and applying documentation to live code. Has been instrumental
                in identifying requirements and meeting production standards of code implementation, documentation and
                demonstration.</p>
            </div>
            <div
            >
              <Image
                height={243}
                width={243}
                style={{
                  borderRadius: '100%'
                }}
                layout="fixed"
                src={Zakhary}
              />
            </div>
          </div>
        </div> */}
        <a
          download='Zakhary Oliver Resume'
          href={downloadLink}
          ref={downloadResumeRef}
          style={{ display: "hidden" }}
        >
        </a>
        <Header {...me} />
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
