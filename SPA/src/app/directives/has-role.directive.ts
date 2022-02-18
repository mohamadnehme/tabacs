import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  @Input() appHasRole: string[];
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) { }

  ngOnInit(){
    const userRoles = this.authService.decodeToken.role as Array<string>;
    // if no roles clear th view Container Ref
    if(!userRoles){
      this.viewContainerRef.clear();
    }

    // if user has role need then render the element
    if(this.authService.roleMatch(this.appHasRole)){
      if(!this.isVisible){
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
      else{
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}
