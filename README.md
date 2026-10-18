# Noir Motors (frontend demo)
Run: extract, open the `noir-motors` folder in VS Code, right-click `index.html` > Open with Live Server (or `python3 -m http.server 8000`). Internet needed for CDN libraries/fonts.
Deploy: drag the folder to Netlify (static). Vehicle detail uses `html/vehicle-detail.html?id=car-001`; invalid ids fall back to car-001.
All vehicles, specs, prices, offers, people and addresses are fictional sample data. Brand names are descriptive only, no affiliation. Finance results are illustrations, not offers. Forms send nothing.
Stored in localStorage: noir-compare, noir-wish, noir-recent (vehicle ids only).
Structure: CSS in `css/main.css`, data in `js/data.js`, shared nav/footer in `js/app.js`, page renderers in `js/pages.js`.
Not included: Three.js showroom and Swiper (Owl Carousel and a custom lightbox are used).

## Images (how they work)
Every image key in `js/data.js` (`img` map) has a list of direct Unsplash URLs. The page tries the first; if it errors (or has not loaded after ~9 s) it tries the next; if all fail, a locally generated illustration (SVG, built in `js/app.js`) is shown, so there are never broken-image icons. To use your own photo, put any direct image URL (or a local path such as `assets/images/x.jpg`) as the FIRST item of that key's list.
Photos could not be downloaded or URL-checked while building (no internet in the build environment), so a few remote links may fall back to the illustration. Check once in your browser and swap any failing URL.
## Animation and carousel safety
If GSAP, ScrollTrigger, AOS or Owl Carousel fail to load, content stays visible (AOS attributes are removed; carousels become swipeable scroll strips). Reduced-motion is respected.
## Deploy on Netlify
Drag the project folder onto https://app.netlify.com/drop (or connect the repo with no build command and publish directory `.`).
