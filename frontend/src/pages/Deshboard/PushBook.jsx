import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddBookMutation } from '../../redux/book/BookApi';
import InputField from './InputField';
import SelectField from './SelectField';

const PushBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [imageFileName, setImageFileName] = useState('');

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageFileName
    };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Book Added!",
        text: "Your book was uploaded successfully.",
        icon: "success",
        confirmButtonColor: "#4CAF50",
      });
      reset();
      setImageFileName('');
      setImageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add book. Please try again.",
        icon: "error",
        confirmButtonColor: "#F44336",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Book</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        {/* Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose a category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        {/* Trending Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="trending"
            {...register('trending')}
            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="trending" className="ml-2 text-sm font-medium text-gray-700">
            Mark as Trending
          </label>
        </div>

        {/* Price Fields (Side by Side) */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Old Price ($)"
            name="oldPrice"
            type="number"
            placeholder="e.g., 29.99"
            register={register}
          />
          <InputField
            label="New Price ($)"
            name="newPrice"
            type="number"
            placeholder="e.g., 19.99"
            register={register}
          />
        </div>

        {/* Cover Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700 transition">
              Choose File
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>
            {imageFileName && (
              <span className="text-sm text-gray-500 truncate">{imageFileName}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md font-medium text-white transition ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default PushBook;