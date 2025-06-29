# Blog Theme for Hugo

A simple, clean, and modern blog theme for [Hugo](https://gohugo.io/). Perfect for sharing notes, code, and life stories.

## Features

- Minimalist and responsive design
- Syntax highlighting for code blocks
- Tag and category support
- Archive and search pages
- Customizable author, description, and metadata
- Easy content creation with archetypes
- SEO-friendly and fast loading

## Demo

You can preview the theme in the [public/](../../public/) folder after building your site.

## Installation

1. **Clone the theme into your Hugo site:**

   ```bash
   git clone https://github.com/hunglin59638/hugo-clean-blog themes/hugo-clean-blog
   ```

2. **Configure your site to use the theme:**

   In your `hugo.toml` or `config.toml`:

   ```toml
   theme = "hugo-clean-blog"
   ```

3. **Start your site:**

   ```bash
   hugo server -D
   ```

## Usage

- **Create a new post:**

  ```bash
  hugo new posts/my-first-post.md
  ```

- **Edit the front matter** in the new post to set title, date, tags, categories, etc.
- **Write your content** in Markdown.

## Archetypes

Default archetype is provided at `archetypes/default.md` for quick post creation.

## Customization

- Update logo and favicon in `static/images/`.
- Modify SCSS/CSS in `assets/scss/` for custom styles.
- Edit layouts in `layouts/` for advanced customization.

## Folder Structure

- `archetypes/` – Archetype templates for new content
- `assets/` – SCSS and JS assets
- `content/` – Your posts and pages
- `layouts/` – Theme templates
- `static/` – Static files (images, favicon, etc.)
- `themes/blog/` – This theme

## License

MIT License. See [LICENSE](LICENSE) for details.

## Author

[Hunglin] – [blog.hlin.tw](https://blog.hlin.tw/)

---

一個簡單、乾淨、現代的 Hugo 部落格主題，適合分享筆記與生活點滴。
