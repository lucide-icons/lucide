const chunkArray = <ItemType>(stream: ItemType[], size: number) => {
  return stream.reduce<ItemType[][]>(
    (chunks, item, idx, arr) =>
      idx % size == 0 ? [...chunks, arr.slice(idx, idx + size)] : chunks,
    [],
  );
};

export default chunkArray;
