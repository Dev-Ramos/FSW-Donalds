import { redirect } from 'next/navigation'

const InitialPage = async () => {
  
  redirect(process.env.NODE_ENV === 'production' ? '/fws-donalds' : 'http://localhost:3000/fsw-donalds')
}

export default InitialPage
