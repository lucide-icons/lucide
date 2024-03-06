const chunkArray = <ArrayType>(stream: ArrayType, size: number) => {
  return stream.reduce<ArrayType[][]>(
    (chunks, item, idx, arr) =>
      idx % size == 0 ? [...chunks, arr.slice(idx, idx + size)] : chunks,
    [],
  );
};

export default chunkArray;
