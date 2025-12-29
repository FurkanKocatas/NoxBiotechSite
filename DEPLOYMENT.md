# Deployment Guide - Hostinger

## Quick Deployment Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to Hostinger:**
   - Connect via FTP or use Hostinger File Manager
   - Navigate to `public_html/` directory
   - Upload **ALL contents** from the `dist/` folder
   - Ensure these files are in `public_html/` root:
     - `index.html`
     - `script.js`
     - `.htaccess`
     - `assets/` folder (with all images/videos)

3. **Verify deployment:**
   - Visit your domain
   - Check all pages load correctly
   - Test contact form
   - Verify images and videos display

## File Structure After Upload

```
public_html/
├── index.html
├── script.js
├── .htaccess
└── assets/
    ├── Logo-BIaiu5dm.png
    ├── LogoContact-C7sa9Llb.png
    ├── heroback-uaGm0_4q.jpg
    ├── cell-DG3SEVqD.mp4
    ├── FutureofAnimal-Cf9oC_7h.mp4
    ├── animalcell-CW-mY_Dt.png
    └── index-D2OBK7_2.css
```

## Important Notes

- ✅ **Static files only** - No backend/server-side code
- ✅ **All assets optimized** - Images and videos are processed during build
- ✅ **SEO ready** - Proper meta tags and structure
- ✅ **Mobile responsive** - Works on all devices
- ✅ **Fast loading** - Optimized CSS and assets

## Troubleshooting

**If images don't load:**
- Check that `assets/` folder was uploaded completely
- Verify file paths in browser console

**If routing doesn't work:**
- Ensure `.htaccess` file is uploaded
- Check file permissions (should be 644)

**If styles don't load:**
- Clear browser cache
- Check that CSS file exists in `assets/` folder

## Support

For deployment issues, check:
1. File permissions (644 for files, 755 for folders)
2. `.htaccess` is present and readable
3. All files from `dist/` are uploaded

