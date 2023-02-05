import React from 'react'
import { BsSearch } from 'react-icons/bs'

type SearchInputProps = {

}

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <div className='flex flex-row flex-1 group'>
      <div className='flex flex-1 flex-row justify-start items-center border-gray-400 border-solid border-[1px] rounded-full py-1 px-[16px] space-x-2 group-hover:border-blue-500 group-active:border-blue-500 group-focus-within:border-blue-500'>
        <BsSearch
          className='w-[20px] h-full fill-gray-400'
        />
        <input
          title='Search Reddit...'
          type="text"
          name="search-reddit"
          id="search-reddit"
          placeholder='Search Reddit...'
          className='bg-transparent outline-none flex-1'
        />
      </div>
    </div>
  )
}

export default SearchInput