/**
 * Created by Javes on 3/19/2017.
 */
/*
Data service for fetching images for the thumbnails for videos
 */
 /**
  * Created by Javes on 3/19/2017.
  */
 /*
 Data service for fetching video information
  */
  import { Injectable } from '@angular/core';

  @Injectable()
  export class VideoService {
    private mock_url = "../assets/nv-now.mp4";



    getVideoUrl(){
      return this.mock_url;
    }
  }
