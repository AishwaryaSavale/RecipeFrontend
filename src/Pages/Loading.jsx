
import '../App.css';


export default function Loading({msg}){

    return(
        <>
        <div className="Loading-container">
            <div className="box">
                <div className="circle">

                </div>
                <p>{msg}</p>
            </div>
        </div>


        </>
    )
}