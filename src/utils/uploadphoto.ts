import fs from 'fs';
import path from 'path';
import { photoProps } from '../services/register.service';
import { logger } from './logger';

/**
 *
 * @param uploadPhoto
 * @returns filePath
 * This function will take a file as input and save it to the uploads directory. The function will return the file path of the saved file
 */
export const uploadPhoto = async (file: photoProps) => {
  const fileName = file.name;
  const fileType = file.mimeType.split('/')[1];
  const data = Buffer.from(file.data, 'base64');
  const uploadsFolderPath = path.join(__dirname, '../uploads');
  const filePath = path.join(uploadsFolderPath, `${fileName}.${fileType}`);

  try {
    // Ensure that the uploads folder exists
    await fs.promises.mkdir(uploadsFolderPath, { recursive: true });
    await fs.promises.writeFile(filePath, data);

    return filePath;
  } catch (error) {
    logger.error(`Error uploading photo:, ${error}`);
    throw error; // Propagate the error to the caller
  }
};
