import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";
export function Dashboard() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("mention", data => {
      console.log(data)
      setResponse(data);
    });
  }, []);

  return (
    <p>
      hello
    </p>
  );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
