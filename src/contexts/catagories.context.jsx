import { createContext, useState, useEffect } from "react";

// import SHOP_DATA from '../shop-data.js';
import { getCatagoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CatagoriesContext = createContext({
    catagoriesMap: {},
});

export const CatagoriesProvider = ({children}) => {
    const [catagoriesMap, setCatagories] = useState({});
    // this was used to upload data to the firestore database
    // useEffect(() => {
    //     addCollectionAndDocuments('catagories', SHOP_DATA);
    // }, [])

    useEffect(( ) => {
        const getCatagoriesMap = async () => {
            const catagryMap = await getCatagoriesAndDocuments();
            setCatagories(catagryMap);
        }
        getCatagoriesMap();
    }, [])
    const value = { catagoriesMap };
    return (
        <CatagoriesContext.Provider value={value}>{children}</CatagoriesContext.Provider>
    );
};