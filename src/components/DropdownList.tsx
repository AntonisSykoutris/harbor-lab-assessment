import { Story } from '../lib/types';

type Props = {
  stories: Story[];
  magicWord?: string;
  onSelectStory?: (story: Story) => void;
  onRemoveStory?: (id: string) => void;
};

export default function DropdownList({ stories, magicWord = '', onSelectStory, onRemoveStory }: Props) {
  const highlightTitle = (str: string) =>
    str?.split(' ').map((word, index) => {
      if (word.toLocaleLowerCase() === magicWord.toLocaleLowerCase()) {
        return (
          <span key={index} className='text-orange-500'>
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });

  return (
    <ul className=''>
      {stories.map(story => {
        return (
          <li
            key={story.objectID}
            className='px-4 py-2 hover:bg-gray-200 cursor-pointer flex-row justify-between items-center flex border-b border-grey-200 '
            onClick={() => (onSelectStory ? onSelectStory(story) : null)}
          >
            <div className='text-gray-500 flex justify-between flex-col'>
              <div className='font-bold selection:text-purple-900'>
                {onRemoveStory ? story.title : highlightTitle(story.title)}
              </div>
              <div className=' text-sm justify-between flex w-72'>
                <span>{story.points} points</span>
                <span>|</span>
                <span>by {story.author}</span>
                <span>|</span>
                <span>{story.num_comments} comments</span>
              </div>
            </div>
            {onRemoveStory ? (
              <button
                className=' text-xl font-bold'
                onClick={() => (onRemoveStory ? onRemoveStory(story.objectID) : null)}
              >
                Delete
              </button>
            ) : (
              <></>
            )}
          </li>
        );
      })}
    </ul>
  );
}
