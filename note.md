# Note

Some browsers don't support the storage event, and most of the browsers that do support it will only call it when the storage is changed by a different window. So, open your page up in two windows. Click the links in one window and you will probably see the event in the other.

The assumption is that your page will already know all interactions with localStorage in its own window and only needs notification when a different window changes things. This, of course, is a foolish assumption. But.

## 



