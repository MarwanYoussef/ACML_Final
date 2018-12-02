import { Component } from '@angular/core';
import { ProductService } from '../../../product.service';
import { UserService } from '../../../user.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

  settings = {
    noDataMessage: this.message(),
    actions: {
      add: true,
      edit: true,
      delete: true
    },
    add: {
      addButtonContent: '<i class="nb-plus" ></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID #',
        type: 'number',
        editable: false
      },
      name: {
        title: 'Product Name',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number',
        valuePrepareFunction: (price) => {
          var formatted = this.curpipe.transform(price,'USD');
          return formatted;
        }
      },
      createdAt: {
        title: 'Created At',
        type: 'date',
        editable: false,
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = this.datepipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      }
      ,
      sellerName: {
        title: 'Seller Name',
        type: 'string',

      }

    },
  };

  source: LocalDataSource;

  constructor(private productService: ProductService,
              private userService: UserService,
              private router: Router,
              private datepipe : DatePipe,
              private curpipe: CurrencyPipe) {
    this.source = new LocalDataSource();
    this.getProducts();
    //bonus (check admin rights)
    let currentUser = this.userService.getUser();
    if(currentUser === null){
      this.settings.actions.add = false;
      this.settings.actions.edit = false;
      this.settings.actions.delete = false;
    } else {
      this.settings.actions.add = true;
      this.settings.actions.edit = true;
      this.settings.actions.delete = true;
    }
  }

  message(): String {
    return 'No Products in the Data Base sold by the component.';
  }

  getProducts() {
    var self = this;
    this.productService.getProducts().subscribe(function (res) {
      if (res.msg === 'Products retrieved successfully.'){
        var Prods: any[] = res.data;
        var mine: any[] = [];
        for(var i = 0; i < Prods.length; i++){
          Prods[i].createdAt = new Date(Prods[i].createdAt);
          Prods[i].updatedAt = new Date(Prods[i].updatedAt);
          var name = Prods[i].sellerName;
          // if(name === 'Ibrahim Ali')
          mine.push(Prods[i]);
        }
        self.source.load(mine);
      }
    });
  }

  createProduct(event): void {
    if (event.newData.id === '')
      alert('Please write an ID!');
    else if (event.newData.name === '')
      alert('Please write the name of the product')
    else if (event.newData.price === '')
      alert('Please write the price of the product');
    else if (event.newData.sellerName === '')
      alert('Please write the name of the seller')
    else if (event.newData.stock === '')
      alert('Please write how many of the item is in stock')
    else {
      event.newData.createdAt = new Date();
      event.newData.updatedAt = new Date()

      var newProd = {
        id: event.newData.id,
        name: event.newData.name,
        price: event.newData.price,
        createdAt: event.newData.createdAt,
        updatedAt: event.newData.updatedAt,
        sellerName: event.newData.sellerName,
        stock: event.newData.stock
      };

      var self = this;
      this.productService.addProduct(newProd).subscribe(function (res) {
        if (res.msg === 'Product was created successfully.') {
          // if (newProd.sellerName === 'Ibrahim Ali')
            event.confirm.resolve(newProd);
          // alert('Product Added!');
        }
      },
        function (error) {
          alert("ID already used");
        });
    }
  }

  editProduct(event):void{
    if (event.newData.name === '')
      alert('Please write the name of the product')
    else if (event.newData.name === '')
      alert('Please write the name of the product')
    else if (event.newData.price === '')
      alert('Please write the price of the product');
    else if (event.newData.sellerName === '')
      alert('Please write the name of the seller')
    else {
      var prodToEdit = {
        id: event.newData.id,
        name: event.newData.name,
        price: event.newData.price,
        createdAt: event.data.createdAt,
        sellerName: event.newData.sellerName,
        _id: event.data._id
      };

      var self = this;
      this.productService.editProduct(prodToEdit).subscribe(function (res) {
        if (res.msg === 'Product was updated successfully.') {
          if (prodToEdit.sellerName === 'Ibrahim Ali')
            event.confirm.resolve(res.data);
          // alert('Product Edited!');
        }
      });
    }
  }

  deleteProduct(event){
    this.productService.deleteProduct(event.data._id).subscribe(function(res){
      event.confirm.resolve();
    });
  }

}
