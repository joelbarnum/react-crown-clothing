import Home from "./../src/routes/home.component.jsx";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component.jsx";
import Authentication from "./routes/authentiation/authentiation.component.jsx";
import Shop from "./routes/shop/shop.component.jsx";
import Checkout from "./routes/checkout/checkout.component.jsx";


const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Navigation/>}> 
        <Route index element={<Home />}/>
          <Route path='shop/*' element={<Shop/>}/>
          <Route path='authentication' element={<Authentication/>}/>
          <Route path='checkout' element={<Checkout />}/>
        </Route>
      <Route/>
    </Routes>
  )
}

export default App;
