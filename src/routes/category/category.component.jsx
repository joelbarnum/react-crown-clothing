import './category.styles.scss';
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { CatagoriesContext } from '../../contexts/catagories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const { category } = useParams();
    const { catagoriesMap } = useContext(CatagoriesContext);
    const [products, setProducts] = useState(catagoriesMap[category]);
    
    useEffect(() => {
        setProducts(catagoriesMap[category]);
    }, [category, catagoriesMap])

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>

            <div className='category-c-container'>
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </>
        
    )
}

export default Category;