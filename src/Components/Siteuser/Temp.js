<div className="a4" ref={componentRef2}>
<div className="rw1">
    <div className="rwdiv1">
        <h1></h1>
        <p>Week Ending</p>
        <h1>232323</h1>
        <p>Time keeper Sign</p>
        <h1>232323</h1>
        <p>Foreman's sign</p>

    </div>
    <div className="rwdiv2">
    <div className="prntbtns">

{action?
<button className='no-print btn1' onClick={e=>dd()}>Save Changes</button>
:
<ReactToPrint

trigger={() => <button className='no-print btn1' id='printbtn'>Export To pdf!</button>
}
content={() => componentRef2.current}
/>

}

<button className=' no-print btn1 btn3g'>Share</button>
<button className='no-print btn2x btn1' onClick={e=>setforman2(false)}>Cancel</button>
    </div>
     <h3>   {props.user.name}</h3>
     <h4>
        {props.project&&props.project.clientname}</h4>

    </div>
    <div className="rwdiv1">
        <div className="undertexr">
            Job no: <div className="underlinea">
               {props.project&&props.project.no}
            </div>
        </div>
        <div className="undertexr">
            Project: <div className="underlinea">
                {props.project&&props.project.sitename}
            </div>
        </div>
        <div className="undertexr">
            Location: <div className="underlinea">
              {props.project&&props.project.address.substring(0,25)}
            </div>
        </div>

    </div>
</div>

<div className='tablemen'>
  <div className='re3'>

    <div className='bigname'>Name</div>
    <div className='bigname'> Tade</div>
    <div>MON</div>

    <div>TUE</div>
    <div>WED</div>
    <div>THU</div>
    <div>FRI</div>
    <div>SAT</div>
    <div>SUN</div>

    <div>Total</div>
    <div 
    className='ggg'  >OT</div>{/* <div>P.O #</div> */}
    <div>Cost Code</div>
    <div 
    className='ggg'  >Days</div>
    <div>Perdiem</div>

    <div>O.N</div>
  </div>

{  attreportx2.length>0&&
 attreportx2.map((val,index)=>(
  <div className='re4'>

  <div className='bigname'>{val.name.split(' ').slice(0,2).join(' ')}</div>
    <div className='bigname'>Tade</div>
    <div>
    {val.att.map(element => (
<>{
  element.day==='Monday'&&element.wh}</>

))}
      
    </div>

    <div> {val.att.map(element => (
<>{
  element.day==='Tuesday'&&element.wh}</>

))}</div>
    <div> {val.att.map(element => (
<>{
  element.day==='Wednesday'&&element.wh}</>

))}</div>
    <div> {val.att.map(element => (
<>{
  element.day==='Thursday'&&element.wh}</>

))}</div>
    <div> {val.att.map(element => (
<>{
  element.day==='Friday'&&element.wh}</>

))}</div>
    <div> {val.att.map(element => (
<>{
  element.day==='Saturday'&&element.wh}</>

))}</div>
    <div> {val.att.map(element => (
<>{
  element.day==='Sunday'&&element.wh}</>

))}</div>

<div> 
{val.wh}
</div>
<div 
    className='ggg'  > 
{val.wh>40?val.wh-40:0}
</div>
   {/* <div>P.O #</div> */}
    <div>Cost Code</div>
    <div 
    className='ggg'  >
      5
    </div>
    <div>
      {val.perdiem}</div>

    <div>
      {val.onperdiem}</div>
  </div>

 ))}

</div>

<div className="buttonbar">
<button onClick={e=>editlist()}>Edit List</button>
<button onClick={e=>approve()} className='gree'>Approve</button>
</div>
<div className="rwdiv1x">
        <div className="undertexrx undertexr">
            Authorizing Signature: <div className="underlinea underline2">
           
            </div>
        </div>
        <div className="undertexr undertexrx">
        Authorizing Signature: <div className="underlinea underline2">
             
            </div>
        </div>

    </div>
</div>