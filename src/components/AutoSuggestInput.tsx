import { useState, useEffect } from 'react';
import axios from 'axios';
import { Story } from '../lib/types';
import DropdownList from './DropdownList';

type AutoSuggestInputProps = {
  onSelectStory: (story: Story) => void;
};

export default function AutoSuggestInput({ onSelectStory }: AutoSuggestInputProps) {
  const [query, setQuery] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStories = async (searchQuery: string) => {
    try {
      setLoading(true);
      const response = await axios.get<{ hits: Story[] }>(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
      setStories(response.data.hits.slice(0, 10)); // Limit to 10 stories
    } catch (error) {
      console.error('Error fetching stories', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length >= 3) {
      const timeoutId = setTimeout(() => fetchStories(query), 300); // Debounce
      return () => clearTimeout(timeoutId);
    } else {
      setStories([]);
    }
  }, [query]);

  return (
    <div>
      <div className=' max-w-2xl mx-auto mt-12'>
        <h3 className=' text-4xl font-bold pb-2 '>Story</h3>
        <input
          type='text'
          value={query}
          placeholder='Stories...'
          onChange={e => setQuery(e.target.value)}
          className='w-full group h-10 px-4 border-2 border-grey-800 focus:border-blue-500 active:border-blue-500 transition-all ease-in-out duration-300 focus:outline-none'
        />
        <div className='mt-[1px] max-h-56 overflow-y-auto shadow-md'>
          {loading && <div>Loading...</div>}
          {stories.length > 0 ? (
            <DropdownList magicWord={query.trim()} onSelectStory={onSelectStory} stories={stories} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
