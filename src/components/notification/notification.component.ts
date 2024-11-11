import { Component, Input } from '@angular/core';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
 
  lowStockProducts: any[] = [];
  message: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getLowStockProducts();
  }

  getLowStockProducts(): void {
    this.notificationService.getLowStockProducts().subscribe(
      (response) => {
        this.message = response.message;
        this.lowStockProducts = response.products;
      },
      (error) => {
        console.error('Error fetching low stock products:', error);
      }
    );
  }

}
