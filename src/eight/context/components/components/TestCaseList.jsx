import React, { createContext, useContext, useState } from 'react'

const LoadingContext = createContext()

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const showLoading = () => setLoading(true)
  const hideLoading = () => setLoading(false)

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div className="loading-spinner"></div>
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
