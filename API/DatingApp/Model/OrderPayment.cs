using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Model
{
    public class OrderPayment
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public DateTime Date { get; set; }
    }
}
