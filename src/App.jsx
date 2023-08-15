import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Webseries from './Webseries/webseries'
import WebseriesTable from './WebseriesTable/webseriesTable'
import Comment from './Comment/comment'
import WebseriesSearch from './Webseries search/webseriessearch'
import { useState } from 'react'
import Error from './error/error'

const App = () => {

  const [edit,setedit]=useState([])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Webseries edit={edit} />} />
          <Route path='/dashboardtable' element={<WebseriesTable  setedit={setedit} />} />
          <Route path='/websriessearch' element={<WebseriesSearch setedit={setedit}/>} />
          <Route path='/comment' element={<Comment />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
