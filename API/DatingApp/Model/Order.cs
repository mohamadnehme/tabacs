using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Model
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime DeliveredAt { get; set; }
        public double RemainingPrice { get; set; }
        public double ReceivedPrice { get; set; }
        public bool isPayed { get; set; }
        public double Price { get; set; }
        public bool IsComplete { get; set; }
    }
}