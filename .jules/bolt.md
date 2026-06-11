## Performance Optimization Learnings
* Caching DOM queries inside JavaScript logic duplicated across `index.html` and `windoor-v2.html` reduces redundant document traversals during UI updates (like filtering catalogue items).
* Lazy initialization ensures DOM queries run only after they are first needed and then reused, improving layout and interaction performance on multi-item lists.
