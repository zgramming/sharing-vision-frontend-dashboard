import { IPostDetail } from "@/interfaces/post-detail.interface";
import { IPost } from "@/interfaces/post.interface";
import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";

interface UseListParams {
  limit?: number;
  offset?: number;
  status?: string;
}

const url = {
  base: "/posts",
};

const hooks = {
  useList({ limit = 10, offset = 0, status }: UseListParams) {
    let uri = `${url.base}/page/${limit}/${offset}`;

    if (status) {
      uri += `?status=${status}`;
    }

    const { data, isLoading, error, isError, isSuccess, refetch } =
      useQuery<IPost>({
        queryKey: ["posts", { limit, offset, status }],
        queryFn: async () => {
          const response = await http.fetcher(uri);
          return response;
        },
      });

    return {
      data: data?.data || [],
      totalData: data?.total_data || 0,
      isLoading,
      error,
      isError,
      isSuccess,
      refetch,
    };
  },

  useDetail(id?: string) {
    const isValid = id !== undefined && id !== null && !isNaN(parseInt(id));
    let uri = `${url.base}/${id}`;
    const { data, isLoading, error, isError, isSuccess, refetch } =
      useQuery<IPostDetail>({
        queryKey: ["post", id],
        queryFn: async () => {
          const response = await http.fetcher(uri);
          return response;
        },
        enabled: isValid,
      });

    return {
      data: data?.data,
      isLoading,
      error,
      isError,
      isSuccess,
      refetch,
    };
  },
};

interface CreatePostDto {
  title: string;
  content: string;
  category: string;
  status: string;
}

interface UpdatePostDto extends Partial<CreatePostDto> {}

const api = {
  async create(data: CreatePostDto) {
    const response = await http.post(url.base, data);
    return response;
  },

  async update(id: number, data: UpdatePostDto) {
    const response = await http.put(`${url.base}/${id}`, data);
    return response;
  },

  async delete(id: number) {
    const response = await http.del(`${url.base}/${id}`);
    return response;
  },
};

export const PostRepository = {
  url,
  hooks,
  api,
};
