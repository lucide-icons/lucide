interface Icon {
  name: string;
  tags: string[],
}

function useSearch(icons: Icon[], query:string) {
  if(!query) return icons;

  const searchString = query.toLowerCase()

  return icons.filter(({ name, tags }: Icon) => [name, ...tags].some(
      (item:string) => item
        .toLowerCase()
        .includes(searchString)
    )
  );
}

export default useSearch;
