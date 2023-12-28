import React, { useEffect, useCallback, useState } from "react";
import { FaUser,FaPhone } from "react-icons/fa";
import ReactPlayer from "react-player";
import Peer from "../../Context/Peer";

import { useSocket } from "../../Context/SocketContext";
const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await Peer.getOffer();

    socket.emit("user:call", { to: remoteSocketId, offer });

    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await Peer.getAnswer(offer);
  
      socket.emit("call:accepted", { to: from, ans });
      sendStreams()
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      Peer.peer.addTrack(track, myStream);
    
    }
  }, [myStream]);
 function setMyStreamx(){

    socket.emit("end:call", { email:localStorage.getItem('remotecaller')});
    setRemoteStream(null)
    setMyStream(null)
    window.location.pathname=''

 }
 function endCall(email)

 {
    console.log(email.email)
    if(localStorage.getItem('emptype2')==='user'||localStorage.getItem('emptype2')==='super'){
      if(localStorage.getItem('siteuseremail')===email.email){
        setRemoteStream(null)
        setMyStream(null)
        alert('Call ended')
        window.location.pathname='siteuser'

     }

    }
    else{
      if(localStorage.getItem('username')===email.email){
        setRemoteStream(null)
        setMyStream(null)
        alert('Call ended')
        window.location.pathname=''

     }
    }
     
 }

useEffect(() => {

 socket.on("end:call", endCall);

return () => {
 
    socket.off("end:call", endCall);
}
}, [socket,endCall])

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      Peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await Peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    Peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      Peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await Peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await Peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    Peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);
useEffect(() => {
  if(remoteSocketId){
    handleCallUser()
  }

  return () => {
    
  }
}, [remoteSocketId])

  useEffect(() => {
    // Add an event listener for the beforeunload event
    const handleBeforeUnload = () => {
      Peer.closeConnection();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);



      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="noy">
      

      <h4></h4>
     
<div className="flw">

</div>
<div className="btww">

</div>
      {myStream && (
        <div className="noy2">
            <div className="noys">
            
            </div>
            {myStream&&
                <div className="noys" onClick={sendStreams}>
    <FaUser className="fas" />
    <p>{remoteSocketId ? "Connected" : "Ringing"}</p>
                </div>

             
            }
             <button onClick={
e=>setMyStreamx()
             } 
             className="endcall"><FaPhone /> </button>
          <ReactPlayer
            playing
            muted
            height="00px"
            width="00px"
            url={myStream}
          />
        </div>
      )}
      {remoteStream && (
        <div className="noy3">
     
          <ReactPlayer
            playing
         
            height="00px"
            width="00px"
            url={remoteStream}
          />
        </div>
      )}
    </div>
  );
};

export default RoomPage;