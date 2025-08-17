const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const COMMENTS_URL ='https://jsonplaceholder.typicode.com/comments'

const getData = async ({ url, length }) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Something happened')
    const data = await response.json()
    return data.slice(0, length)
  } catch (error) {
    console.error(error)
  }
}

(async () => {
  const $posts = document.querySelector('#posts')
  const $numberPosts = document.querySelector('#numberPosts')
  const posts = await getData({ url: POSTS_URL, length: 30 })
  const comments = await getData({ url: COMMENTS_URL, length: 120 })
  let postsTemplate = ``

  posts.forEach(({ id, title, body }) => {
    const cmns = comments.filter(({ postId }) => postId === id) 
    let commentsTemplate = ``

    cmns.forEach(({ name, body }) => {
      commentsTemplate += `
        <summary>${name}</summary>
        <p>${body}</p>
      `
    })

    postsTemplate += `
      <article class="post">
        <h3>${title}</h3>
        <p>${body}</p>
        <hr>
        <h4>Comments</h4>
        ${cmns.length === 0 ? 'No comments...' : `<details>${commentsTemplate}</details>`}
      </article>
    `
  })

  $numberPosts.textContent = posts.length
  $posts.innerHTML = postsTemplate
})()
