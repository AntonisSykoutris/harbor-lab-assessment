import { useState, useEffect } from 'react';
import { Story } from '../lib/types';

const LOCAL_STORAGE_KEY = 'savedStories';

const useSavedStories = () => {
  const [savedStories, setSavedStories] = useState<Story[]>([]);

  useEffect(() => {
    const storedStories = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedStories) {
      try {
        setSavedStories(JSON.parse(storedStories));
      } catch (error) {
        console.error('Error parsing saved stories from localStorage', error);
      }
    }
  }, []);

  // Add a story to localStorage
  const addStory = (story: Story) => {
    const updatedStories = [...savedStories, story];
    setSavedStories(updatedStories);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedStories));
  };

  // Remove a story from localStorage by its objectID
  const removeStory = (id: string) => {
    const updatedStories = savedStories.filter(story => story.objectID !== id);
    setSavedStories(updatedStories);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedStories));
  };

  return { savedStories, addStory, removeStory };
};

export default useSavedStories;
