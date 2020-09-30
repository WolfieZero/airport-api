import client from 'axios';
import { writeFile } from 'fs';

interface Response {
  data: Record<string, unknown>[];
}

export const downloadFile = (url: string, file: string): Promise<void> => {
  return new Promise(resolve => {
    client.get(url).then(({ data }: Response) => {
      const contents = JSON.stringify(data);
      writeFile(file, contents, { encoding: 'utf-8' }, () => resolve());
    });
  });
};
