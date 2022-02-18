using DatingApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.interfaces
{
    public interface IAdminService
    {
        Task<List<Tabac>> GetTabacs(int category);
        Task<bool> SaveAll();
        void Add(Tabac t);
        void Update(Tabac t);
        void Delete(Tabac t);
        Task<Tabac> GetTabac(string id);
        void UpdateCfa(double v);
        Task<Category> GetCategory(string name);
        Task<List<Tabac>> search(string name, int category);
        void AddTransaction(Transaction t);
        Task<List<Transaction>> GetTransactions();
        Task<Transaction> GetTransaction(int id);
        Task<List<Shipment>> GetShipments();
        void deleteTrans(Transaction id);
        Task<List<Tabac>> GetTabacsList();
        Task<List<Shipment>> GetShipments(int transId);
        void deleteShipment(Shipment s);
        void addShipment(List<Shipment> s2);
        void completeTrans(int transId);
        Task<List<Transaction>> getHistory();
        void addDepositor(Depositor d);
        void addDeposit(Deposit d);
        Task<List<Depositor>> GetDepositors();
        Task<List<Deposit>> GetDeposits(int depositorId);
        Task<Depositor> GetDepositor(int id);
        void updateDepositor(Depositor d);
        void addCharge(Charge c);
        Task<List<Charge>> getCharges(int transId);
        Charge getCharge(int chargeId);
        void completeCharge(Charge c, List<Shipment> shipments);
        void deleteCharge(Charge c);
        Task<List<Charge>> getChargesHistory(int transId);
    }
}
