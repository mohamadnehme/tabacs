using DatingApp.Dtos;
using DatingApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.interfaces
{
    public interface IEmployeService
    {
        void addPaymente(OrderPayment o);
        void AddOrder(Order order);
        Task<bool> SaveAll();
        Task<List<Order>> GetOrders();
        Task<Order> GetOrder(int id);
        Task<List<TabacForList>> GetTabacsList();
        Task<List<OrderDetail>> GetOrderDetail(int orderId);
        void addToOrder(List<OrderDetail> orderDetail);
        Task<List<OrderDetail>> GetOrderDetails(int orderId);
        void checkOrder(List<OrderDetail> orderDetails);
        Task<Tabac> GetTabac(string id);
        Task<OrderDetail> GetOrderDetailByName(string name, int orderId);
        Task<OrderDetail> GetOrderDetailById(int id);
        Task<List<Order>> getOrderHistory();
        void deleteOrder(Order order);
        Task<Order> GetOrderById(int id);
        void deleteOrderDetail(OrderDetail o);
        void completeOrder(int orderId);
        Task<List<OrderDetail>> GetOrderDetailHistory(int orderId);
        void updateOrder(Order o);
        Task<List<OrderPayment>> getOrderPayment(int id);
        void AddCustomer(Customer c);
        Task<List<Customer>> getCustomers();
        Task<List<Order>> getCustomersOrder(int id);
        Customer getCustomer(int id);
        void completeCustomer(int customerId);
        void deleteCustomer(Customer c);
        Task<List<Customer>> getCustomersHistory();
        Task<List<Order>> getCustomersOrderHistory(int id);
    }
}
