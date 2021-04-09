import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  address:any[];
  displayedColumns: string[] = ['userId','name','city','pin','near','phone','dateCreated','key'];

  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
    this.cartService.getAllad()
                    .subscribe(address=>this.address=address);
    
    }


}
