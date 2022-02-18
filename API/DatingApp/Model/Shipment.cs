using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Model
{
    public class Shipment
    {
        public int Id { get; set; }
        public string NameTabac { get; set; }
        public int Quantity { get; set; }
        public int Category { get; set; }
        public int ChargeId { get; set; }
        public double Price { get; set; }
    }
}
