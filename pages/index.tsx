import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Zakhary from "../images/zakhary.jpg"

const Home: NextPage = () => {
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
            justifyContent: 'space-evenly',
            display: 'flex',
            flexDirection: 'row',
            width: "80%",
            alignItems: "center",
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
          </div>
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
      <div>
        Recent Courses
      </div>
      <div>
        Projects
      </div>
    </div>
  )
}

export default Home
