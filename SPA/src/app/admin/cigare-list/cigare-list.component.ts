import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cigare-list',
  templateUrl: './cigare-list.component.html',
  styleUrls: ['./cigare-list.component.css']
})
export class CigareListComponent implements OnInit {

  searchValue: string = "";

  constructor(private route:ActivatedRoute, private adminService: AdminService, private userService: UserService, private toast: ToastrService) { }

  tabacs: any[]
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.tabacs = data['tabacs'].tabacs;
    });
  }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();

    this.adminService.search(value,1).subscribe((tabac:any)=>{
      this.tabacs = tabac.t;
    });
  }
  download(){
    let list = this.tabacs.map(t => {
      return {
        id: t.id,
        name: t.name,
        description: t.description,
        quantityPerTable: t.quantityPerTable,
        priceInCfa: t.priceInCfa
      }
    })
    this.exportExcel(list,"cigare data");
  }
}
