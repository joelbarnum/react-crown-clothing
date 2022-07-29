import { useContext } from "react";
import { CatagoriesContext } from "../../contexts/catagories.context";
import CatagoryPreview from "../../components/catagory-preview/catagory-preview.component";

const CategoriesPreview = () => {
    const {catagoriesMap} = useContext(CatagoriesContext);
    return (
        <>
            {Object.keys(catagoriesMap).map((title) => {
                const products = catagoriesMap[title];
                return (
                <CatagoryPreview key={title} title={title} products={products}/>
                );
            })}
        </>
    );
};

export default CategoriesPreview;