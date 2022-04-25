import { Link } from "react-router-dom"

export default function Nav(){

  return(
    <nav>
      <Link to="/dashboard" className="link"> Home </Link>
      <Link to="/add-item" className="link"> Add </Link>
    </nav>
  )
  
}