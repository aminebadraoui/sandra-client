import React, { useState, useEffect } from 'react';
import useUserStore from '../../../state/userStore';

const ServiceCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingTag, setEditingTag] = useState(null);
    const [editedName, setEditedName] = useState('');

    const [newTag, setNewTag] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { token } = useUserStore();

    const sortCategories = (categories) => {
        return categories.map(category => ({
            ...category,
            tags: category.tags.sort((a, b) => a.name.localeCompare(b.name))
        })).sort((a, b) => a.name.localeCompare(b.name));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/service-categories`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCategories(sortCategories(data));
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/service-categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name: newCategory })
            });
            if (response.ok) {
                setNewCategory('');
                const updatedCategories = await response.json();
                setCategories(sortCategories([...categories, updatedCategories]));
            } else {
                console.error('Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleAddTag = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/service-categories/${selectedCategory}/tags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name: newTag })
            });
            if (response.ok) {
                setNewTag('');
                const updatedTag = await response.json();
                const updatedCategories = categories.map(cat =>
                    cat.id === selectedCategory
                        ? { ...cat, tags: [...cat.tags, updatedTag] }
                        : cat
                );
                setCategories(sortCategories(updatedCategories));
            } else {
                console.error('Failed to add tag');
            }
        } catch (error) {
            console.error('Error adding tag:', error);
        }
    };

    const handleEditCategory = async (categoryId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/service-categories/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name: editedName })
            });
            if (response.ok) {
                const updatedCategory = await response.json();
                const updatedCategories = categories.map(cat =>
                    cat.id === categoryId ? { ...cat, name: updatedCategory.name } : cat
                );
                setCategories(sortCategories(updatedCategories));
                setEditingCategory(null);
                setEditedName('');
            } else {
                console.error('Failed to edit category');
            }
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    const handleEditTag = async (categoryId, tagId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/service-categories/${categoryId}/tags/${tagId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name: editedName })
            });
            if (response.ok) {
                const updatedTag = await response.json();
                const updatedCategories = categories.map(cat =>
                    cat.id === categoryId
                        ? { ...cat, tags: cat.tags.map(tag => tag.id === tagId ? updatedTag : tag) }
                        : cat
                );
                setCategories(sortCategories(updatedCategories));
                setEditingTag(null);
                setEditedName('');
            } else {
                console.error('Failed to edit tag');
            }
        } catch (error) {
            console.error('Error editing tag:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/service-categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                fetchCategories();
            } else {
                console.error('Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleDeleteTag = async (categoryId, tagId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/service-categories/${categoryId}/tags/${tagId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                fetchCategories();
            } else {
                console.error('Failed to delete tag');
            }
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    return (
        <div className='w-full flex flex-col'>
            <h2 className="text-2xl font-bold">Service Categories</h2>
            <div className="flex flex-row my-md">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Category
                </button>
            </div>
            <ul className="my-xs">
                {categories.map(category => (
                    <li key={category.id} className="border p-4 rounded m-xs">
                        <div className="flex justify-between items-center">
                            {editingCategory === category.id ? (
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="border p-2 mr-sm"
                                />
                            ) : (
                                <h3 className="text-xl font-semibold">{category.name}</h3>
                            )}
                            <div>
                                {editingCategory === category.id ? (
                                    <button
                                        onClick={() => handleEditCategory(category.id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded text-sm mr-2"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditingCategory(category.id);
                                            setEditedName(category.name);
                                        }}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded text-sm mr-2"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <ul className="ml-4 mt-2 p-2">
                            {category.tags.map(tag => (
                                <li key={tag.id} className="flex justify-between items-center">
                                    {editingTag === tag.id ? (
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                            className="border p-2 mr-2"
                                        />
                                    ) : (
                                        <span>{tag.name}</span>
                                    )}
                                    <div>
                                        {editingTag === tag.id ? (
                                            <button
                                                onClick={() => handleEditTag(category.id, tag.id)}
                                                className="text-green-500  px-2 py-1 rounded text-sm mr-2"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setEditingTag(tag.id);
                                                    setEditedName(tag.name);
                                                }}
                                                className="text-yellow-500 px-2 py-1 rounded text-sm mr-2"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteTag(category.id, tag.id)}
                                            className="text-red-500  px-2 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {selectedCategory === category.id && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="New tag name"
                                    className="border p-2 mr-2"
                                />
                                <button onClick={handleAddTag} className="bg-green-500 text-white px-4 py-2 rounded">
                                    Add Tag
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                            className="mt-2 text-blue-500"
                        >
                            {selectedCategory === category.id ? 'Cancel' : 'Add Tag'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ServiceCategories;