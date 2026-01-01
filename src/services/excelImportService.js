import * as XLSX from "xlsx";
import { addRecord } from "./recordService";
import { getOffices } from "./businessService";

export const importExcelToOffice = async (
  file,
  userId,
  businessId,
  officeId
) => {
  const offices = await getOffices(userId, businessId);
  const office = offices.find(o => o.id === officeId);

  const officeCurrency = office?.currency || "INR"; // ✅ fallback

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const workbook = XLSX.read(
          new Uint8Array(e.target.result),
          { type: "array" }
        );

        const sheet =
          workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        for (const row of rows) {
          if (!row.Month || !row.Year) continue;

          await addRecord(
            userId,
            businessId,
            officeId,
            {
              month: row.Month,
              year: Number(row.Year),
              revenue: Number(row.Revenue),
              expense: Number(row.Expense),
            },
            officeCurrency
          );
        }

        resolve(true);
      } catch (err) {
        reject(err);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};
