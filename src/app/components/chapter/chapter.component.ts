import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuranService } from '../../services/quran.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [
    HttpClientModule,
    NgFor,
    NgIf,
    NgStyle,
    LoadingSpinnerComponent,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
  ],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss',
  providers: [QuranService],
})
export class ChapterComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  surah: any;
  audioSurah: any[] = [];
  currentIndex = 0;
  audioLoaded$ = new Subject<void>();

  reciters: any;
  selectedReciter: any;

  savedFontSize: number = 16;

  constructor(
    private quranService: QuranService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchChapter();
    this.fetchReciters();
    const savedReciter = localStorage.getItem('reciter');
    if (savedReciter) {
      this.selectedReciter = JSON.parse(savedReciter);
    }
    this.savedFontSize = parseInt(
      localStorage.getItem('font-size') || '16',
      10
    );
  }

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

  fetchReciters() {
    this.quranService.getReciters().subscribe({
      next: (response: any) => {
        if (response && typeof response === 'object') {
          this.reciters = Object.entries(response).map(([id, name]) => ({
            id: parseInt(id, 10),
            name: name as string,
          }));
        } else {
          console.warn('Invalid reciter format:', response);
          this.reciters = [];
        }
      },
      error: (err) => {
        console.error('Error occurred: ', err);
        this.reciters = [];
      },
    });
  }

  changeReciter(reciter: any) {
    if (!reciter) return;
    this.selectedReciter = reciter;
    localStorage.setItem('reciter', JSON.stringify(reciter));
  }

  combineSurahAudio(reciterId: string, chapter: number, ayahCount: number) {
    let currentIndex = 0;
    this.audioSurah = [];

    const fetchNextAyah = () => {
      if (currentIndex >= ayahCount) {
        this.currentIndex = 0;
        this.audioLoaded$.next();
        return;
      }

      this.quranService
        .getAudioRecitations(reciterId, chapter, currentIndex + 1)
        .subscribe({
          next: (response: Blob) => {
            const audioURL = URL.createObjectURL(response);
            this.audioSurah.push(audioURL);
            currentIndex++;
            fetchNextAyah();
          },
          error: (err) =>
            console.error('Fehler beim Laden der Audiodatei:', err),
        });
    };

    fetchNextAyah();
  }

  playSurah() {
    if (!this.audioPlayer || !this.audioPlayer.nativeElement) {
      console.warn('Audio element not found.');
      return;
    }

    if (this.audioSurah.length === 0) {
      console.warn('Audio file not available.');
      return;
    }

    this.currentIndex = 0;
    const audioElement = this.audioPlayer.nativeElement;
    audioElement.src = this.audioSurah[this.currentIndex];
    audioElement.load();
    audioElement.play();
  }

  onAudioEnded() {
    if (!this.audioPlayer || !this.audioPlayer.nativeElement) {
      console.warn('Audio element not found.');
      return;
    }

    this.currentIndex++;

    if (this.currentIndex < this.audioSurah.length) {
      const audioElement = this.audioPlayer.nativeElement;
      audioElement.src = this.audioSurah[this.currentIndex];
      audioElement.load();
      audioElement.play();
    }

    const activeAudio = document.querySelector('.ayah.active');
    activeAudio?.scrollIntoView({ behavior: 'smooth' });
  }

  startAudioRecitation() {
    this.combineSurahAudio(
      this.selectedReciter,
      this.surah.surahNo,
      this.surah.totalAyah
    );

    this.audioLoaded$.subscribe(() => {
      this.playSurah();
    });
  }
}
