import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      recipentName: { type: String, require: true },
      phoneNumber: { type: String, required: true },
      provinsi: { type: String, required: true },
      city: { type: String, required: true },
      kecamatan: { type: String, required: true },
      kelurahan: { type: String, required: true },
      postalCode: { type: String, required: true },
      address: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      // type: Date,
      type: String,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      // type: Date,
      type: String,
    },
    create_At: {
      type: String,
    },
    update_At: {
      type: String,
    },
  },
  {
    timestamps: {
      type: String,
      default: () => moment().format('lll'),
    },
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
