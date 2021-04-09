import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/modules/commun/services/categorie.service';
import { CourseService } from '../../services/course.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../models/cours.model';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  regiForm:FormGroup;
  categories:any[];
  product:Product;
  constructor(private fb:FormBuilder, private serviceCategorie:CategorieService,
    private serviceProduct:CourseService,
    public dialogRef:MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public idProduct) {
    
   }

  ngOnInit() {
    if(!this.idProduct){
      this.serviceCategorie.getAllCategories()
      .subscribe(categories=>{
        this.categories=categories;
        this.initalizeProduct(null);
       });
    }
    else{
      this.serviceCategorie.getAllCategories()
                           .pipe(
                             mergeMap(categories=>this.serviceProduct.getProductbyId(this.idProduct.id).pipe(
                               map(product=>{
                                 return ([categories,product])
                               })
                             ))).subscribe(([categories,product])=>{
                               this.categories=categories as any[];
                               this.product=product as Product;
                               this.initalizeProduct(product); 
                             })
    }
  }
  
  initalizeProduct(product){
    this.regiForm = this.fb.group({  
      'Title' : [ product?product.title:null,Validators.required],  
      'Description' : [product?product.description:null, Validators.required],
      'weight' : [ product?product.weight:null,Validators.required],    
      'price' : [ product?product.price:null,Validators.required],  
      'UrlImage' : [ product?product.urlImage:null,Validators.required],  
      'Categorie':[ product?product.categorie:null,Validators.required]
    });
  }
  onSubmit(form){
   if(this.regiForm.valid)
   {
     let product:Product={
      id:this.idProduct?this.idProduct.id:'',
      title:form.Title,
      description:form.Description,
      categorie:form.Categorie,
      weight:form.weight,
      price:form.price,
      urlImage:form.UrlImage
     }
     if(!this.idProduct){
     this.serviceProduct.AddProduct(product).then(()=>{
             this.dialogRef.close();
     });
    }
   else{
     this.serviceProduct.updateProduct(product).then(()=>{
      this.dialogRef.close();
     });
   }
  }
}
}
