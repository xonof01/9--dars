import React, { Suspense, lazy, useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import NavigateBtn from '../../components/NavigateBtn'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT_ID } from "../../hooks/useEnv"
import Loading from "../../assets/images/Loading.png"
import { useNavigate } from 'react-router-dom'

const MusicList = lazy(() => new Promise((resolve) => { return setTimeout(() => resolve(import("../../components/MusicList")), 800) }))

function Home() {
	const navigate = useNavigate()
	const { accessToken, setPlay, setPlaying } = useContext(Context)

	const spotifyApi = new SpotifyWebApi({
		clientId: CLIENT_ID
	})

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken)
	}, [accessToken])

	const [homeTopTracks, setHomeTopTracks] = useState([])
	useEffect(() => {
		if (accessToken) {
			spotifyApi.searchAlbums("Oxunjon Mamadaliyov").then(res => {
				setHomeTopTracks(res.body.albums.items.splice(0, 6).map(item => {
					const data = {
						id: item.id,
						trackName: item.name,
						trackImg: item.images[0].url,
						artistName: item.artists[0].name,
						uri: item.uri
					}
					return data
				}));
			})
		}
	}, [accessToken])

	function handlePlayMusic(item) {
		setPlay(item.uri)
		setPlaying(true)
		navigate(`/music/${item.id}`)
	}

	return (
		<div className='bg-login h-auto'>
			<NavigateBtn bg={"bg-[#3333a3]"} shadow={"shadow-[#3333a3]"} />
			<div className="pt-[29px] mb-[30px] px-[55px]">
				<h2 className="text-[#fff] text-[40px] font-['CircularStdBold'] leading-[50px] tracking-[-1%]">Good afternoon</h2>
				<ul className="flex justify-between flex-wrap mt-[25px]">
					{homeTopTracks.map(item => (
						<li onClick={() => handlePlayMusic(item)} className="w-[49%] h-[82px] flex items-center space-x-[24px] bg-item mb-[16px] rounded-[6px] cursor-pointer" key={item.id}>
							<img className='w-[82px] h-[82px] rounded-l-[6px]' src={item.trackImg} alt="track img" width={82} height={82} />
							<h3 className="text-[20px] text-[#fff] font-['CircularStdBold'] leading-[25px] tracking-[1%]">{item.trackName}</h3>
						</li>
					))}
				</ul>
			</div>
			<div className="space-y-[50px] pb-[50px] px-[40px]">
				<Suspense fallback={<img className='mx-auto' src={Loading} alt="Loading..." width={250} height={250} />}>
					<MusicList API={"Jahongir Otajonov"} MusicListTitle={"Jahongir Otajonov"} />
				</Suspense>
				<Suspense fallback={<img className='mx-auto' src={Loading} alt="Loading..." width={250} height={250} />}>
					<MusicList API={"Botir Qodirov"} MusicListTitle={"Botir Qodirov"} />
				</Suspense>
				<Suspense fallback={<img className='mx-auto' src={Loading} alt="Loading..." width={250} height={250} />}>
					<MusicList API={"Xurshid Rasulov"} MusicListTitle={"Xurshid Rasulov"} />
				</Suspense>
				<Suspense fallback={<img className='mx-auto' src={Loading} alt="Loading..." width={250} height={250} />}>
					<MusicList API={"Ozodbek Nazarbekov"} MusicListTitle={"Ozodbek Nazarbekov"} />
				</Suspense>
			</div>
		</div>
	)
}

export default Home