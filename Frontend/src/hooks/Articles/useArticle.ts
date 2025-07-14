import { BASE_URL } from '@/constants/APIs';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Article } from '@/types/article';

const getArticle = async (
    id: string
): Promise<{
    data: { article: Article };
}> => {
    try {
        const response = await axios.get<{
            data: { article: Article };
        }>(`${BASE_URL}/articles/${id}`);
        return response.data;
    } catch {
        throw new Error('Network request failed');
    }
};

const useArticle = (id: string) => {
    return useQuery({
        queryKey: ['article', id],
        queryFn: () => getArticle(id),
        select: (res) => res.data.article,
        refetchOnWindowFocus: false,
    });
};

export default useArticle;
