import React, { Suspense, lazy, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './components/Header'
import {BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import NotLiveRoute from 'react-live-route'
import { ApolloProvider } from '@apollo/client'
import client from './client'

const LiveRoute = withRouter(NotLiveRoute)
const HomePage = lazy(() => import('./components/home'))
const LocalityPage = lazy(() => import('./components/locality'))
const AboutPage = lazy(() => import('./components/about'))
const HospitalPage = lazy(() => import('./components/hospital'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))

const ContentWrapper = styled.div`
  max-width: 1500px;
  margin: auto;
`

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`

function App() {
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')  
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <Router>
        <GlobalStyle />    
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <ContentWrapper>
            <Switch>
              <Route exact path="/about/">
                <AboutPage />
              </Route>
              <Route exact path="/hospital/:hospitalId/">
                <HospitalPage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/:localityName/" />
              <Route component={NotFoundPage} />
            </Switch>
            <LiveRoute exact alwaysLive={true}
              path="/:localityName/"
              render={props => (
                <LocalityPage {...props}/>
              )}
            />
          </ContentWrapper>
        </Suspense>
      </Router>
    </ApolloProvider>
  )
}

export default App
