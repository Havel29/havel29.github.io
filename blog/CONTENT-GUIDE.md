# Content Creation Guide for Havel29 Blog

This guide will help you add new content to your blog once you have the data ready.

## 📝 Creating Blog Posts (Crypto Writeups)

### Quick Start
Create a new markdown file in `content/posts/`:

```bash
hugo new posts/writeup-title.md
```

### Blog Post Template

```markdown
---
title: "Your Writeup Title"
date: 2025-11-07T12:00:00+01:00
draft: false
tags: ["crypto", "ctf", "writeup"]
categories: ["Security"]
description: "Brief description of the challenge"
---

# Challenge Name

## Challenge Description
Brief overview of the challenge...

## Initial Analysis
What you first discovered...

## Solution
Step-by-step solution...

## Code
```python
# Your solution code
```

## Flag
`flag{your_flag_here}`

## Lessons Learned
- Key takeaway 1
- Key takeaway 2
```

### Recommended Tags
- `crypto`, `ctf`, `writeup`
- `rsa`, `aes`, `ecc` (specific crypto types)
- Competition name (e.g., `picoctf`, `hackthebox`)

---

## 🤖 Creating ML Projects

### Quick Start
Create a new markdown file in `content/ml-projects/`:

```bash
hugo new ml-projects/project-name.md
```

### ML Project Template

```markdown
---
title: "Project Title"
date: 2025-11-07T12:00:00+01:00
draft: false
tags: ["machine-learning", "data-science"]
featured: false
github: "https://github.com/youruser/repo"
demo: "https://demo-link.com"
tech: ["Python", "PyTorch", "Scikit-learn"]
---

# Project Name

## Overview
Brief description of the project and its goals...

## Dataset
Description of the data used...

## Approach
- Data preprocessing
- Model architecture
- Training strategy

## Results
Key metrics and findings...

## Technologies Used
- Python 3.x
- Libraries: PyTorch, NumPy, Pandas
- Tools: Jupyter, Git

## Future Work
Areas for improvement...
```

### Project Categories
- **Classification**: Image classification, text classification
- **Regression**: Predictive modeling
- **NLP**: Text analysis, sentiment analysis
- **Computer Vision**: Object detection, image segmentation
- **Time Series**: Forecasting, anomaly detection

---

## 🎯 Setting Featured Content

### Featured ML Project
Edit the project's front matter:
```yaml
featured: true
```
Only one project should be featured at a time.

### Pinned Blog Post
The most recent post will appear first by default.

---

## 📸 Adding Images

### For Blog Posts
1. Create an image folder: `static/images/posts/`
2. Add your images there
3. Reference in markdown:
```markdown
![Alt text](/images/posts/your-image.png)
```

### For ML Projects
1. Create: `static/images/projects/`
2. Add project screenshots
3. Reference:
```markdown
![Project Demo](/images/projects/demo.png)
```

---

## 🚀 Publishing Workflow

### 1. Create Draft
```bash
hugo new posts/your-post.md
# Edit the file, keep draft: true
```

### 2. Preview Locally
```bash
hugo server -D  # Include drafts
```
Visit http://localhost:1313

### 3. Publish
Change `draft: false` in the front matter

### 4. Build for Production
```bash
hugo --minify
```
Deploy the `public/` folder to your hosting service.

---

## 💡 Tips & Best Practices

### SEO Optimization
- Use descriptive titles
- Add meta descriptions
- Include relevant tags
- Use alt text for images

### Code Blocks
Use syntax highlighting:
```markdown
```python
def exploit():
    # Your code
```
```

### Mathematical Equations
Use KaTeX for math:
```markdown
Inline: $e^{i\pi} + 1 = 0$

Block:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Links
- External: `[Text](https://example.com)`
- Internal: `[About](/about/)`
- Other posts: `[Post Title]({{< ref "posts/other-post.md" >}})`

---

## 📂 Content Structure Reference

```
content/
├── posts/              # Blog posts (crypto writeups)
│   └── writeup-1.md
├── ml-projects/        # ML project showcase
│   ├── _index.md      # Projects listing page
│   └── project-1.md
└── about/
    └── _index.md      # Your bio and education
```

---

## 🔧 Local Development Commands

```bash
# Start dev server
hugo server

# Start dev server with drafts
hugo server -D

# Create new post
hugo new posts/my-post.md

# Create new ML project
hugo new ml-projects/my-project.md

# Build for production
hugo --minify

# Check Hugo version
hugo version
```

---

## 📝 Quick Checklist for New Posts

- [ ] Created file in correct location
- [ ] Updated front matter (title, date, tags)
- [ ] Changed `draft: false` when ready
- [ ] Added relevant images
- [ ] Tested locally with `hugo server`
- [ ] Verified all links work
- [ ] Checked on mobile view
- [ ] Built and deployed

---

**Need help?** Check the [Hugo documentation](https://gohugo.io/documentation/) or ask for assistance!
