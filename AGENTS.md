<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared navigation in the root route and distinct visitor experiences on separate routes, because each screen has its own purpose and shareable URL.
- Use one reusable React Three Fiber globe for both exploration screens, because both need the same realistic Mars surface and orbit interaction.
- Serve uploaded photographs and downloaded texture through asset pointers, because media should not bloat the source repository.
- Use the shared ExpandablePhoto dialog for habitat thumbnails, because popup and analysis photos must offer the same accessible enlarged view.
- Open NASA Eyes as an external link rather than duplicating its data, because NASA owns the live simulation and its controls.
