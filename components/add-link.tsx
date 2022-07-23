import { FormEvent, useState } from "react"

const AddLink: React.FC = () => {
  const [url, setUrl] = useState<string>('https://google.be')
  const [slug, setSlug] = useState<string>('test')
  const [newLink, setNewLink] = useState<string | null>(null)

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()

    await fetch('/api/links', {
      method: 'POST',
      body: JSON.stringify({url, slug})
    }).then(response => {
      const jsonResponse = response.json()
      jsonResponse.then(json => {
        setNewLink(`http://localhost:3000/l/${json.slug}`)
      })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">URL</label>
        <input type="url" id="url" name="url" value={url} onChange={e => setUrl(e.target.value )} required />

        <label htmlFor="slug">Slug</label>
        <input type="text" id="slug" name="slug" value={slug} onChange={e => setSlug(e.target.value )} required />

        <button type="submit">Submit</button>
      </form>

      {newLink && <p>{newLink}</p>}
    </>
  )
}

export default AddLink