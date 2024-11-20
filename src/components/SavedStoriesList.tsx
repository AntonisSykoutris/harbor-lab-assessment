import { Story } from '../lib/types';
import DropdownList from './DropdownList';

type SavedStoriesListProps = {
  savedStories: Story[];
  onRemoveStory: (id: string) => void;
};

export default function SavedStoriesList({ savedStories, onRemoveStory }: SavedStoriesListProps) {
  return (
    <>
      <h3 className=' text-4xl font-bold pb-2 '>Saved Stories</h3>
      <div className='  border border-gray-200'>
        <DropdownList onRemoveStory={onRemoveStory} stories={savedStories} />
      </div>
    </>
  );
}
