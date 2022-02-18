using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Model
{
    public class Charge
    {
        public int Id { get; set; }
        public string name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime DeliveredAt { get; set; }
        public double Price { get; set; }
        public int TransactionId { get; set; }
        public bool IsComplete { get; set; }
    }
}
