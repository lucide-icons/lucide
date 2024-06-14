export type IconContent = [icon: string, src: string];

async function generateZip(icons: IconContent[]) {
  const JSZip = (await import('jszip')).default;

  const zip = new JSZip();

  const addingZipPromises = icons.map(([name, src]) => zip.file(`${name}.svg`, src));

  await Promise.all(addingZipPromises);

  return zip.generateAsync({ type: 'blob' });
}

export default generateZip;
