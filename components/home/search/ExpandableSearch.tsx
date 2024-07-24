import GlobalSearch from '@/components/search/GlobalSearch'
import React from 'react'

type Props = {}

function ExpandableSearch({}: Props) {
  return (
    <GlobalSearch />

    // <form action="" className="transition-all relative mx-auto w-max">
    //   <input
    //     type="search"
    //     className="transition-all peer cursor-pointer relative z-10 h-8 w-8 rounded-full border bg-transparent pr-12 outline-none focus:w-full focus:cursor-text focus:border-secondary-300/60 focus:pr-14 focus:pl-4"
    //   />
    //   <svg
    //     className="transition-all absolute inset-y-0 my-auto h-8 w-12 border-l border-transparent stroke-gray-500 px-3.5 peer-focus:border-secondary-300/60 peer-focus:stroke-secondary-500/60"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     stroke="currentColor"
    //     stroke-width="2"
    //   >
    //     <path
    //       stroke-linecap="round"
    //       stroke-linejoin="round"
    //       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    //     />
    //   </svg>
    // </form>
  )
}

export default ExpandableSearch
