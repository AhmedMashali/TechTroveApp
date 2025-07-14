import { BASE_URL } from "@/constants/APIs"
import { useQuery } from "@tanstack/react-query";

type Article = {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
};

const getArticles = async (): Promise<Article[]> => {
    const response = await fetch(`${BASE_URL}/articles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

const useArticles = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: () => getArticles(),
        select: (res) => res.data.articles,
        refetchOnWindowFocus: false,
    });
};

export default useArticles;