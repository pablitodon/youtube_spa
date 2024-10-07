/* eslint-disable no-unused-vars */
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetSearch } from "../../redux/slices/searchYoutubeSlice";
import { useNavigate } from "react-router-dom";
import { setResultText } from "../../redux/slices/resultTextSlice";
import { toggleModal } from "../../redux/slices/visibleModalSlice";
import ModalComponent from "../Modal/Modal";
import { editDataFunc } from "../../redux/slices/editData";
import './favorite.css'
import { useEffect } from "react";
import { allStartResponse } from "../../redux/slices/saveRequestSlice";

const Favorite = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const saveRequests = useSelector((state) => state.saveRequests);
    const emailData = localStorage.getItem('user');
    const querys = localStorage.getItem(`${emailData}`)



    useEffect(() => {
        dispatch(allStartResponse(JSON.parse(querys)))
    }, []);



    const handleRequestExecute = (query, maxResults, order) => {
        try {
            dispatch(setResultText(query))
            dispatch(fetchGetSearch({ query: query, maxResults: maxResults, order: order }));
            navigate('/main/search');
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    }


    const handleOpenModalRedactor = (id) => {
        const selectedItem = saveRequests.find(video => video.id === id);

        if (selectedItem) {
            dispatch(editDataFunc(selectedItem));
            dispatch(toggleModal());
        }
    };


    return (
        <div className="favorite-container">
            <h2>Избранное:</h2>
            <div className="favorite-title">
                <div>
                    {
                        saveRequests && saveRequests.map((video) => (
                            <div key={video.id} className="video-item-favorite">
                                <p style={{ padding: '10px' }}>{video.type}</p>
                                <div style={{ padding: '10px' }}>
                                    <Button onClick={() => handleRequestExecute(video.query, video.maxResults, video.sortBy)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" style={{ width: '20px' }} stroke="#000">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </Button>
                                    <Button onClick={() => handleOpenModalRedactor(video.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" style={{ width: '20px' }} stroke="#000">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <ModalComponent />
            </div>
        </div>


    );
};

export default Favorite;