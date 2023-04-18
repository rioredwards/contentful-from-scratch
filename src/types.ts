export type Image = {
  title: string;
  url: string;
  width: number;
  height: number;
};

export interface Project {
  title: string;
  slug: string;
  description: string;
  image: Image;
}
