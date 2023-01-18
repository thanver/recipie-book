import LoginPage from './login'
import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter();

  const userToken = useMemo(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return '';
  }, [])
  useEffect(() => {
    if (userToken) {
      router.push('/dashboard');
    }
  }, [router, userToken])

  return (
    <>
      <LoginPage />
    </>
  )
}
