import React, { Component } from 'react'
import { connect } from 'react-redux'

export const Navbar = () => {
  return (
    <nav className="position-relative twit-navbar " >
      <ul className="nav-list list-unstyled text-center " >
        <li className="mb-3" > <i className="fa text-danger fa-diamond"></i> </li>
        <li> <i className="fa  fa-clock-o"></i> </li>
        <li> <i className="fa  fa-home"></i> </li>
        <li> <i className="fa  fa-users"></i> </li>
        <li> <i className="fa  fa-comments-o"></i> </li>
        <li> <i className="fa  fa-credit-card"></i> </li>


      </ul>
      <ul className="mt-auto list-unstyled text-center" >
        <li> <i className="fa  fa-life-ring"></i> </li>
        <li> <img className="rounded-circle" height="30rem" src="https://pbs.twimg.com/profile_images/454295427777454080/bJKO2OZ1_bigger.jpeg" alt="" /> </li>

      </ul>

    </nav>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
