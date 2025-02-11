export interface IPost {
  data: IPostData[];
  total_data: number;
  limit: number;
  offset: number;
}

export interface IPostData {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  created_date: string;
  updated_date: string;
}
