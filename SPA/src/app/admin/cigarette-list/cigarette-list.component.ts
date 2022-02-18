import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cigarette-list',
  templateUrl: './cigarette-list.component.html',
  styleUrls: ['./cigarette-list.component.css']
})
export class CigaretteListComponent implements OnInit {

  searchValue: string = "";
  tabacs: any[];

  constructor(private route: ActivatedRoute, private adminService: AdminService, private userService: UserService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.tabacs = data['tabacs'].tabacs;
    });
  }
  searchByName(){
    let value = this.searchValue.toLowerCase();

    this.adminService.search(value,2).subscribe((tabac:any)=>{
      this.tabacs = tabac.t;
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
    this.exportExcel(list,"cigarette data");
  }
}
