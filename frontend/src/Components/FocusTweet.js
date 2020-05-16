import React, { Fragment } from 'react'
import { connect } from 'react-redux'

export const FocusTweet = ({ centerData: tweet }) => {
  return (
    <Fragment>
      {tweet.user &&
        <Fragment>

          <div className="row p-1 px-3 align-items-center border-bot mx-0 ">
            <div className="pr-3">
              <img className="rounded-circle" height="20rem" src={tweet.user.profile_image_url} alt="" />

            </div>
            <h6 className="m-0" >{tweet.user.name}</h6>
          </div>
          <p dangerouslySetInnerHTML={{ __html: tweet.text }} >

          </p>
          {tweet.entities.media && tweet.entities.media.length > 0 &&
            tweet.entities.media.map(elem =>
              <iframe width="100%" src={elem.media_url} frameborder="0"></iframe>
            )
          }

          <form action="" className="mt-auto px-4 p-2"  >
            <input type="text" placeholder="Reply..." className="form-control" />
          </form>

        </Fragment>
      }
    </Fragment>
  )

}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FocusTweet)
