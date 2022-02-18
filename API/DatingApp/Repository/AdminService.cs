using DatingApp.interfaces;
using DatingApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Repository
{
    public class AdminService : IAdminService
    {
        private readonly DataContext context;

        public AdminService(DataContext context)
        {
            this.context = context;
        }
        public void Add(Tabac t)
        {
            context.Tabacs.Add(t);
        }

        public void addCharge(Charge c)
        {
            context.Charges.Add(c);
        }

        public void addDeposit(Deposit d)
        {
            context.Deposits.Add(d);
        }

        public void addDepositor(Depositor d)
        {
            context.Depositors.Add(d);
        }

        public void addShipment(List<Shipment> shipments2)
        {
            foreach (var s2 in shipments2)
            {
                context.Shipments.Add(s2);
            }
        }

        public void AddTransaction(Transaction t)
        {
            context.Transactions.Add(t);
        }

        public void completeCharge(Charge c, List<Shipment> shipments)
        {
            c.IsComplete = true;
            c.DeliveredAt = DateTime.Now;
            foreach (var s in shipments)
            {
                Tabac t = context.Tabacs.Where(c => c.Name.Equals(s.NameTabac)).FirstOrDefault();
                t.QuantityPerTable += s.Quantity;
                context.Tabacs.Update(t);
            }
            context.Charges.Update(c);
        }

        public void completeTrans(int transId)
        {
            Transaction t = context.Transactions.Find(transId);
            t.IsComplete = true;
            context.Transactions.Update(t);
        }

        public void Delete(Tabac t)
        {
            context.Tabacs.Remove(t);
        }

        public void deleteCharge(Charge c)
        {
            context.Charges.Remove(c);
        }

        public void deleteShipment(Shipment s)
        {
            context.Shipments.Remove(s);
        }

        public void deleteTrans(Transaction t)
        {
            List<Charge> charges = context.Charges.Where(c => c.TransactionId == t.Id).ToList();
            foreach (var charge in charges)
            {
                List<Shipment> shipments = context.Shipments.Where(s => s.ChargeId == charge.Id).ToList();
                foreach (var shipment in shipments)
                {
                    context.Shipments.Remove(shipment);
                }
                context.Charges.Remove(charge);
            }
            context.Transactions.Remove(t);
        }

        public async Task<Category> GetCategory(string name)
        {
            return await context.Categories.Where(c => c.Name.Equals(name)).FirstOrDefaultAsync();
        }

        public Charge getCharge(int chargeId)
        {
            return context.Charges.Find(chargeId);
        }

        public async Task<List<Charge>> getCharges(int transId)
        {
            return await context.Charges.Where(c => c.TransactionId == transId && c.IsComplete == false).ToListAsync();
        }

        public async Task<List<Charge>> getChargesHistory(int transId)
        {
            return await context.Charges.Where(c => c.TransactionId == transId && c.IsComplete == true).ToListAsync();
        }

        public async Task<Depositor> GetDepositor(int id)
        {
            return await context.Depositors.FindAsync(id);
        }

        public async Task<List<Depositor>> GetDepositors()
        {
            return await context.Depositors.ToListAsync();
        }

        public async Task<List<Deposit>> GetDeposits(int depositorId)
        {
            return await context.Deposits.Where(d => d.depositorId == depositorId).Include(c => c.depositor).ToListAsync();
        }

        public async Task<List<Transaction>> getHistory()
        {
            return await context.Transactions.Where(c => c.IsComplete == true).ToListAsync();
        }

        public Task<List<Shipment>> GetShipments()
        {
            return context.Shipments.ToListAsync();
        }

        public async Task<List<Shipment>> GetShipments(int chargeId)
        {
            return await context.Shipments.Where(c => c.ChargeId == chargeId).ToListAsync();
        }

        public async Task<Tabac> GetTabac(string id)
        {
            return await context.Tabacs.FindAsync(id);
        }

        public async Task<List<Tabac>> GetTabacs(int category)
        {
            return await context.Tabacs.Where(c => c.categoryId == category).ToListAsync();
        }

        public async Task<List<Tabac>> GetTabacsList()
        {
            var result = from t in context.Tabacs
                         select new Tabac
                         {
                             Id = t.Id,
                             Name = t.Name,
                             categoryId = t.categoryId,
                             Description = t.Description,
                             PriceInCfa = t.PriceInCfa,
                             QuantityPerTable = 0
                         };
            return await result.ToListAsync();
        }

        public async Task<Transaction> GetTransaction(int id)
        {
            return await context.Transactions.FindAsync(id);
        }

        public async Task<List<Transaction>> GetTransactions()
        {
            return await context.Transactions.Where(t => t.IsComplete != true).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public async Task<List<Tabac>> search(string name, int category)
        {
            return await context.Tabacs.Where(c => c.Name.StartsWith(name) && c.categoryId == category).ToListAsync();
        }

        public void Update(Tabac t)
        {
            context.Tabacs.Update(t);
        }

        public void UpdateCfa(double v)
        {
            Value value = context.Values.FirstOrDefault();
            value.Cfa = v;
            context.Values.Update(value);
        }

        public void updateDepositor(Depositor d)
        {
            context.Depositors.Update(d);
        }
    }
}
