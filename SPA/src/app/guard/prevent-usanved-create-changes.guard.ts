import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { AddTabacComponent } from "../admin/add-tabac/add-tabac.component";

@Injectable()
export class PreventUnsavedCreateChanges implements CanDeactivate<AddTabacComponent>{
    canDeactivate(component: AddTabacComponent){
        if(component.tabacForm.dirty){
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}