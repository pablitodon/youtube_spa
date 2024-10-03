
import { Button, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetSearch } from '../../redux/slices/searchYoutubeSlice';
import ModalComponent from '../Modal/Modal';
import { setResultText } from '../../redux/slices/resultTextSlice';
import { toggleModal } from '../../redux/slices/visibleModalSlice';
// import { allStartResponse } from '../../redux/slices/saveRequestSlice';

const SearchPage = () => {

    const [searchTextInput, setSearchTextInput] = useState('');
    const [viewType, setViewType] = useState('grid')
    const dispatch = useDispatch();
    const { resultText } = useSelector(state => state.textResultSearch)
    const { items, status } = useSelector(state => state.youtubeSearch);


    const handleChange = (e) => {
        setSearchTextInput(e.target.value)
    }

    useEffect(() => {
        setSearchTextInput(resultText)
    }, [resultText]);


    const handleListView = () => {
        setViewType('list');
    }
    const handleGridView = () => {
        setViewType('grid');
    }

    const handleSearch = (searchText) => {
        if (searchText.length <= 0) {
            alert('Поиск должен включать символы')
            return
        }
        dispatch(fetchGetSearch({ query: searchText }))
        dispatch(setResultText(searchText))
    }

    const handleModalOpen = () => {
        dispatch(toggleModal())
    }

    return (
        <>
            <div className='search-header'>
                <h2>Поиск видео</h2>
                <Space.Compact className='search-container' >
                    <div className='input-with-button'>
                        <Input
                            className='search-input'
                            // style={{ width: '500px' }}
                            value={searchTextInput}
                            onChange={handleChange}
                        />
                        {status === 'succeeded' &&
                            <button className='save-button' onClick={handleModalOpen} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '20px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>

                            </button>}
                    </div>
                    <Button className='search-button' onClick={() => handleSearch(searchTextInput)} type="primary">Submit</Button>
                </Space.Compact>
            </div>
            <div>
                <div className='control-container' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', items: "center" }}>
                    <p className='results-title'>
                        {status === 'succeeded' && `Видео по запросу "${resultText}"`}
                    </p>
                    <div className='results-container'>
                        {
                            status === 'succeeded' &&
                            <div>
                                <a style={{ cursor: 'pointer', opacity: viewType === 'list' ? 1 : 0.5 }} onClick={handleListView} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '20px' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </a>
                                <a style={{ cursor: 'pointer', opacity: viewType === 'grid' ? 1 : 0.3 }} onClick={handleGridView}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '20px' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                    </svg>
                                </a>
                            </div>
                        }
                    </div>
                </div>
                <div className='results-container' >
                    <div className={viewType === 'grid' ? 'video-grid' : 'video-list'}>
                        {items &&
                            items.map((item) => {
                                return (
                                    <div className={viewType === 'grid' ? 'video-card' : 'video-item'} key={item.id.videoId}>
                                        <img src={item.snippet.thumbnails.medium.url} className={viewType === 'list' ? 'video-thumbnail' : ''} alt="" />
                                        <div className='video-card-content'>
                                            <p className='video-card-text'>
                                                {
                                                    item.snippet.title.length > 40 && viewType === 'grid' ?
                                                        `${item.snippet.title.substring(0, 40)}...` :
                                                        item.snippet.title
                                                }
                                            </p>
                                            <h4 className='channel-title' >{item.snippet.channelTitle}</h4>
                                            <div className='video-card-footer'>
                                                <h6 className='channel-title-views'>{item.statistics.viewCount} просмотров</h6>
                                                <h6 className='channel-title'>{item.timeUploadedAgo}</h6>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                <ModalComponent />
            </div>
        </>
    );
};

export default SearchPage;






