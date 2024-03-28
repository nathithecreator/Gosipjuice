import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogPost } from '../../../features/blog-post/models/blog-post.model';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BlogImage } from '../../models/blog-image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id:'',
    fileExtention:'',
    fileName: '',
    title:'',
    url: ''
  });

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }

  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images`, formData);
  }

  selectImage(image: BlogImage): void { // Corrected method name
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}