import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CigareListComponent } from './admin/cigare-list/cigare-list.component';
import { CigaretteListComponent } from './admin/cigarette-list/cigarette-list.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CigareResolver } from './resolvers/cigare.resolver';
import { CigaretteResolver } from './resolvers/cigarette.resolver';
import { EditPasswordResolver } from './resolvers/edit-password.resolver';
import { AddTabacComponent } from './admin/add-tabac/add-tabac.component';
import { AddTabacResolver } from './resolvers/add-tabac.resolver';
import { DetailTabacComponent } from './admin/detail-tabac/detail-tabac.component';
import { DetailTabacResolver } from './resolvers/detail-tabac.resolver';
import { UpdateTabacComponent } from './admin/update-tabac/update-tabac.component';
import { PreventUnsavedUpdateChanges } from './guard/prevent-usanved-update-changes.guard';
import { PreventUnsavedCreateChanges } from './guard/prevent-usanved-create-changes.guard';
import { TransactionListComponent } from './admin/transactionList/transactionList.component';
import { TransactionResolver } from './resolvers/transaction.resolver';
import { AddShipmentComponent } from './admin/add-shipment/add-shipment.component';
import { AddTransactionComponent } from './admin/add-transaction/add-transaction.component';
import { TransactionDetailResolver } from './resolvers/transaction-detail.resolver';
import { TabacsResolver } from './resolvers/tabacs.resolver';
import { TransDetailComponent } from './admin/trans-detail/trans-detail.component';
import { GetshipmentsResolver } from './resolvers/getshipments.resolver';
import { HistoryComponent } from './admin/history/history.component';
import { HistoryResolver } from './resolvers/history.resolver';
import { DepositorListComponent } from './admin/depositor-list/depositor-list.component';
import { AddDepositComponent } from './admin/add-deposit/add-deposit.component';
import { DepositorsListResolver } from './resolvers/depositors-list.resolver';
import { GetDepositsResolver } from './resolvers/get-deposits.resolver';
import { DepositListComponent } from './admin/deposit-list/deposit-list.component';
import { DetailHistoryComponent } from './admin/detail-history/detail-history.component';
import { OrderListComponent } from './employee/order-list/order-list.component';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { GetOrderResolver } from './resolvers/get-order.resolver';
import { AddToOrderComponent } from './employee/add-to-order/add-to-order.component';
import { OrderDetailComponent } from './employee/order-detail/order-detail.component';
import { GetOrderDetailsResolver } from './resolvers/get-order-details.resolver';
import { OrderHistoryComponent } from './employee/order-history/order-history.component';
import { GetOrderHistoryResolver } from './resolvers/get-order-history.resolver';
import { OrderDetailHistoryComponent } from './employee/order-detail-history/order-detail-history.component';
import { HomeGuard } from './guard/home.guard';
import { ChargeListResolver } from './resolvers/charge-list.resolver';
import { ChargeDetailComponent } from './admin/charge-detail/charge-detail.component';
import { GetChargesHistoryResolver } from './resolvers/get-charges-history.resolver';
import { OrdersListComponent } from './admin/orders-list/orders-list.component';
import { OrderDetailAdminComponent } from './admin/order-detail-admin/order-detail-admin.component';
import { GetOrderDetailHistoryResolver } from './resolvers/get-order-detail-history.resolver';
import { ChargeDetailHistoryComponent } from './admin/charge-detail-history/charge-detail-history.component';
import { AddPaymentComponent } from './employee/add-payment/add-payment.component';
import { PaymentHistoryComponent } from './employee/payment-history/payment-history.component';
import { PaymentHistoryResolver } from './resolvers/payment-history.resolver';
import { CustomerDetailComponent } from './admin/customer-detail/customer-detail.component';
import { CustomerDetailResolver } from './resolvers/customer-detail.resolver';
import { CustomerListResolver } from './resolvers/customer-list.resolver';
import { CustomerDetailHistoryComponent } from './employee/customer-detail-history/customer-detail-history.component';
import { CustomerDetailHistoryResolver } from './resolvers/customer-detail-history.resolver';

const routes: Routes = [
  {path: '' , redirectTo: '/home' , pathMatch: 'full'},
  {path: 'register' , component: RegisterComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'home' , component: HomeComponent, canActivate : [HomeGuard]},
  {path: 'editPassword/:id', component: ChangePasswordComponent, resolve: {user: EditPasswordResolver}},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      
        { path: 'Order', component: OrderListComponent, data: {roles: ['employee']}, resolve: {customers: OrderListResolver} },
        { path: 'OrderDetail/:id', component: OrderDetailComponent, resolve: {order: GetOrderDetailsResolver} },
        { path: 'AddToOrder/:id', component: AddToOrderComponent, resolve: {c: GetOrderResolver} },
        { path: 'OrderHistory', component: OrderHistoryComponent, resolve: {customers: GetOrderHistoryResolver} },
        { path: 'OrderDetailHitory/:id', component: OrderDetailHistoryComponent, resolve: {order: GetOrderDetailHistoryResolver} },
        { path: 'OrderPayment/:id', component: AddPaymentComponent, resolve: {order: GetOrderDetailsResolver} },
        { path: 'PaymentHistory/:id', component: PaymentHistoryComponent, resolve: {payments: PaymentHistoryResolver} },
        { path: 'CustomerDetail/:id', component: CustomerDetailComponent, resolve: {orders: CustomerDetailResolver} },
        { path: 'CustomerDetailHistory/:id', component: CustomerDetailHistoryComponent, resolve: {orders: CustomerDetailHistoryResolver} },
        
        { path: 'OrderAdmin', component: OrdersListComponent, data: {roles: ['admin']}, resolve: {customers: CustomerListResolver} },
        { path: 'Cigare', component: CigareListComponent, data: {roles: ['admin']}, resolve: {tabacs: CigareResolver}},
        { path: 'Cigarette', component: CigaretteListComponent, data: {roles: ['admin']},  resolve: {tabacs: CigaretteResolver}},
        { path: 'AddTabac/:category', component: AddTabacComponent, data: {roles: ['admin']}, resolve: {category: AddTabacResolver}, canDeactivate: [PreventUnsavedCreateChanges] },
        { path: 'GetTabac/:id', component: DetailTabacComponent, data: {roles: ['admin']}, resolve: {tabac: DetailTabacResolver} },
        { path: 'UpdateTabac/:id', component: UpdateTabacComponent, data: {roles: ['admin']}, resolve: {tabac: DetailTabacResolver}, canDeactivate: [PreventUnsavedUpdateChanges] },
        { path: 'transaction', component: TransactionListComponent, data: {roles: ['admin']}, resolve: {trans: TransactionResolver}},
        { path: 'AddShipment/:id', component: AddShipmentComponent, data: {roles: ['admin']}, resolve: {trans: TransactionDetailResolver}},
        { path: 'AddTransaction', component: AddTransactionComponent, data: {roles: ['admin']}},
        { path: 'TransactionDetail/:id', component: TransDetailComponent, data: {roles: ['admin']}, resolve: { c: ChargeListResolver }},
        { path: 'ChargeDetail/:id', component: ChargeDetailComponent, data: {roles: ['admin']}, resolve: { s: GetshipmentsResolver }},
        { path: 'ChargeDetailHistory/:id', component: ChargeDetailHistoryComponent, data: {roles: ['admin']}, resolve: { s: GetshipmentsResolver }},
        { path: 'TransactionHistory', component: HistoryComponent, data: {roles: ['admin']}, resolve: { trans: HistoryResolver }},
        { path: 'TransHistoryDetail/:id', component: DetailHistoryComponent, data: {roles: ['admin']}, resolve: { c: GetChargesHistoryResolver }},
        { path: 'depositorList', component: DepositorListComponent, data: {roles: ['admin']}, resolve: { dep: DepositorsListResolver }},
        { path: 'addDeposit', component: AddDepositComponent, data: {roles: ['admin']}},
        { path: 'deposit/:id', component: DepositListComponent, data: {roles: ['admin']}, resolve: { d: GetDepositsResolver }},
    ]
},
{ path: '**', redirectTo: 'home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
