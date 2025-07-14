export type Article = {
    _id: string;
    title: string;
    content: string;
    author: {
        username: string;
    };
    createdAt: string;
    updatedAt: string;
    createdBy: string;
};
