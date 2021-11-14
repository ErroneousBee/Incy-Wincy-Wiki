---
title: Image rewite tests
---

On page load, we rewrite reletive image file paths to have a complete path.

Usually, you'll want to do images in a figure container:
<figure>
 <img src="test_image_994x1294.jpg" alt="test image" style="width:30%"/>
 <figcaption>Figure Caption Text</figcaption>
</figure>

Sometimes you'll want to point to a image elsewhere. To achieve this, start the path with a forward slash.
<figure>
 <img src="/content/testarea/test_image_994x1294.jpg" alt="test image" style="width:20%; text-align:right;"/>
 <figcaption>Figure Caption Text</figcaption>
</figure>
 

You can include images using markdown but they end up full size:
![Test Image](test_image_994x1294.jpg "Another  title")



