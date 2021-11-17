import "./SearchInput.scss"
import { ChangeEvent } from "react"
import SearchIcon from "../icons/SearchIcon"

interface SearchInputProps extends React.HTMLProps<HTMLDivElement> {
  value: string,
  iconCount: number,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function SearchInput({ value, onChange, iconCount, className, ...props }: SearchInputProps) {
  return (
    <div
      className="search-input"
      {...props}
    >
      <SearchIcon className='icon'/>
      <input
        autoFocus
        type="search"
        value={value}
        onChange={onChange}
        placeholder={`Search ${iconCount} icons`}
        className="input__field"
      />
    </div>
  )
}

export default SearchInput
