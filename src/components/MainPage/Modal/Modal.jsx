/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Input, Button, Select, Modal, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/slices/visibleModalSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import saveRequestSlice, { addRequest, allStartResponse, updateRequest } from "../../redux/slices/saveRequestSlice";
import './CSSModal.css';
import { v4 as uuidv4 } from 'uuid';
import { editDataFunc, editDataQuery, resetEditData } from "../../redux/slices/editData";
import { setResultText } from "../../redux/slices/resultTextSlice";


const schema = yup.object().shape({
    query: yup.string(),
    type: yup.string().required("Введите название"),
    sortBy: yup.string(),
    maxResults: yup.number().min(1).max(50, "Максимальные результаты должны быть от 1 до 50"),
});





const ModalComponent = () => {



    const dispatch = useDispatch();
    const { resultText } = useSelector(state => state.textResultSearch);
    const { isVisibleModal } = useSelector(state => state.isVisibleModal);
    const editDataFavorite = useSelector(state => state.editDataFavorite.data);
    const [inputModal, setInputModal] = useState(resultText)
    const [maxResults, setMaxResults] = useState(editDataFavorite.maxResults|| 4);
    const saveRequests = useSelector(state => state.saveRequests);
    const user = localStorage.getItem('user')
    let saveResponse = localStorage.getItem(`${user}`)  

    
    
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });



    useEffect(() => {
        if (editDataFavorite) {
            reset({
                query: editDataFavorite.query,
                type: editDataFavorite.type,
                sortBy: editDataFavorite.sortBy,
                maxResults: editDataFavorite.maxResults,
            })
            setMaxResults(editDataFavorite.maxResults)
        }

    }, [editDataFavorite, reset])


    const onCloseOrReset = () => {
        reset()
        dispatch(resetEditData());
        dispatch(toggleModal());
    };


    const onSubmit = (data) => {
        if (!editDataFavorite) {
            const newData = {...data, query: resultText, id: uuidv4(),maxResults}
            dispatch(addRequest(newData))
        } else {
            dispatch(updateRequest({ ...editDataFavorite,type: inputModal, maxResults, sortBy: data.sortBy }));
        }
        onCloseOrReset();
    }


    return (
        <>
            <Modal open={isVisibleModal} footer={null} onCancel={onCloseOrReset}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>{editDataFavorite ? 'Редактировать запрос' : 'Сохранить запрос'}</h3>
                    <Controller
                        name="query"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label>
                                    Запрос:
                                </label>
                                {
                                editDataFavorite ?  
                                <Input {...field} value={editDataFavorite.query} onChange={(e) => dispatch(editDataQuery(e.target.value)) } /> :
                                <Input {...field} value={resultText} readOnly className='input-dark' /> 
                                }
                                <p>{errors.query?.message}</p>
                            </div>
                        )}
                    />
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label>
                                    Введите название запроса. <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input {...field} placeholder="Введите название" value={field.value}
                                    onChange={
                                        (e) => {
                                            field.onChange(e.target.value)
                                            setInputModal(e.target.value)
                                        }
                                    }
                                />
                                <p>{errors.type?.message}</p>
                            </div>
                        )}
                    />
                    <Controller
                        name="sortBy"
                        control={control}
                        defaultValue="relevance"
                        render={({ field }) => (
                            <div>
                                <label>Сортировать по: </label>
                                <Select
                                    {...field}
                                    placeholder=" Выберите сортировку"
                                >
                                    <Select.Option value="relevance">По релевантности</Select.Option>
                                    <Select.Option value="viewCount">По количеству просмотров</Select.Option>
                                    <Select.Option value="videoCount">По количеству видео на ресурсе</Select.Option>
                                    <Select.Option value="date">По дате</Select.Option>
                                    <Select.Option value="rating">По рейтингу</Select.Option>
                                    <Select.Option value="title">В алфавитном порядке по названию</Select.Option>
                                </Select>
                                <p>{errors.sortBy?.message}</p>
                            </div>
                        )}
                    />
                    <Controller
                        name="maxResults"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label>
                                    Максимальное количество результатов: 
                                </label>
                                <Slider
                                    min={1}
                                    max={50}
                                    value={maxResults}
                                    onChange={(value) => {
                                        setMaxResults(value);
                                        field.onChange(value); // обновляем значение поля формы
                                    }}
                                />
                                <Input
                                    type="number"
                                    {...field}
                                    value={maxResults}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (value > 0 && value <= 50) {
                                            setMaxResults(value);
                                            field.onChange(value); // обновляем значение поля формы
                                        }
                                    }}
                                    style={{ width: "100%", marginTop: 10 }}
                                />
                                <p>{errors.maxResults?.message}</p>
                            </div>
                        )}
                    />
                    <div>
                        <Button key="back" onClick={onCloseOrReset}>
                            Не сохранять
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )


}


export default ModalComponent;

