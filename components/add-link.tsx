import { FormEvent, useState } from 'react';

const AddLink: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [newLink, setNewLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setNewLink('');
    setError('');
    setLoading(true);

    await fetch('/api/links', {
      method: 'POST',
      body: JSON.stringify({ url, slug }),
    }).then((response) => {
      const jsonResponse = response.json();
      jsonResponse.then((json) => {
        setLoading(false);

        if (!json.code) {
          setNewLink(json.fullLink);

          return;
        }

        if (json.code === 'DUPLICATE') {
          setError(json.message);

          return;
        }

        setError('An error occured');
      });
    });
  };

  return (
    <div className='relative'>
      {loading && (
        <div className='absolute inset-0 bg-white dark:bg-gray-800 dark:text-white z-10 opacity-80 flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='50'
            height='50'
            fill='currentColor'
            className='animate-spin'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'
            />
            <path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z' />
          </svg>
        </div>
      )}
      <form className='mt-6' onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor='url'
            className='block text-sm text-gray-800 dark:text-gray-200'
          >
            URL
          </label>
          <input
            type='url'
            id='url'
            name='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div className='mt-4'>
          <label
            htmlFor='slug'
            className='block text-sm text-gray-800 dark:text-gray-200'
          >
            Slug
          </label>
          <input
            type='text'
            id='slug'
            name='slug'
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
          >
            Generate
          </button>
        </div>
      </form>

      <div className='flex items-center justify-between mt-4'>
        <span className='w-full border-b dark:border-gray-600'></span>
        {error === '' ? (
          <span className='whitespace-nowrap text-xs text-center text-gray-500 uppercase dark:text-gray-400 mx-4'>
            Your link
          </span>
        ) : (
          <span className='whitespace-nowrap text-xs text-center text-red-700 uppercase text-red-600 mx-4'>
            {error}
          </span>
        )}
        <span className='w-full border-b dark:border-gray-600'></span>
      </div>

      <div className='flex items-center mt-4'>
        <input
          value={newLink}
          readOnly
          className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
        />

        <button
          onClick={() => {
            navigator.clipboard.writeText(newLink);
          }}
          title='Copy to clipboard'
          className='p-2 ml-2 text-sm font-medium text-gray-500 transition-colors duration-200 transform bg-gray-300 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-600'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='26'
            height='26'
            fill='currentColor'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z'
            />
            <path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z' />
            <path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z' />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddLink;
