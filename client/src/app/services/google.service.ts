import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface ApiReq {
  audioConfig: {
    audioEncoding: string;
    pitch: string;
    speakingRate: string;
  };
  input: {
    text: string;
  };
  voice: {
    languageCode: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  req: ApiReq;
  constructor(private http: HttpClient) {}

  googleSpeech(speech: string) {
    this.req = {
      audioConfig: {
        audioEncoding: 'LINEAR16',
        pitch: '0.00',
        speakingRate: '0.80',
      },
      input: {
        text: speech,
      },
      voice: {
        languageCode: 'pl-PL',
        name: 'pl-PL-Wavenet-B',
      },
    };

    return this.http.post(
      'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=' +
        environment.googleApiKey,
      this.req,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
