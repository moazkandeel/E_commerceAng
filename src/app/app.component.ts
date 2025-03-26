import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce_ang1';

  showScroll: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScroll = window.pageYOffset > 20; // يظهر الزر عند التمرير 200px لأسفل
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  phoneNumber: string = '201032984622'; // ضع رقم واتساب هنا بدون "+"

  openWhatsApp() {
    window.open(`https://wa.me/${this.phoneNumber}`, '_blank');
  }
}
