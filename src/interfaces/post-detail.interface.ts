export interface IPostDetail {
  data: IPostDetailData;
}

export interface IPostDetailData {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  created_date: string;
  updated_date: string;
}
