import Head from "next/head"
import React from "react"

interface MetaProps {
  title: string
}

const Meta = ({ title }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default Meta
