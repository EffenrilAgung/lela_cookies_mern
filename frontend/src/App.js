import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/profileScreen';
import ShippingScreen from './screens/ShippingScreen';
import paymentScreen from './screens/PaymentScreen';
import placeOrderScreen from './screens/placeOrderScreen';
import OrderScreen from './screens/OrderScreeen';
import userListScreen from './screens/userListScreen';
import UserEditScreen from './screens/userEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/productEditScreen';
import OrderListScreen from './screens/orderListScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/userlist" component={userListScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={paymentScreen} />
          <Route path="/placeorder" component={placeOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
