import ProductCard from "../components/productCard";


export default function Testing(){
	
	return (
	<div>
        <div className="w-64 h-64 relative group overflow-hidden rounded-lg shadow-lg">
  
  <img src="/images/image1.jpg" alt="Image 1" className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
  <img src="/images/image2.jpg" alt="Image 2" className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
</div>

    </div>

        
	)
}
