import { Action, Mutation, State } from 'vuex-simple';
import { Image, Images } from '@/types';

export class RootStore {
  @State()
  public activeImage?: Image;

  @State()
  public images: Images = [];

  @State()
  public isModalOpened = false;

  @State()
  public selectedImages: Images = [];

  @State()
  public total = 0;

  @Mutation()
  public setActiveImage(image: Image): void {
    this.activeImage = image;
  }

  @Mutation()
  public setTotal(total: number): void {
    this.total = total;
  }

  @Mutation()
  public setImages(images: Images): void {
    this.images = images;
  }

  @Mutation()
  public reverseImageSelection(imageId: number): void {
    return this.images.forEach((image: Image) => {
      if (image.id === imageId) {
        image.selected = !image.selected;
      }
    });
  }

  @Action()
  public toggleImageSelection(imageId: number): void {
    this.reverseImageSelection(imageId);
  }

  @Action()
  public toggleModalWindow(): void {
    this.isModalOpened = !this.isModalOpened;
  }
}

