import { createContext, ReactNode, useEffect, useState } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
//@ts-ignore
import {CLIENT_ID} from '@env' 
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession()

interface IUserProps {
  name: string
  avatarUrl: string
}

export interface IAuthContextDataProps {
  user: IUserProps  
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode 
}

export const AuthContext = createContext({} as IAuthContextDataProps)

export function AuthContextProvider({children}: IAuthProviderProps) {
  const [user, setUser] = useState<IUserProps>({} as IUserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn(){
    try {
      setIsUserLoading(true)  
      await promptAsync()

    } catch (error) {
      console.log(error)
      throw error  

    } finally {
      setIsUserLoading(false)

    }
  }

  async function signInWithGoogle(access_token: string){
    try {
      setIsUserLoading(true)
      const tokenResponse = await api.post('/users', {access_token})
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

      const userInfoResponse = await api.get('/me')
      setUser(userInfoResponse.data.user)

    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken){
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}