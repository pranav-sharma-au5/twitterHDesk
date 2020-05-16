import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client";
import Navbar from "./Navbar";
import Header from "./Header";
import Tweet from './Tweet';
import FocusTweet from './FocusTweet';


const ENDPOINT = "http://localhost:3001";
export function Dashboard() {
  const [response, setResponse] = useState([]);
  const [centerData, setCenterData] = useState({})

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("mention", data => {
      console.log("runs twice")
      setResponse(oldTweets => [data, ...oldTweets]);
    });

  }, []);

  return (
    <div className="dashboard-container" >
      <Navbar />
      <div className="main-content " >
        <Header />

        <div className="row mx-0 mb-4 " >
          <h3>Conversations</h3>
          <input type="text" className="form-control col-2" placeholder="Quick Search" />
          <button className="btn-sm btn " >
            <i className="fa fa-filter"></i>
            Filter
          </button>
          <button className="ml-auto btn btn-sm" >Online</button>
        </div>

        <div className="row flex-1 justify-content-between mx-0">
          <div className="tweets-container">
            {response.length > 0 &&
              response.map((tweet, index) => (
                <Tweet setCenterData={setCenterData} tweet={tweet} index={index} />
              )
              )}
            <div className="row">
              <hr />
              Expired chats
              <hr />
            </div>
            {/* {[1, 2].map(el => (
              <Tweet />
            )
            )} */}

          </div>

          <div className=" border-3px rounded center-space">
            <div className="col-9  focus-container">
              <FocusTweet centerData={centerData} />

            </div>
            <div className="col-3 d-flex flex-column p-0 ">
              {
                // centerData.user &&
                <Fragment>

                  <div className="border-bot flex-3 " >
                    <div className="flex-column d-flex align-items-center px-5 pt-5  " >


                      <div className="rounded-circle tweet-profile"
                        style={{
                          backgroundImage: `url(${"https://pbs.twimg.com/profile_images/454295427777454080/bJKO2OZ1_normal.jpeg".replace("_normal", "")})`
                        }} alt="" />
                      <h6 className="p-0 m-0" >Pranav Sharma</h6>
                      <p className="text-success" >Online</p>


                    </div>
                    <div className="row justify-content-around mb-2 px-5" >
                      <button className="btn btn-sm btn-outline-dark" > Follow </button>
                      <button className="btn btn-sm btn-outline-dark" > Message </button>
                    </div>
                    <div className="p-2 extra-details ">

                      <div className="row mb-2  ">
                        <div className="col-6">Followers</div>
                        <div className="col-6 text-right">2</div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-6">Following</div>
                        <div className="col-6 text-right ">20</div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-6">Friends</div>
                        <div className="col-6 text-right ">0</div>
                      </div>
                    </div >
                  </div>
                  <div className="flex-1 p-2 extra-details " >
                    <div className="row mb-2">
                      <div className="col-6">Quote Count</div>
                      <div className="col-6 text-right">0</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6">Reply Count</div>
                      <div className="col-6 text-right ">0</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6">Retweet Count</div>
                      <div className="col-6 text-right ">0</div>
                    </div>
                  </div>
                </Fragment>
              }
            </div>
          </div>


        </div>




      </div>



    </div >
  );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
