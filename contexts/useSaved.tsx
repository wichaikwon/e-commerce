import { createContext, useContext, useEffect, useState } from 'react'

interface SavedContextType {
  saved: string[]
  setSaved: React.Dispatch<React.SetStateAction<string[]>>
  addToSaved: (id: string) => void
  removeFromSaved: (id: string) => void
}

const SavedContext = createContext<SavedContextType>({
  saved: [],
  setSaved: () => {},
  addToSaved: () => {},
  removeFromSaved: () => {},
})

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [saved, setSaved] = useState<string[]>(() => {
    const savedItems = localStorage.getItem('__savedItems')
    return savedItems ? JSON.parse(savedItems) : []
  })

  useEffect(() => {
    localStorage.setItem('__savedItems', JSON.stringify(saved))
  }, [saved])

  const addToSaved = (id: string) => {
    setSaved((prev) => [...prev, id])
  }
  const removeFromSaved = (id: string) => {
    setSaved((prev) => prev.filter((item) => item !== id))
  }
  return (
    <SavedContext.Provider value={{ saved, setSaved, addToSaved, removeFromSaved }}>{children}</SavedContext.Provider>
  )
}

export const useSaved = () => {
  const context = useContext(SavedContext)
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider')
  }
  return context
}
