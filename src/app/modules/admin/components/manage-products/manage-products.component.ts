import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/modules/Products/services/course.service';
import { MatDialog } from '@angular/material';
import { ProductComponent } from 'src/app/modules/Products/components/product/product.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  
  products:any[];
  displayedColumns: string[] = ['title', 'description', 'categorie', 'urlImage','weight','price','actions'];
  constructor(private serviceProduct:CourseService, private serviceDialog:MatDialog) { }

  ngOnInit() {
    this.serviceProduct.getAllProducts()
                      .subscribe(products=>this.products=products);
  }
 AddProduct(){
    this.serviceDialog.open(ProductComponent,{
      width:'650px',
      height:'500px'
    })
  }
  Edit(row)
  {
    this.serviceDialog.open(ProductComponent,{
      width:'650px',
      height:'500px', data:{id:row.key}
    })
  }
  Delete(row)
  {
    if(window.confirm('Are sure you want to delete this product ?')) this.serviceProduct.deleteProduct(row.key);
  }
}
