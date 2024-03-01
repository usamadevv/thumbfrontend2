import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { tz } from '../../apis'

const Tasks = () => {
    const [companies, setcompanies] = useState([])
    const [tasks, settasks] = useState([])
   useEffect(() => {
    axios.get(`${tz}/client/getall`).then(res => {
        console.log(res)
        setcompanies(res.data.Client)
    })
    axios.get(`${tz}/task/getall`).then(res => {
        console.log(res)
        settasks(res.data.Tasks)
    })
   
     return () => {
       
     }
   }, [])
   
    const [taskname, settaskname] = useState('')
    const [taskno, settaskno] = useState('')
    const [taskcompany, settaskcompany] = useState('')
    const [taskid, settaskid] = useState('')
    function deletedata() {

        console.log(ind)
    
        var r = ind.split('4sd')
        r[r.length - 1] = r[r.length - 2]
        console.log(r)
        tasks.forEach((element, index) => {
            if (index === tasks.length - 1) {

            
                axios.post(`${tz}/task/delete`, {
                    ids: r   
                             }).then(res => {
                    console.log(res)
               
                    axios.get(`${tz}/task/getall`).then(res2 => {
                        console.log(res2)
                        settasks(res2.data.Tasks)
                        setind('')

                    })
                })
            } else {

                if (ind.search(' ' + index.toString() + ' ') >= 0) {
               
                    r.push(element._id)



                }
            }

        });


    }
    function addtask(){
        axios.post(`${tz}/task/add`, {

            clientid: taskid,
            clientname:taskcompany,
            name: taskname,
            status:'Active',
            description: taskno,}).then(res=>{
console.log(res)


axios.get(`${tz}/task/getall`).then(res2 => {
    console.log(res2)
    settasks(res2.data.Tasks)
    setind('')
    settaskname('')
settaskno('')

})


            })
    }

    function allemps(val) {
        var t = val.split('eiuka')
    
        settaskcompany(t[0])
        settaskid(t[2])
    }
    const [ind, setind] = useState('')
    function addindex(index,val) {
        if (ind.search(val._id) >= 0) {

            console.log(ind)
            setind(ind.replace(val._id + '4sd', '')) 
        }
        else {

            setind(ind + val._id + '4sd')
            console.log(ind)
        }


    }
  return (
    <div className="tasktable">
        <h4>Task management</h4>
        <div className="taskadd">
            <input type="text" value={taskname} onChange={e=>settaskname(e.target.value)} placeholder='Task name' />
            <input type="text" value={taskno} onChange={e=>settaskno(e.target.value)}  placeholder='Task no' />
        
            <select onChange={e => allemps(e.target.value)}>

<option >Choose Company</option>

{
    companies && companies.map(val => (

        <option value={val.username + 'eiuka' + val.markup + 'eiuka' + val._id + 'eiuka' + val.address+ 'eiuka' + val.weekend}>{val.username}</option>
    ))
}
</select>
          
        
{taskname&&taskcompany&&taskno?
    <button onClick={e=>addtask()} >+ Add task</button>:
    <button className='nullg' >+ Add task</button>

}
<button className='nullgr' onClick={e=>deletedata()}>Delete</button>
        </div>
        <div className="newst">
        <div className="tablerow hideonmobile tablef" id='tablerow'>
                                   <div className="subtable">
                                       <div className="headertable clop">
                                           <h2 className='sxx'> Select</h2>
                                           <h1 style={{
                                            width:'100px'
                                           }}>Task no</h1>

                                           <h6>Task</h6>
                                           <h3 style={{
                                            width:'230px'
                                           }} >Company</h3>
                                           <h3>Status</h3>


                                       </div>
                                       {tasks && tasks.map((val, index) => (
                                           
                                           <>
                                               <div className="headertable">
                                                   <h2 className='sxx'> <input onClick={e => addindex(index,val)} type="checkbox" checked={ind.search(val._id) >= 0 ? true : false} /> </h2>
                                                   <h1 style={{
                                            width:'100px'
                                           }}>{val.description}</h1>

                                                   <h6>{val.name}</h6>
                                                   <h3
                                                   style={{
                                                    width:'230px'
                                                   }}
                                                   >{val.clientname}</h3>
                                                   <h4>{val.status}</h4>





                                               </div>
                                           </>
                                       ))

                                       }
                                    

                                   </div>
                                
                               </div>
        </div>


    </div>
  )
}

export default Tasks