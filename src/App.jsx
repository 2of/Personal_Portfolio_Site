import { useState } from 'react'
import './App.scss'
// import { routes } from './routes'
import { routes } from './routes'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { ContextWrapper } from './contexts/APP_ContextWrapper'

const AppContent = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  )
}


const ContextWrap = () => { 

}

function App() {
  return (
    <BrowserRouter>
    <ContextWrapper>

   <AppContent />
    </ContextWrapper>
   
      
      {/* <h2>test</h2> */}
    </BrowserRouter>
  )
}

export default App
