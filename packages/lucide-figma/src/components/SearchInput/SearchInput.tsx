import "./SearchInput.scss"
import { ChangeEvent } from "react"
import SearchIcon from "../icons/SearchIcon"

interface SearchInputProps extends React.HTMLProps<HTMLDivElement> {
  value: string,
  iconCount: number,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

function SearchInput({ value, onChange, placeholder, className, ...props }: SearchInputProps) {
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
        placeholder={placeholder}
        className="input__field"
      />
    </div>
  )
}

export default SearchInput
