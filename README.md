# Power Tech Diesel Services

Responsive React and Vite website for Power Tech Diesel Services in Chennai. The site introduces generator oil servicing, planned maintenance, and AMC enquiries, with a quote form connected to a local Flask API and an optional customer-reviewed WhatsApp message.

## Run locally

### Frontend

1. Install Node.js (LTS) and npm.
2. Open this folder in VS Code and open **Terminal > New Terminal**.
3. Run `npm install` once, then `npm run dev`.
4. Open the local URL printed by Vite, usually `http://localhost:5173`.

Create a production build with `npm run build`; preview it using `npm run preview`.

### Backend

1. Open a second terminal in the project root.
2. In the `backend` folder, install dependencies with `pip install -r requirements.txt`.
3. Start the API with `python app.py` from the `backend` folder.
4. The API will run on `http://localhost:5000`.

The backend exposes a health endpoint at `/health` and a JSON quote-enquiry endpoint at `/api/enquiry`. The local API only allows browser requests from `http://localhost:5173`; enquiries are validated and returned to the caller but are not persisted.

## Business details

Edit `src/config/business.js` to add the real WhatsApp number, phone number, email, and service area. Use the international country code and digits for `whatsapp`, without a `+` or spaces (for example, replace the empty value with the actual country code and number). No contact details are prefilled because they have not been provided. The API submission works without a WhatsApp number; the form notes that WhatsApp is not configured.

## Enquiry form test

Submit the quote form empty to see required-field messages. Complete the required name, contact number, business type, service, and location fields to test validation. With both local servers running, the form submits JSON to the Flask API and confirms success or displays an error. If a valid WhatsApp number is configured, WhatsApp also opens with the formatted enquiry for the customer to review and send. The site does not send the WhatsApp message automatically.

## Images

The hero, industry, and gallery photos are illustrative remote images, not records of completed Power Tech projects. Replace the image URLs in `src/config/business.js` for industry and gallery images, and in `src/App.jsx` for hero and about images. For a self-contained deployment, add genuine optimized company photos to `public/images/` and use local paths such as `/images/generator-service.webp`. Add informative alt text when changing the images.

## Deployment

For a low-cost static deployment, connect this repository to Cloudflare Pages or Netlify and use `npm run build` as the build command and `dist` as the output directory. Both offer free tiers suitable for a small business site; check current provider limits and domain pricing. Configure contact details before publishing and test the WhatsApp link on mobile and desktop.
