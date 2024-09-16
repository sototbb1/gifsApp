import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from './gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = []

  private _tagsHistory: string[] = []
  private apiKey:string = 'pvghpvB48XAzPGCGAScbj7rMRw2mFLw4'
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs'

  constructor(private http:HttpClient) {
    const storedTags = localStorage.getItem('historyTag');
    if (storedTags) {
      this._tagsHistory = JSON.parse(storedTags);
    }
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory]
  }
  private organizeHistory(tag: string):void {
    tag = tag.toLowerCase()
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldtag => oldtag !== tag)
    }
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0,10)
    localStorage.setItem('historyTag',JSON.stringify(this._tagsHistory))
  }
  searchTag(tag: string):Promise<void> | void{
    if (tag.length === 0) return
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe((resp)=>{
      this.gifList = resp.data
    })
  }
}
