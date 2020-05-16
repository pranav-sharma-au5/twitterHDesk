import React from 'react'

export default function Header() {
  return (
    <header className="row mx-0  mb-5 " >
      <div className="col">
        <button className="btn-sm btn " >Updates</button>
      </div>

      <div className="ml-auto  col-3 " >
        <div className="row justify-content-between">

          <button className="btn-sm btn " >Session:34minutes</button>
          <button className="btn-sm btn " >User:Pranav</button>
        </div>
      </div>

    </header>
  )
}
