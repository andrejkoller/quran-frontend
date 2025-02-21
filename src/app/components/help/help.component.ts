import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [NgFor],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})
export class HelpComponent {
  points = [
    {
      title: '1. How can I search for a specific Surah or verse in the Quran?',
      description:
        'You can use the search bar at the top of the page. Simply type the name of the Surah, the chapter number, or the verse number, and the system will display the corresponding text.',
    },
    {
      title:
        '2. Is it possible to read translations alongside the Arabic text?',
      description:
        'Yes, you can enable translations by selecting your preferred language from the settings menu. This will display the translation side by side with the Arabic text for easier understanding.',
    },
    {
      title: '3. Can I bookmark or save specific verses for later?',
      description:
        'Absolutely! Click on the bookmark icon next to any verse to save it. You can access your saved verses from the "Bookmarks" section in the navigation menu.',
    },
    {
      title: '4. How do I switch between recitation and reading modes?',
      description:
        'You can toggle between modes in the top-right corner. Recitation mode allows you to listen to the Quran being recited, while reading mode focuses on displaying the text with options for translations and tafsir (commentary).',
    },
  ];
}
