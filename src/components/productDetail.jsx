// src/components/ProductDetails.jsx
export default function ProductDetails({ name, price, labeledPrice, description }) {
    return (
        <div className="p-6 space-y-4">
            {/* Name */}
            <h2 className="text-4xl font-semibold">{name}</h2>

            {/* Price section */}
            <div className="text-3xl font-bold text-amber-600">
                Rs.{price}
                {labeledPrice && labeledPrice !== price && (
                    <span className="text-gray-500 line-through ml-3 text-lg font-medium">
                        Rs.{labeledPrice.toFixed(2)}
                    </span>
                )}
            </div>

            {/* Description */}
            {description && (
                <p className="text-gray-700 text-base leading-relaxed">
                    {description}
                </p>
            )}

        </div>
    );
}
