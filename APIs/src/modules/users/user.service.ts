import { User, UserDocument } from './user.model';
import { AppError } from '../../utils/app-error';
import { CreateUserDto } from './dto/create-user.dto';

export const createUser = async (createUserDto: CreateUserDto): Promise<UserDocument> => {
    try {
        const userToSave = {
            username: createUserDto.username,
            password: createUserDto.password
        };

        const existingUser = await User.findOne({ username: userToSave.username }).exec();

        if (existingUser) throw new AppError('This username already exists!', 409);

        const createdUser = new User(userToSave);

        return await createdUser.save();
    } catch (error) {
        throw error;
    }
};
