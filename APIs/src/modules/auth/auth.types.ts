import { ObjectId } from 'mongoose';

export type AuthResponse = {
    accessToken: string;
    user: {
        _id: ObjectId;
        username: string;
    };
};

export type UserPayload = {
    _id: ObjectId;
    username: string;
};
