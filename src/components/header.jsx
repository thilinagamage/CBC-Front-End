import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Header() {
  return (
<div className="h-[70px] w-full flex justify-between items-center">
<div>Logo</div>
    <div className=" ">
       <div className="text-black text-xl flex w-[500px] h-full  items-center justify-between">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/about">About Us</Link>
        <Link to="/reviews">Reviews</Link>
        
       </div>
    </div>
<div className="m-3 text-2xl"><Link to="/cart"><GrCart/></Link></div>



</div>
  );
}