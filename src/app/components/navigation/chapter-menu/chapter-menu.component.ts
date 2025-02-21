import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { MatIconModule } from '@angular/material/icon';
import { QuranService } from '../../../services/quran.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chapter-menu',
  standalone: true,
  imports: [MatIconModule, HttpClientModule, NgFor],
  templateUrl: './chapter-menu.component.html',
  styleUrl: './chapter-menu.component.scss',
  providers: [QuranService],
})
export class ChapterMenuComponent implements OnInit {
  chapters: any[] = [];
  filteredChapters: any[] = [];
  chapterCounter: number = 1;
  surah: any;

  constructor(
    private navigationService: NavigationService,
    private quranService: QuranService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchChapters();
    this.fetchChapter();
  }

  triggerChapterMenu = () => {
    this.navigationService.closeChapterMenu();
  };

  fetchChapter() {
    this.route.queryParams.subscribe((params) => {
      const chapterNumber = +params['surah'];
      if (chapterNumber) {
        this.quranService.getChapter(chapterNumber).subscribe({
          next: (response: any) => {
            const ayahs = response.english.map(
              (englishText: string, index: number) => {
                return {
                  english: englishText,
                  arabic: response.arabic1[index],
                };
              }
            );

            this.surah = {
              ...response,
              ayahs,
            };
          },
          error: (err: any) => {
            err =
              'The requested Surah could not be loaded. Please check your internet connection and try again.';
            this.toastr.error('Error', err, {
              timeOut: 3500,
              positionClass: 'toast-bottom-right',
            });
          },
        });
      }
    });
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
      error: (error) => {
        console.error('API error: ', error);
      },
    });
  }

  selectChapter(chapter: any) {
    const chapterNumber = chapter.chapterNumber;

    this.quranService.selectChapter(chapterNumber);
    this.router
      .navigate(['/quran'], {
        queryParams: { surah: chapterNumber },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.navigationService.closeChapterMenu();
      });
  }
}
