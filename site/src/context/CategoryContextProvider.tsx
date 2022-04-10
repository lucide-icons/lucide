import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

interface ChatMessage {
  person: string;
  message: string;
}

const categoryContext = React.createContext<undefined>(undefined);

export function CategoryContextProvider({ children }: any) {
  const [categories, setCategories] = useState(
    Object.fromEntries(
      Object.entries(categoriesFile).map(([category, iconNames]) => [
        category,
        iconNames.map(iconName => icons[iconName]),
      ]),
    ),
  );
  const [changes, setChanges] = useState(0);
  const dropZones = useRef<[string, HTMLDivElement][]>([]);

  const handleChange = (category: string) => (newIcons: string[]) => {
    setCategories(currentCategories => ({
      ...currentCategories,
      [category]: newIcons.map(iconName => icons[iconName]),
    }));
  };

  const onItemDrop = (iconName: string, targetCategory: string) => {
    console.log(iconName, targetCategory);
    setCategories(currentCategories => {
      const newIcons = [...currentCategories[targetCategory], icons[iconName]];

      return {
        ...currentCategories,
        [targetCategory]: newIcons,
      };
    });
  };

  const value = useMemo(() => {}, []);

  return <categoryContext.Provider value={value}>{children}</categoryContext.Provider>;
}

export function useCategoryContext() {
  const context = useContext(categoryContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
