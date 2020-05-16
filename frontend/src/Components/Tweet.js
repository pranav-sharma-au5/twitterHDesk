import React, { Component } from 'react'
import { connect } from 'react-redux'

export const Tweet = ({ tweet, setCenterData }) => {
  return (
    <div onClick={() => setCenterData(tweet)} className="row mb-1 mx-0 rounded border-3px py-2" >
      <div className="col-2">
        <img className="rounded-circle" height="20rem" src={tweet.user.profile_image_url} alt="" />
      </div>

      <div className="col-10 ">
        <h6 className="text-capitalize" >{tweet.user.name}</h6>
        <p className="text-truncate tweet-content" >
          {tweet.text}
        </p>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet)
