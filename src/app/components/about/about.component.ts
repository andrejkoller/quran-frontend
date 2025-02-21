import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  points = [
    {
      title: 'Language and Style',
      description:
        'The Quran is written in Arabic, characterized by a poetic and rhythmic structure.',
    },
    {
      title: 'Revelation',
      description:
        'The revelations occurred over 23 years, starting in 610 CE in Mecca and Medina.',
    },
    {
      title: 'Core Message',
      description:
        'The Quran calls for the worship of the one true God and provides moral guidance.',
    },
  ];
}
