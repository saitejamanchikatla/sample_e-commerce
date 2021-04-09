import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  idOrder;
  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.idOrder=this.router.snapshot.params['id'];
  }

}
