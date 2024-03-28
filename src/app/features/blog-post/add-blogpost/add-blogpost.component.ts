import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy{

  model: AddBlogPost;
  isImageSelectorVisible: boolean = false;
  categories$?: Observable<Category[]>;

  imageSelectorSubcription?: Subscription;


category: any;

  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService, private imageService: ImageService
    ){
    this.model={
      title:'',
      shortDescription:'',
      urlHandle:'',
      content:'',
      featuredImageUrl:'',
      author:'',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }
  
  ngOnInit(): void {
   this.categories$ = this.categoryService.getAllCategories();

   this.imageSelectorSubcription = this.imageService.onSelectImage()
   .subscribe({
    next:(selectedImage:any)=>{
      this.model.featuredImageUrl = selectedImage.url;
      this.closeImageSelector();

    }
   })
  }

  onFormSubmit(): void{
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: () =>{
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

  openImageSelector(): void{

    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubcription?.unsubscribe();
  }

}
