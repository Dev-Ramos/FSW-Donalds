import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const InitialPage = async() => {
  const origin = (await headers()).get('origin') as string
  redirect(`${origin}/fsw-donalds`)
}

export default InitialPage
