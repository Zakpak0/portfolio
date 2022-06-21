import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Zakhary from "../images/zakhary.jpg"


const Home: NextPage = () => {
  const downloadResumeRef = useRef(null)
  const downloadResume = () => {
    if (downloadResumeRef.current) {
      downloadResumeRef.current.click()
    } else {
      null
    }
  }
  const downloadLink = new URL(window.location.href + "files/Resume.pdf")
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        height: "100vh",
      }}
    >
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
              <h1>Hi, I am Zakhary,</h1>
              <h1>a Full Stack Developer</h1>
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
                justifyContent: "center"
                , display: 'flex'
              }}
            >
              {[{ title: "title" }].map(({ title }) => {
                return (
                  <h4>{title}</h4>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          Projects
        </div>
      </div>

    </div>
  )
}

export default Home
