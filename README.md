# NOX Biotech Homepage

A static website for NOX Biotech - Regenerative Animal Health.

## Project Structure

```
nox-biotech-homepage/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript file
├── assets/             # Images, videos, fonts
│   ├── Logo.png
│   ├── LogoContact.png
│   ├── heroback.jpg
│   └── ...
├── dist/               # Build output (generated)
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## Development

### Prerequisites
- Node.js 18+ and npm

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
This will start a local development server at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
This creates a `dist/` folder with optimized static files ready for deployment.

### Preview Production Build
```bash
npm run preview
```

## Deployment to Hostinger

### Quick Steps:

1. **Build the project:**
   ```bash
   npm run build
   ```
   This creates a `dist/` folder with all optimized files.

2. **Upload to Hostinger:**
   - Log in to Hostinger control panel → File Manager
   - OR use FTP client (FileZilla, WinSCP, etc.)
   - Navigate to `public_html/` directory
   - **Upload ALL contents** from the `dist/` folder to `public_html/`
   - Ensure these files are in the root:
     - `index.html`
     - `script.js`
     - `.htaccess`
     - `assets/` folder (with all optimized images/videos)

3. **File Structure on Hostinger:**
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

4. **Verify Deployment:**
   - Visit your domain (e.g., `https://yourdomain.com`)
   - Check all pages load correctly
   - Test navigation (Pipeline, People, In-Nox, Contact)
   - Verify images and videos display
   - Test contact form functionality

**See `DEPLOYMENT.md` for detailed deployment guide.**

## Features

- Fully static website (no backend required)
- Responsive design
- Smooth animations and transitions
- Contact form with email integration
- Optimized for performance
- SEO-friendly structure

## Technologies Used

- HTML5
- CSS3 (with custom properties)
- Vanilla JavaScript
- Vite (build tool)
- Tailwind CSS (optional, configured but not required)

## Notes

- This is a **static site only** - no server-side code
- All animations and interactions are client-side JavaScript
- Contact form uses `mailto:` links (opens default email client)
- All assets are optimized during build process

## Support

For issues or questions, contact the development team.

# NoxBiotechSite
