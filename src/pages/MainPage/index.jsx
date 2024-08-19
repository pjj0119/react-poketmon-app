import { useEffect, useState } from 'react'
import axios from 'axios'
import PokeCard from '../../components/PokeCard'
import AutoComplete from '../../components/AutoComplete'


const MainPage = () => {

	// 모든 포켓몬 데이터를 가지고 있는 State
	const [allPokemons, setAllPokemons] = useState([]);

	// 실제로 리스트로 보여주는 포켓몬 데이터를 가지고 있는 State
	const [displayedPokemons, setDisplayedPokemons] = useState([]);

	// 한번에 보여주는 포켓몬 수
	const limitNum = 20;
	// 포켓몬 데이터를 가져올 API URL
	const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

	// 컴포넌트가 처음 렌더링될 때 fetchPokeData 함수를 실행
	useEffect(() => {
		fetchPokeData();
	}, []);
	
	const filterDisplayedPokemonData = (allPokemonsData , displayedPokemons = []) => {
		const limit = displayedPokemons.length + limitNum;
		// 모든 포켓몬 데이터에서 limitNum 만큼 더 가져오기
		const array = allPokemonsData.filter((pokemon, index) => index + 1 <= limit);
		return array;
	};


	// 포켓몬 데이터를 가져오는 비동기 함수
	const fetchPokeData = async () => {
		try {
			// 1008개 포켓몬 데이터 받아오기
			const response = await axios.get(url);
			// 모든 포켓몬 데이터 기억하기
			setAllPokemons(response.data.results);
			//실제로 화면에 보여줄 포켓몬 리스트 State
			setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
		} catch (error) {
			// 에러가 발생하면 콘솔에 출력
			console.error(error);
		}
	};
	return (
		<>
			<article className='pt-6'>
				<header className='flex flex-col gap-2 w-full px-4 z-50'>
					<AutoComplete
						allPokemons={allPokemons}
						setDisplayedPokemons={setDisplayedPokemons}
					/>
				</header>
				
				<div className='mx-auto text-right max-w-3xl px-3'>

				</div>
				<section className='pt-6 flex flex-col justify-center items-center z-0'>
					<div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-3xl">
						{displayedPokemons.length > 0 ? (
							displayedPokemons.map(({url,name},index) => (
								<PokeCard key={url} url={url} name={name}/>
							))
						) : (
							<h2 className='font-medium text-lg text-slate-900 mb-1'>포켓몬이 없습니다</h2>
						)}
					</div>
				</section>
				<div className='text-center'>
					{(allPokemons.length > displayedPokemons.length) && (displayedPokemons.length != 1) && 
						(
							<button 
							onClick={() => setDisplayedPokemons(filterDisplayedPokemonData(allPokemons, displayedPokemons))} 
							className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg text-white'>더 보기
							</button>
						)
					}
				</div>
			</article>
		</>
	)
}

export default MainPage
