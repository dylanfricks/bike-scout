import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, RouterModule, MatToolbarModule, MatSlideToggleModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bike Scout';

  darkMode = signal<boolean>(false);

  applyDarkMode = effect(() => {
    document.body.classList.toggle('dark-mode', this.darkMode());
    localStorage.setItem('dark-mode', JSON.stringify(this.darkMode()));
  });
}
