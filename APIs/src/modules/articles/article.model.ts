import { Document, Model, ObjectId, Schema, model } from 'mongoose';

export interface ArticleDocument extends Document {
    _id: ObjectId;
    title: string;
    description: string;
    content: string;
    author: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

interface ArticleModel extends Model<ArticleDocument> {}

const articleSchema = new Schema<ArticleDocument, ArticleModel>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            minlength: 30,
            maxlength: 250
        },
        content: {
            type: String,
            requireD: true,
            minlength: 200,
            maxlength: 1000
        },
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

export const Article = model<ArticleDocument, ArticleModel>('Article', articleSchema);
