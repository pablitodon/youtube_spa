import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {}; 






const getSearch = async ({query,maxResults,order}) => {
    try {
        const response = await axios.get(
            import.meta.env.VITE_SOME_URL_REACT_APP_YOUTUBE_API_URL,
            {
              params: {
                part:"snippet",
                type: "video",
                order: order,
                maxResults: maxResults || 12 ,
                q:`${query}`,
                key:import.meta.env.VITE_SOME_KEY_REACT_APP_YOUTUBE_API_KEY,
              },    
            },
          )
          return response.data
 
    } catch (error) {
        throw  `Error fetching data: ${error}`;
    }
};


const getStatisticsVideo  = async (videoIds) => {
  try {
      const getVideoIdResponse =  await axios.get(
        import.meta.env.VITE_SOME_URL_REACT_APP_YOUTUBE_API_URL_VIDEO_STATISTICS,
        {
          params: {
            part:"statistics",
            id: videoIds,
            key: import.meta.env.VITE_SOME_KEY_REACT_APP_YOUTUBE_API_KEY,
          },    
        },
      )  
      return getVideoIdResponse.data.items
  } catch (error) {
    throw  `Error fetching data: ${error}`;
  }
}


const agoCreateTime = (date) => {
  const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
  };

  const countIntervalSeconds = Math.floor((new Date() - new Date(date)) / 1000);

  for (const [key, value] of Object.entries(intervals)) {
      const intervalCount = Math.floor(countIntervalSeconds / value);
      if (intervalCount >= 1) {
          switch (key) {
              case 'year':
                  return `${intervalCount} ${intervalCount === 1 ? 'год' : intervalCount < 5 ? 'года' : 'лет'} назад`;
              case 'month':
                  return `${intervalCount} ${intervalCount === 1 ? 'месяц' : intervalCount < 5 ? 'месяца' : 'месяцев'} назад`;
              case 'day':
                  return `${intervalCount} ${intervalCount === 1 ? 'день' : intervalCount < 5 ? 'дня' : 'дней'} назад`;
              case 'hour':
                  return `${intervalCount} ${intervalCount === 1 ? 'час' : intervalCount < 5 ? 'часа' : 'часов'} назад`;
              case 'minute':
                  return `${intervalCount} ${intervalCount === 1 ? 'минута' : intervalCount < 5 ? 'минуты' : 'минут'} назад`;
          }
      }
  }
  return `${countIntervalSeconds} секунд назад`;
};


const fetchGetSearch = createAsyncThunk(
    'youtubeSearch/getItems',
    async ({query,maxResults,order}) => {
        const responseSearch = await getSearch({query,maxResults,order})
        const videoIds = responseSearch.items.map(item => item.id.videoId).join(',');
        if (videoIds.length === 0) {
          return []; 
      }
       const responseStats = await getStatisticsVideo(videoIds);

        const responseData = responseSearch.items.map(item => {
          const findItem = responseStats.find(elem =>  elem.id === item.id.videoId)
          const timeUploaded = agoCreateTime(item.snippet.publishedAt);
          if(findItem && timeUploaded) {
            return {...item, statistics: findItem.statistics,timeUploadedAgo:timeUploaded}
          }
        })
        return responseData;
    }
)

const youtubeSearchSlice = createSlice({
  name: "youtubeSearch",
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.items = [];       
      state.status = '';  
      state.error = null;   
  },
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchGetSearch.pending, (state) => {
        state.status = 'loading';
      })
     .addCase(fetchGetSearch.fulfilled, (state, action) => {
        state.status ='succeeded';
        state.items = action.payload
      })
     .addCase(fetchGetSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});



export const { clearSearchResults } = youtubeSearchSlice.actions;
export { fetchGetSearch }  
export default youtubeSearchSlice.reducer;
