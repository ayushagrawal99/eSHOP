import React, {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { Col, Row, Card, Image, ListGroup, Form, Button } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartAction';

const CartScreen = (props) => {
    const productID = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if(productID){
            dispatch(addToCart(productID,qty))
        }
    },[ dispatch, productID, qty ])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        props.history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Card</h1>
                {cartItems.length === 0 ? <p>Your cart is empty <Link to='/'>Go back</Link></p> : (
                    <ListGroup variant='flash'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control 
                                            as='select' 
                                            value={item.qty} 
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map( val => (
                                                    <option key={val+1} value={val+1}>{val+1}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button 
                                            type="button" 
                                            variant='white' 
                                            onClick={() => removeFromCartHandler(item.product)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button 
                            type='button' 
                            className='btn-block' 
                            disabled={cartItems.length === 0} 
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}

export default CartScreen
