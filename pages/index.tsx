import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div
      style={{
        padding: 20
      }}
    >
      <div
        style={{
          padding: 20,
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div>
          <h1>Hi, I am Zakhary,</h1>
          <h1>a Full Stack Developer</h1>
        </div>
      </div>
    </div>
  )
}

export default Home
