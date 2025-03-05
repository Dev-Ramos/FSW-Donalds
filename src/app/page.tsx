'use client'

import { redirect } from "next/navigation"

const InitialPage = () => {
  const baseURL = window.location.origin.toString()
  const initialPage = `${baseURL}/fsw-donalds`
  redirect(`${initialPage}`)
}

export default InitialPage
