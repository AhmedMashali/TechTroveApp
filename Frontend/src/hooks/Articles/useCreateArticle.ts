
import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '@/constants/APIs';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


type ArticleRequest = {
  title: string;
  content: string;
};

const postArticle = async (articleData: ArticleRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/articles`, articleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed to create article');
  }
};

export const useCreateArticle = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (articleData: ArticleRequest) => postArticle(articleData),
        onSuccess: () => {
            toast.success('Article created successfully!');
            navigate('/articles');
        },
        onError: () => {
            toast.error('Failed to create article');
        },
    });
};
