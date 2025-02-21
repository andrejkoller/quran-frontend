import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { QuranService } from '../../services/quran.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reciters',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    HttpClientModule,
    NgIf,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './reciters.component.html',
  styleUrl: './reciters.component.scss',
  providers: [QuranService],
})
export class RecitersComponent implements OnInit {
  reciters: any[] = [];
  filteredReciters: any[] = [];

  constructor(private quranService: QuranService) {}

  ngOnInit(): void {
    this.fetchReciters();
  }

  fetchReciters() {
    this.quranService.getReciters().subscribe({
      next: (response: any) => {
        this.reciters = Object.entries(response).map(([id, name]) => ({
          id: Number(id),
          name: name,
        }));
        this.filteredReciters = this.reciters;
      },
      error: (err) => {
        console.error('Error occurred when loading reciters: ', err);
      },
    });
  }

  filterReciters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.filteredReciters = this.reciters.filter((reciter: any) => {
      return reciter.name.toLowerCase().includes(filterValue);
    });
  }
}
