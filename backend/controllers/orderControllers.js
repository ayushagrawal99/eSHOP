import Order from '../Modal/order.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  private

const addOrderItems = async (req,res,next) => {
    
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        orderItems,
        user : req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })

    res.status(201).json(order)
}

// @desc    Get Order by ID
// @route   GET /api/orders/:id
// @access  private

const getOrderById = async (req,res,next) => {
    
    const order =  await Order.findById(req.params.id).populate('user')

    if(order){
        res.json(order)
    } else {
        res.status(404).json("Order Not Found")
    } 
}

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  private

const updateOrderToPaid = async (req,res,next) => {
    
    const order =  await Order.findByIdAndUpdate({
        _id : req.params.id
    }, {
        $set : {
            isPaid : true,
            paidAt : Date.now(),
            paymentResult : {
                id : req.body.id,
                status : req.body.status,
                update_time : req.body.update_time,
                email_address : req.body.payer.email_address,
    
            }
        }
    }, {
        new : true
    })

    res.json(order)
}

// @desc    Update order to deleverd
// @route   PUT /api/orders/:id/deliver
// @access  private/Admin

const updateOrderToDelevered = async (req,res,next) => {
    
    const order =  await Order.findByIdAndUpdate({
        _id : req.params.id
    }, {
        $set : {
            isDelivered : true,
            deliveredAt : Date.now()
        }
    }, {
        new : true
    })

    res.json(order)
}

// @desc    Get logged in user orders
// @route   PUT /api/orders/myorders
// @access  private

const getMyOrders = async (req,res,next) => {
    
    const orders = await Order.find({ user : req.user._id });
    res.json(orders)
}

// @desc    Get all orders
// @route   GET /api/orders
// @access  private/Admin

const getOrders = async (req,res,next) => {
    
    const orders = await Order.find({ }).populate('user');
    res.json(orders)
}

export { addOrderItems,getOrderById, updateOrderToPaid, getMyOrders,getOrders ,updateOrderToDelevered}