---
index: true
---

# Bluesky comments

[ændra](https://bsky.app/profile/aendra.com) made this very neat [“blue-comments”](https://github.com/aendra-rininsland/blue-comments?tab=readme-ov-file) module that allows you to embed a bluesky thread — for example to use bluesky as a comment platform for your static website. Making it work with Framework is literally two lines of code:

```js echo
import "npm:blue-comments";
```

```html echo run=false
<blue-comments uri="at://aendra.com/app.bsky.feed.post/3kwbbvjlnw325">
```

The code above points to the id of the root message on bluesky (maybe a message that you write to advertise your page and allow other users to post replies). In the case of this page, I’m only pointing to ændra’s [original announcement](https://bsky.app/profile/aendra.com/post/3kwbbvjlnw325). Note that you have to write the uri as follows:
`at://{userId}/app.bsky.feed.post/{postId}`

<div class="card" style="max-width: 390px;">
  <blue-comments uri="at://aendra.com/app.bsky.feed.post/3kwbbvjlnw325">
</div>