import { keys } from 'underscore';
import { WorkBook, WorkSheet, WritingOptions } from 'xlsx/types';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

// ⭐ 导出为 xlsx 或 csv
export default async function exportExcel(
  obj: { [sheetName: string]: any[] } | WorkBook,
  outputName: string,
  suffix: 'xlsx' | 'csv' = 'xlsx'
) {
  let wb: WorkBook;
  if (!obj.Sheets) {
    const json: { [sheetName: string]: any[] } = obj as { [sheetName: string]: any[] };
    // 🍻 https://github.com/SheetJS/js-xlsx
    wb = utils.book_new();
    keys(obj).forEach(key => {
      const ws = utils.json_to_sheet(json[key]);
      utils.book_append_sheet(wb, ws, key);
    });
  } else {
    wb = obj as WorkBook;
  }
  /* bookType can be any supported output type */
  const wopts: WritingOptions = {
    bookType: suffix,
    bookSST: false,
    type: 'array',
  };
  const wbout = write(wb, wopts);
  /* the saveAs call downloads a file on the local machine */
  const bolb = new Blob([wbout], {
    type: 'application/octet-stream',
  });
  saveAs(bolb, `${outputName}.${suffix}`);
}
