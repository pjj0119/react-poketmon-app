import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'

const App = () => {
  return (
	<BrowserRouter basename="/react-poketmon-app">
		<Routes>
			<Route path="/" element={<MainPage/>}></Route>
			<Route path="/pokemon/:id" element={<DetailPage/>}></Route>
		</Routes>
	</BrowserRouter>
  )
}

export default App