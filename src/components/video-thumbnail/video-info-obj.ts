export interface IVideoInfoObj extends VideoInfoObj{
  
};

export class VideoInfoObj {
  id: string;
  videoUrl: string;
  title: string;
  trainer: string;
  duration: string;
  difficulty: string;
  tags: Array<string>;
  description: string;
  thumbUrl: string;
  
  constructor(propertybag: IVideoInfoObj){
    for (let k in propertybag){
      this[k] = propertybag[k];
    }
  }
  
}
