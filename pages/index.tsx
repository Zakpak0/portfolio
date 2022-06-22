import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Zakhary from "../images/zakhary.jpg"
import Discord from "../images/discord-brands.svg"
import Github from "../images/github-brands.svg"
import Linkedin from "../images/linkedin-brands.svg"
import NGHBR from "../images/NGHBR.jpg"
import { useNavLinks } from "../Ultilities/hooks"

type SSR = {
  pluralsight: []

}

const Home: NextPage<SSR> = ({ pluralsight }) => {
  // Hook for grabbing URLs for use
  const { downloadLink, NGHBRLink } = useNavLinks()
  const downloadResumeRef = useRef(null)
  const downloadResume = () => {
    if (downloadResumeRef.current) {
      downloadResumeRef.current.click()
    } else {
      null
    }
  }
  return (
    <div>
      <div
        style={{
          padding: 20,

        }}
      >
        <div
          style={{
            padding: 20,
            display: 'flex',
            width: "80%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              justifyContent: 'space-evenly',
              alignItems: "center",
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                width: "50%",
              }}
            >
              <h1>Hi, I am Zakhary, a Full Stack Developer</h1>
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
              <button
                onClick={downloadResume}
                style={{
                  borderRadius: "0%",
                  color: "white",
                  backgroundColor: "#FF6464",
                  borderWidth: "0px",
                  height: "47px",
                  width: "200px",
                  cursor: "pointer"
                }}
              >
                Download Resume
              </button>
              <a
                download='Zakhary Oliver Resume'
                href={downloadLink}
                ref={downloadResumeRef}
                style={{ display: "hidden" }}
              >

              </a>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50%",
              }}
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
        </div>

        <div
          style={{
            alignItems: "center",
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div
            style={{
              width: 600,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  textAlign: "center",
                }}
              >Some of the Courses I've done</h3>
            </div>
            <div
              style={{
                boxShadow: "0px -1px 6px #000000",
                borderRadius: "10px",
                minHeight: 300,
                maxHeight: 300,
                justifyContent: "center"
                , display: 'flex',
                flexDirection: "column",
                overflow: "scroll",
                alignItems: "center",
                padding: 10
              }}
            >
              {pluralsight.map(({ title }) => {
                return (
                  <h4>{title}</h4>
                )
              })}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <a
              href='https://github.com/Zakpak0'
              target="_blank"
            >
              <Image src={Github} height={70} width={70} />
            </a>
            <a
              href='https://discord.com/users/Zakpak0#5264'
              target="_blank"
            >
              <Image src={Discord} height={70} width={70} />
            </a>
            <a
              href='https://www.linkedin.com/in/zakhary-oliver-81141b211/'
              target="_blank"
            >
              <Image src={Linkedin} height={70} width={70} />
            </a>
          </div>

        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div
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
              width: "60%",
              alignItems: 'center',
              display: "flex",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <a
              href={NGHBRLink}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "transparent",
                textDecoration: "none",
                alignItems: "center",
                color: "black"
              }}
            >
              <Image
                src={NGHBR}
                height={200}
                width={200}
              />
              <h3>NGHBR</h3>
              <h4>A React Native app built with Expo</h4>
            </a>
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
          slug
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
