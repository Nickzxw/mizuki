---
title: Hexo - How to hexo blog and submit it to github.
published: 2021-10-25
draft: false
pinned: false
lang: zh
---

An article about how to use hexo to write a blog !

<!-- more -->

## Make a new document

If our file's name is "hello hexo", you can type the following command in **Git GUI** to create  a new file.

```
$ hexo new "hello hexo"
```

The result of the command is to create a new "hello-hexo.md" file under the **PATH:** ./hexo/sourse/_post.

Then we can start our writing!

## Document format

We use the Text Editor to open the new file "hello-hexo.md".

```
---
title: hello hexo
date: 2021-10-25 20:51:15
tags:
categories:
---
```

The text of **title** is the file name and the title of the article.

And the value of the **date** is the local time when we created the file.

Besides, the value of **tags** is the label of the file, you can assign the value to the file at will. Like:

```
---
title: hello hexo
date: 2021-10-25 20:51:15
tags:
  - hello
  - hexo
  - markdown
categories:
---
```

In the end, **categories** are used to categorize articles.

## Resource reference

Sometimes we will want to insert a picture to our blog.

You will have two options:

1. Use absolute paths to reference resources.
2. Use relative paths to reference resources

### Article resource folder

If you use the relative paths to reference resources, you can use the article resource folder provided from Hexo.

Use the text editor to open the **"_config.yml"** file in the root directory, and set the **"post_asset_folder"**  values to true

```
post_asset_folder: true
```

Then when you type `hexo new filename`, Hexo will create a new directory to allow us to save our resources.

### Tag plugin

We can reference pictures and other resources by using the tag plugin provided by Hexo.

```
---
{% asset_path slug %}
{% asset_img slug [ title ] %}
{% asset_link slug [ title ] %}
---
```

The correct way to cite pictures:

```
---
{% asset_img example.jpg This is an example image %}
---
```

## Article Summary

In order to set the article summary, we only need to add `<!-- more -->` after the content that we want to display as a summary. Like:

```
---
title: hello hexo
date: 2021-10-25 20:51:15
tags:
  - hello
  - hexo
  - markdown
categories:
---

Article summary

<!-- more -->

Text content
```

## Submit It To Gihub

Master branch:

```
$ hexo clean
$ hexo g -d
```

Hexo branch:

```
git add.
git commit -m "your description"
git push origin hexo
```