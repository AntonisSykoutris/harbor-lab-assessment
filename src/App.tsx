import React from 'react';
import AutoSuggestInput from './components/AutoSuggestInput';
import SavedStoriesList from './components/SavedStoriesList';
import './App.css';
import { Story } from './lib/types';
import useSavedStories from './hooks/useSavedStories';

export default function App() {
  const { savedStories, addStory, removeStory } = useSavedStories();

  const handleSelectStory = (story: Story) => {
    if (!savedStories.some(s => s.objectID === story.objectID)) {
      addStory(story);
    }
  };

  const handleRemoveStory = (id: string) => {
    removeStory(id);
  };

  return (
    <div className='mx-12 flex h-screen w-screen flex-col  container gap-y-10 p-0 pt-0'>
      <div className='h-1/2'>
        <AutoSuggestInput onSelectStory={handleSelectStory} />
      </div>
      <div className='h-1/2'>
        <SavedStoriesList savedStories={savedStories} onRemoveStory={handleRemoveStory} />
      </div>
    </div>
  );
}
