import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils/baseUrl';

// const baseQuery = fetchBaseQuery({
//     baseUrl: `${baseUrl}/api/books`,
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`);
//             console.log(token);
//         }
//         return headers;
//     }
// });

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api/books`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: builder => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fecthBookById:builder.query({
            query:(id)=>`/${id}`,
            // providesTags: ["Books"]
            providesTags:(result,error,id)=>[{type:"Books",id}],
        }),
        addBook:builder.mutation({
            query:(newBook)=>({
                url:`/create-book`,
                method:"POST",
                body:newBook,
            }),
            invalidatesTags:["Books"]
        }),
        updateBook:builder.mutation({
            query:({id,...rest})=>({
                url:`/edit-book/${id}`,
                method:"PUT",
                body:rest,
                headers:{
                    'content-type':'application/json'
                }
            }),
            invalidatesTags:["Books"]
        }),
     deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })
});

export const { useFetchAllBooksQuery,useFecthBookByIdQuery,useAddBookMutation,useDeleteBookMutation,useUpdateBookMutation } = bookApi;
