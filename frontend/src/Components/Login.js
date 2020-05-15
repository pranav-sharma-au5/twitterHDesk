import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from "react-router-dom";
// import axios from "axios";
import { Redirect } from 'react-router-dom';
export class Login extends Component {

  componentDidMount() {
    // const req = axios.get("https://localhost:3001/id")

  }

  render() {
    const { location } = this.props
    const [, token, tokenSecret] = location.search.split('&')

    return (
      <div>
        {token &&
          <Redirect to="dashboard" />
        }
        <form action="" >

          <a href="http://localhost:3001/login" >Login</a>
          <a href="http://localhost:3001/register" >Register</a>
        </form>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
