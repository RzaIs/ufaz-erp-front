import React, { useState, createContext, useContext } from 'react'

const userContext = createContext()

export const Role = {
  admin : 1,
  teacher : 2,
  student : 3
} 

const defaultUserSate = {
  logged: false,
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  token: "",
  group: "",
  role: null
}

function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    let backup = JSON.parse(localStorage.getItem("userContext"))
    if (backup !== null) return backup
    else return defaultUserSate
  })

  const setUserData = (data) => {
    setUser(data)
    localStorage.setItem("userContext", JSON.stringify(data))
  }

  const clearUser = () => setUserData(defaultUserSate)

  return (
    <userContext.Provider value={{ user: user, setUser: setUserData, clearUser: clearUser }} >
      {children}
    </userContext.Provider>
  )
}

export const useUserContext = () => useContext(userContext)
export default UserContextProvider