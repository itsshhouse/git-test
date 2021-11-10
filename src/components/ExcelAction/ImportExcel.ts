import { isEmpty } from 'underscore';
import { read, utils } from 'xlsx';

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

// ⭐ 支持导入 csv, xlsx  <input file>
export default async function readExcel(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (isEmpty(files)) {
    return;
  }
  const promises: Array<Promise<any>> = [];
  for (let i = 0, f = files[i]; i !== files.length; ++i) {
    const p = new Promise((resolve, reject) => {
      const reader = new FileReader();
      // const name = f.name;
      reader.onload = async (ev: ProgressEvent) => {
        const fResult: any[] = [];
        const data = (ev.target as FileReaderEventTarget).result;
        // const XLSX = await import('xlsx');
        const workbook = read(data, {
          type: 'binary',
        });
        workbook.SheetNames.forEach(sheet => {
          const jsonData = utils.sheet_to_json(workbook.Sheets[sheet]);
          fResult.push(jsonData);
        });
        resolve(fResult);
      };

      reader.onerror = ev => {
        reader.abort();
        reject((ev.target as any).error);
      };
      reader.readAsBinaryString(f);
    });
    promises.push(p);
  }

  try {
    let result = await Promise.all(promises);
    // 对单文件 单sheet输出优化
    if (files.length === 1 && result[0].length === 1) {
      result = result[0][0];
    }
    // eslint-disable-next-line consistent-return
    return result;
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
}
