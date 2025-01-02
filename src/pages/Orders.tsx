import React, { useState, useEffect } from 'react';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';
import { Package, Truck, CheckCircle } from 'lucide-react';

interface Order {
  _id: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    image: string;
    price: number;
  }>;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosPrivate.get('/orders/myorders');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
        <p className="text-gray-600">When you place orders, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">
                  Order #{order._id.slice(-8)}
                </p>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-lg font-bold">
                ${order.totalPrice.toFixed(2)}
              </div>
            </div>

            <div className="border-t border-b py-4 my-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-5 h-5 ${order.isPaid ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={order.isPaid ? 'text-green-500' : 'text-gray-500'}>
                  {order.isPaid ? 'Paid' : 'Payment Pending'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className={`w-5 h-5 ${order.isDelivered ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={order.isDelivered ? 'text-green-500' : 'text-gray-500'}>
                  {order.isDelivered ? 'Delivered' : 'In Transit'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}