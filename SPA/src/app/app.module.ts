import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HasRoleDirective } from './directives/has-role.directive';
import { AuthGuard } from './guard/auth.guard';
import { EnterEmailComponent } from './enter-email/enter-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditPasswordResolver } from './resolvers/edit-password.resolver';
import { CigareListComponent } from './admin/cigare-list/cigare-list.component';
import { CigaretteListComponent } from './admin/cigarette-list/cigarette-list.component';
import { AddTabacComponent } from './admin/add-tabac/add-tabac.component';
import { TabacListComponent } from './admin/tabacList/tabacList.component';
import { DetailTabacComponent } from './admin/detail-tabac/detail-tabac.component';
import { UpdateTabacComponent } from './admin/update-tabac/update-tabac.component';
import { PreventUnsavedUpdateChanges } from './guard/prevent-usanved-update-changes.guard';
import { PreventUnsavedCreateChanges } from './guard/prevent-usanved-create-changes.guard';
import { TransactionListComponent } from './admin/transactionList/transactionList.component';
import { AddShipmentComponent } from './admin/add-shipment/add-shipment.component';
import { AddTransactionComponent } from './admin/add-transaction/add-transaction.component';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { TabacsResolver } from './resolvers/tabacs.resolver';
import { TransactionDetailResolver } from './resolvers/transaction-detail.resolver';
import { ModalModule } from "ngx-bootstrap/modal";
import { DeleteConfirmComponent } from './admin/delete-confirm/delete-confirm.component';
import { TransDetailComponent } from './admin/trans-detail/trans-detail.component';
import { HistoryComponent } from './admin/history/history.component';
import { DepositorListComponent } from './admin/depositor-list/depositor-list.component';
import { AddDepositComponent } from './admin/add-deposit/add-deposit.component';
import { UpdateDepositComponent } from './admin/update-deposit/update-deposit.component';
import { DepositListComponent } from './admin/deposit-list/deposit-list.component';
import { DetailHistoryComponent } from './admin/detail-history/detail-history.component';
import { OrderListComponent } from './employee/order-list/order-list.component';
import { AddOrderComponent } from './employee/add-order/add-order.component';
import { AddToOrderComponent } from './employee/add-to-order/add-to-order.component';
import { GetOrderResolver } from './resolvers/get-order.resolver';
import { OrderDetailComponent } from './employee/order-detail/order-detail.component';
import { OrderHistoryComponent } from './employee/order-history/order-history.component';
import { OrderDetailHistoryComponent } from './employee/order-detail-history/order-detail-history.component';
import { DeleteTransConfirmComponent } from './admin/delete-trans-confirm/delete-trans-confirm.component';
import { DeleteOrderConfirmComponent } from './employee/delete-order-confirm/delete-order-confirm.component';
import { HomeGuard } from './guard/home.guard';
import { ChargeDetailComponent } from './admin/charge-detail/charge-detail.component';
import { OrdersListComponent } from './admin/orders-list/orders-list.component';
import { OrderDetailAdminComponent } from './admin/order-detail-admin/order-detail-admin.component';
import { ChargeDetailHistoryComponent } from './admin/charge-detail-history/charge-detail-history.component';
import { AddPaymentComponent } from './employee/add-payment/add-payment.component';
import { PaymentHistoryComponent } from './employee/payment-history/payment-history.component';
import { PaymentHistoryResolver } from './resolvers/payment-history.resolver';
import { CustomerDetailComponent } from './admin/customer-detail/customer-detail.component';
import { DeleteCustomerComponent } from './employee/delete-customer/delete-customer.component';
import { CustomerDetailHistoryComponent } from './employee/customer-detail-history/customer-detail-history.component';
import { OrderListResolver } from './resolvers/order-list.resolver';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    HasRoleDirective,
    EnterEmailComponent,
    ChangePasswordComponent,
    CigareListComponent,
    CigaretteListComponent,
    AddTabacComponent,
    TabacListComponent,
    DetailTabacComponent,
    UpdateTabacComponent,
    TransactionListComponent,
    AddShipmentComponent,
    AddTransactionComponent,
    DeleteConfirmComponent,
    TransDetailComponent,
    HistoryComponent,
    DepositorListComponent,
    AddDepositComponent,
    UpdateDepositComponent,
    DepositListComponent,
    DetailHistoryComponent,
    OrderListComponent,
    AddOrderComponent,
    AddToOrderComponent,
    OrderDetailComponent,
    OrderHistoryComponent,
    OrderDetailHistoryComponent,
    DeleteTransConfirmComponent,
    DeleteOrderConfirmComponent,
    ChargeDetailComponent,
    OrdersListComponent,
    OrderDetailAdminComponent,
    ChargeDetailHistoryComponent,
    AddPaymentComponent,
    PaymentHistoryComponent,
    CustomerDetailComponent,
    DeleteCustomerComponent,
    CustomerDetailHistoryComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:44310'],
        blacklistedRoutes: ['localhost:44310/api/auth/register','localhost:44310/api/auth/login','localhost:44310/api/auth/email']
      }
    }),
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AuthGuard,
    HomeGuard,
    HasRoleDirective,
    EditPasswordResolver,
    PreventUnsavedUpdateChanges,
    PreventUnsavedCreateChanges,
    BsDatepickerModule,
    TabacsResolver,
    TransactionDetailResolver,
    GetOrderResolver,
    PaymentHistoryResolver,
    OrderListResolver
  ],
  entryComponents: [
    DeleteConfirmComponent,
    UpdateDepositComponent,
    AddOrderComponent,
    DeleteTransConfirmComponent,
    DeleteOrderConfirmComponent,
    DeleteCustomerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
