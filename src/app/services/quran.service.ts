import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuranService {
  private baseUrl = 'https://quranapi.pages.dev/api';
  private audioURL = 'https://quranaudio.pages.dev';
  selectedChapter: number = 1;
  currentFontSize: number = 16;

  constructor(private http: HttpClient) {}

  getChapters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/surah.json`);
  }

  selectChapter(chapter: number) {
    this.selectedChapter = chapter;
  }

  getChapter(chapter: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${chapter}.json`);
  }

  getReciters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reciters.json`);
  }

  getAudioRecitations(
    reciterId: string,
    chapter: number,
    ayah: number
  ): Observable<Blob> {
    return this.http.get(
      `${this.audioURL}/${reciterId}/${chapter}_${ayah}.mp3`,
      {
        responseType: 'blob',
      }
    );
  }

  increaseFontSize(size: number) {
    const newSize = size + 1;
    this.currentFontSize = newSize;
    localStorage.setItem('font-size', newSize.toString());
  }

  decreaseFontSize(size: number) {
    const newSize = size - 1;
    this.currentFontSize = newSize;
    localStorage.setItem('font-size', newSize.toString());
  }
}
