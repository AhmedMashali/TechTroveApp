import { BASE_URL } from '@/constants/APIs';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Article } from '@/types/article';

const getArticles = async (): Promise<{
    data: { articles: { articles: Article[] } };
}> => {
    try {
        const response = await axios.get<{
            data: { articles: { articles: Article[] } };
        }>(`${BASE_URL}/articles`);
        return response.data;
    } catch {
        throw new Error('Network request failed');
    }
};

const useArticles = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: () => getArticles(),
        select: (res) => res.data.articles.articles,
        refetchOnWindowFocus: false,
    });
};

export default useArticles;
