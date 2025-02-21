import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { QuranService } from '../../services/quran.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatInputModule,
    HttpClientModule,
    NgFor,
    MatCardModule,
    MatIconModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [QuranService],
})
export class HomeComponent implements OnInit {
  chapters: any[] = [];
  filteredChapters: any[] = [];
  chapterCounter: number = 1;
  ascending: boolean = true;
  sortValue: string = 'ASCENDING';

  constructor(
    private quranService: QuranService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchChapters();
  }

  fetchChapters() {
    this.quranService.getChapters().subscribe({
      next: (response: any[]) => {
        this.chapters = response.map((chapter, index) => ({
          ...chapter,
          chapterNumber: index + 1,
        }));
        this.filteredChapters = this.chapters;
      },
      error: (err: any) => {
        err =
          'Surahs could not be loaded. Please check your internet connection and try again.';
        this.toastr.error('Error', err, {
          timeOut: 3500,
          positionClass: 'toast-bottom-right',
        });
      },
    });
  }

  selectChapter(chapter: any) {
    const chapterNumber = chapter.chapterNumber;

    this.quranService.selectChapter(chapterNumber);
    this.router.navigate(['/quran'], {
      queryParams: { surah: chapterNumber },
      queryParamsHandling: 'merge',
    });
  }

  filterSurahs(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.filteredChapters = this.chapters.filter((chapter: any) => {
      return (
        chapter.surahName.toLowerCase().includes(filterValue) ||
        chapter.surahNameTranslation.toLowerCase().includes(filterValue)
      );
    });
  }

  sortSurahs() {
    this.ascending = !this.ascending;
    this.filteredChapters.sort((a, b) =>
      this.ascending
        ? a.chapterNumber - b.chapterNumber
        : b.chapterNumber - a.chapterNumber
    );
  }
}
