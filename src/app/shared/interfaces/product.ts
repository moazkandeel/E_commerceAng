export interface Product {
  _id: string;
  description:string;
  imageCover:string;
  category:{name:string};
  title:string;
  price:number;
  ratingsAverage:number;
}
