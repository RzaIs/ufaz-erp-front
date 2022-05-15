import React from 'react'
import UserContextProvider from './UserContext'

function ContextController({children}) {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}
export default ContextController