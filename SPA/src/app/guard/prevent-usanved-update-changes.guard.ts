import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { UpdateTabacComponent } from "../admin/update-tabac/update-tabac.component";

@Injectable()
export class PreventUnsavedUpdateChanges implements CanDeactivate<UpdateTabacComponent>{
    canDeactivate(component: UpdateTabacComponent){
        if(component.tabacForm.dirty){
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}