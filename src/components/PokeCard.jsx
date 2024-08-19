import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LazyImage from './LazyImage'
import { Link } from 'react-router-dom';

function PokeCard({url,name}) {
	// 포켓몬 데이터를 저장할 상태 선언
	const [pokemons, setPokemons] = useState({});

	// 컴포넌트가 처음 렌더링될 때 fetchPokeData 함수를 실행
	useEffect(() => {
		fetchPokeDetailData();
	}, []);

	// 포켓몬 데이터를 가져오는 비동기 함수
	const fetchPokeDetailData = async () => {
		try {
			// API 호출하여 데이터 가져오기
			const response = await axios.get(url);
			// 커스텀 한 포켓몬 데이터를 상태에 저장
			setPokemons(fomatPokemonData(response.data));
		} catch (error) {
			// 에러가 발생하면 콘솔에 출력
			console.error(error);
		}
	};
	// 가져온 포켓몬 데이터를 필요한 부분만 출력
	const fomatPokemonData = (params) => {
		//params에 id , name, types만 가져옴
		const {id , name, types} = params;
		// id , name, types를 커스텀
		const PokeData = {
			id,
			name,
			type : types[0].type.name
		}
		// 커스텀 한 내용을 출력
		return PokeData
	};
	//console.log(pokemons)
	
	const bg = `bg-${pokemons?.type}`;
	const border = `border-${pokemons?.type}`;
	const text = `text-${pokemons?.type}`;
	const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons?.id}.png`;
  return (
	<>
		{pokemons &&
			<Link to={`/pokemon/${name}`} className={`box-border rounded-lg ${border} w-[8.5rem] h-[8.5rem] z-0 bg-slate-800 justify-between items-center`}>
				<div className={`${text} text-xs w-full pt-1 px-2 text-right rounded-t-lg`}>#{pokemons.id ? pokemons.id.toString().padStart(3,'00') : ''}</div>
				<div className={`w-full f-6 flex items-center justify-center`}>
					<div className={`box-border relative flex w-full h-[5.5rem] basis justify-center items-center`}>
						<LazyImage img={img} name={name}/>
					</div>
				</div>
				<div className={`${bg} text-xs text-zinc-100 h-[2rem] rounded-b-lg uppercase font-semibold flex justify-center items-center`}>{pokemons.name}</div>
			</Link>
		}
	</>
  )
}

export default PokeCard