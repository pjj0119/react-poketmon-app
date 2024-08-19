import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import PokeCard from './components/PokeCard'
import { useDebounce } from './hooks/useDebounce';


function App() {

	// 포켓몬 데이터를 저장할 상태 선언
	const [pokemons, setPokemons] = useState([]);

	// 포켓몬 데이터 불러 올 데이터 저장
	const [offset, setOffset] = useState(0);
	const [limit, setLimit] = useState(20);

	// 검색
	const [searchTerm, setSearchTerm] = useState("");

	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	useEffect(() => {
		handleSearchInput(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	// 컴포넌트가 처음 렌더링될 때 fetchPokeData 함수를 실행
	useEffect(() => {
		fetchPokeData(true);
	}, []);

	// 포켓몬 데이터를 가져오는 비동기 함수
	const fetchPokeData = async (isFirstFetch) => {
		try {
			const offsetValue = isFirstFetch ? 0 : offset + limit;
			// 포켓몬 데이터를 가져올 API URL
			const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`;
			// API 호출하여 데이터 가져오기
			const response = await axios.get(url);
			// 가져온 데이터를 콘솔에 출력
			//console.log(response.data.results);
			// 포켓몬 데이터를 상태에 저장
			setPokemons([...pokemons, ...response.data.results]);
			setOffset(offsetValue);
			//console.log(offsetValue);
			console.log(url);
		} catch (error) {
			// 에러가 발생하면 콘솔에 출력
			console.error(error);
		}
	};
	//검색
	const handleSearchInput = async (searchTerm) => {
		
		if(searchTerm.length > 0){
			try{
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
				const pokemonData = {
					url : `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
					name : searchTerm
				};
				setPokemons([pokemonData]);
			}catch(error){
				setPokemons([]);
				console.log(error)
			}
		}else{
			fetchPokeData(true);
		}
	}
	return (
		<>
			<article className='pt-6'>
				<header className='flex flex-col gap-2 w-full px-4 z-50'>
					<div className='relative z-50'>
						<form action="" className='relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto'>
							<input 
								type="text"
								className='text-xs w-[20.5rem] h-6 px-2 py-1 bg-[hsl(214,13%,47%)] rounded-lg text-gray-300 text-center' 
								onChange={(e) => setSearchTerm(e.target.value)} 
								value={searchTerm}
							/>
							<button type='submit' className='text-xs bg-slate-900 text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700'>검색</button>
						</form>
					</div>
				</header>
				
				<div className='mx-auto text-rightsmax-w-3xl px-3'>

				</div>
				<section className='pt-6 flex flex-col justify-center items-center z-0'>
					<div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-3xl">
						{pokemons.length > 0 ? (
							pokemons.map(({url,name},index) => (
								<PokeCard key={url} url={url} name={name}/>
							))
						) : (
							<h2 className='font-medium text-lg text-slate-900 mb-1'>포켓몬이 없습니다</h2>
						)}
					</div>
				</section>
				<div className='text-center'>
					<button onClick={() => {fetchPokeData(false)}} className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg text-white'>더 보기</button>
				</div>
			</article>
		</>
	)
}

export default App
