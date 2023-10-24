import bcrypt from 'bcrypt';
import { Client } from '../entity/client.entity';
import { dataSource } from '../utils/connection';
import { generateFullName } from '../utils/generateFullName';
import { uploadPhoto } from '../utils/uploadphoto';

export type photoProps = {
  name: string;
  data: string;
  mimeType: string;
};
interface ReqBody {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  active: boolean;
  password: string;
  photos: photoProps[];
  avatar: string;
}

export async function createClient({
  firstName,
  lastName,
  email,
  role,
  active,
  password,
  photos,
  avatar,
}: ReqBody) {
  
    // Hash the password using bcrypt
    const saltWorkFactor = 10;
    const salt = bcrypt.genSaltSync(saltWorkFactor);
    const hashedPassword = bcrypt.hashSync(password, salt);

// Given that the document requirement ask that i genearate a fullname from the registeration section, it is assumed that it the the data entered by the user that will be used to generate a fullname.
    const fullname = generateFullName(firstName, lastName);

    // Create a new Client instance that inherits from User
    const client = new Client();
    client.firstName = firstName;
    client.lastName = lastName;
    client.email = email;
    client.fullName = fullname;
    client.password = hashedPassword;
    client.role = role;
    client.isActive = active;

    // this is the photo upload feature i build, it converts the photo to a base64 string, i did not see the RFC of other tools so i will understand how it work for me to reverse engineer it
    const uploadedPhotos = await Promise.all(
      photos.map((photo) => uploadPhoto(photo))
    );

    // If no avatar is provided, assign a default avatar
    if (!client.avatar) {
      client.avatar = avatar;
    }

    client.photos = uploadedPhotos;

    const datasource = dataSource.getRepository(Client);
    await datasource.save(client);

    return client;
  
}
