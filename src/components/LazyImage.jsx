import React, { useEffect, useState } from 'react'

export const LazyImage = ({img, name}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [opacity, setOpacity] = useState('opacity-0');
	useEffect(() => {
		isLoading ? setOpacity('opacity-0') : setOpacity('opacity-100')
	},[isLoading])
  return (
	<>
		{isLoading && 
			<div className='absolute h-full z-10 w-full flex items-center justify-center text-none'>...loading</div>
		}
		<img src={img} alt={name} loading='lazy' onLoad={() => {setIsLoading(false)}} className={`w-full object-contain h-full ${opacity}`}/>
	</>
  )
}
export default LazyImage