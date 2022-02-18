using DatingApp.Dtos;
using DatingApp.interfaces;
using DatingApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Repository
{
    public class EmployeService : IEmployeService
    {
        private readonly DataContext context;

        public EmployeService(DataContext context)
        {
            this.context = context;
        }
        public void AddOrder(Order order)
        {
            context.Orders.Add(order);
        }

        public async Task<List<Order>> GetOrders()
        {
            return await context.Orders.Where(o => o.IsComplete == false).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
        public async Task<List<TabacForList>> GetTabacsList()
        {
            var result = from t in context.Tabacs
                         select new TabacForList
                         {
                             Id = t.Id,
                             Name = t.Name,
                             categoryId = t.categoryId,
                             Description = t.Description,
                             PriceInCfa = t.PriceInCfa,
                             QuantityPerTable = 0,
                             RealQuantity = t.QuantityPerTable
                         };
            return await result.ToListAsync();
        }

        public async Task<Order> GetOrder(int id)
        {
            return await context.Orders.FindAsync(id);
        }

        public async Task<List<OrderDetail>> GetOrderDetail(int orderId)
        {
            return await context.OrderDetails.Where(c => c.OrderId == orderId).ToListAsync();
        }

        public void addToOrder(List<OrderDetail> orderDetail)
        {
            foreach (var s2 in orderDetail)
            {
                Tabac tabac = context.Tabacs.Where(c => c.Name.Equals(s2.NameTabac)).FirstOrDefault();
                if (tabac != null)
                {
                    tabac.QuantityPerTable = tabac.QuantityPerTable - s2.Quantity;
                    context.Update(tabac);
                }
                context.OrderDetails.Add(s2);
            }
        }

        public async Task<List<OrderDetail>> GetOrderDetails(int orderId)
        {
            return await context.OrderDetails.Where(c => c.OrderId == orderId && c.IsComplete == false).ToListAsync();
        }

        public void checkOrder(List<OrderDetail> orderDetails)
        {
            foreach (var o in orderDetails)
            {
                context.OrderDetails.Update(o);
            }
        }

        public void completeOrder(int orderId)
        {
            Order o = context.Orders.Find(orderId);
            List<OrderDetail> orderDetails = context.OrderDetails.Where(c => c.OrderId == orderId).ToList();
            foreach (var order in orderDetails)
            {
                order.IsComplete = true;
                context.OrderDetails.Update(order);
            }
            o.IsComplete = true;
            o.DeliveredAt = DateTime.Now;
            context.Orders.Update(o);
        }

        public void deleteOrder(Order order)
        {
            List<OrderDetail> orders = context.OrderDetails.Where(c => c.OrderId == order.Id).ToList();
            foreach (var o in orders)
            {
                Tabac tabac = context.Tabacs.Where(c => c.Name.Equals(o.NameTabac)).FirstOrDefault();
                if (tabac != null)
                {
                    tabac.QuantityPerTable = tabac.QuantityPerTable + o.Quantity;
                    context.Update(tabac);
                }
                context.OrderDetails.Remove(o);
            }
            context.Orders.Remove(order);
        }

        public async Task<Tabac> GetTabac(string id)
        {
            return await context.Tabacs.FindAsync(id);
        }

        public async Task<OrderDetail> GetOrderDetailByName(string name, int orderId)
        {
            return await context.OrderDetails.Where(c => c.NameTabac.Equals(name) && c.OrderId == orderId).FirstOrDefaultAsync();
        }

        public async Task<OrderDetail> GetOrderDetailById(int id)
        {
            return await context.OrderDetails.FindAsync(id);
        }

        public async Task<List<Order>> getOrderHistory()
        {
            return await context.Orders.Where(c => c.IsComplete).ToListAsync();
        }

        public async Task<Order> GetOrderById(int id)
        {
            return await context.Orders.FindAsync(id);
        }

        public void deleteOrderDetail(OrderDetail o)
        {
            context.OrderDetails.Remove(o);
        }

        public void AddCustomer(Customer c)
        {
            context.Customers.Add(c);
        }

        public async Task<List<Customer>> getCustomers()
        {
            return await context.Customers.Where(c => c.IsComplete == false).ToListAsync();
        }

        public async Task<List<Order>> getCustomersOrder(int id)
        {
            return await context.Orders.Where(c => c.CustomerId == id && c.IsComplete == false).ToListAsync();
        }

        public Customer getCustomer(int id)
        {
            return context.Customers.Find(id);
        }

        public async Task<List<OrderDetail>> GetOrderDetailHistory(int orderId)
        {
            return await context.OrderDetails.Where(c => c.OrderId == orderId && c.IsComplete == true).ToListAsync();
        }
        public async Task<List<OrderPayment>> getOrderPayment(int id)
        {
            return await context.OrderPayments.Where(c => c.OrderId == id).ToListAsync();
        }
        public void addPaymente(OrderPayment o)
        {
            context.OrderPayments.Add(o);
        }
        public void updateOrder(Order o)
        {
            context.Orders.Update(o);
        }
        public void completeCustomer(int customerId)
        {
            Customer c = context.Customers.Find(customerId);
            c.IsComplete = true;
            context.Customers.Update(c);
        }

        public void deleteCustomer(Customer c)
        {
            List<Order> orders = context.Orders.Where(o => o.CustomerId == c.Id).ToList();
            foreach (var order in orders)
            {
                deleteOrder(order);
            }
            context.Customers.Remove(c);
        }

        public async Task<List<Customer>> getCustomersHistory()
        {
            return await context.Customers.Where(c => c.IsComplete == true).ToListAsync();
        }

        public async Task<List<Order>> getCustomersOrderHistory(int id)
        {
            return await context.Orders.Where(c => c.CustomerId == id && c.IsComplete == true).ToListAsync();
        }
    }
}
