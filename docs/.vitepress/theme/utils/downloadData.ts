export default function downloadData(filename: string, data: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = data;
  link.click();
}
