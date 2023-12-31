import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { getUser } from '@/api/user'
import Cookies from 'js-cookie'


export function useUser({ redirectTo = '/login', redirectIfFound = false } = {}) {
  const { data, error } = useSWR(getUser.key, getUser)
  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)
  useEffect(() => {
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return error ? null : user
}