import React from 'react'

const ApiKeyContext = React.createContext({
  apiKey: 'festaDoLivroUSP2024',
  setApiKey: () => {},
})

export const ApiKeyProvider = ApiKeyContext.Provider
export const ApiKeyConsumer = ApiKeyContext.Consumer

export default ApiKeyContext
